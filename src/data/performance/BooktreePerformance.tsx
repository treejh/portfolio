export default function BooktreePerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ❤️ 좋아요 누른 게시글 조회 성능 개선
        </h3>
      </div>

      {/* 기존 구조 분석 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          🔍 기존 구조 분석
        </h4>
        <div className="bg-gray-100 p-4 rounded mt-2">
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {`@Query("SELECT lp.post FROM LikePost lp WHERE lp.user.id = :userId")
Page<Post> findLikedPostsByUser(@Param("userId") Long userId, Pageable pageable);`}
          </pre>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
          <li>단순 Post 추출 쿼리</li>
          <li>
            <span className="font-medium">Post.user</span>,{" "}
            <span className="font-medium">Post.imageList</span> 등은 Lazy 로딩 →
            N+1 문제 발생 가능성
          </li>
        </ul>
      </div>

      {/* 개선 포인트 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          🔧 개선 포인트
        </h4>
        <div className="mb-2">
          <span className="font-bold text-green-700">
            ✅ 1. N+1 방지: EntityGraph 적용
          </span>
        </div>
        <div className="bg-gray-100 p-4 rounded mt-2">
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {`@EntityGraph(attributePaths = {"post", "post.user"})
@Query("SELECT lp FROM LikePost lp WHERE lp.user.id = :userId")
Page<LikePost> findByUserId(@Param("userId") Long userId, Pageable pageable);`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded mt-2">
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {`@OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY,orphanRemoval = true)
@BatchSize(size = 10)
List<Image> imageList = new ArrayList<>();`}
          </pre>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
          <li>
            @EntityGraph로 한 번에 fetch하고, 1:N 컬렉션은 @BatchSize를 사용해
            LAZY fetch 상태에서 묶어서 조회함으로써 N+1 문제를 최소화
          </li>
        </ul>
      </div>

      {/* 문제 발생 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          🚨 문제 발생
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>EntityGraph로 성능은 일부 향상되었지만, 병목 현상 여전</li>
          <li>1000 VU 시 avg=901ms, p95=2.4s 응답 발생</li>
          <li>고부하 상황에서 성능 저하 → 캐싱 필요성 대두</li>
        </ul>
      </div>

      {/* 상황 정리 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          🧠 상황 정리: “사용자 본인이 좋아요 누른 게시글을 자기만 조회”
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">
                  조건
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-center text-gray-700">
                  분산 락 필요 여부
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                  여러 유저가 동일 캐시 key 사용
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  ✅ 필요
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                  캐시 미스 시 중복 DB 접근 우려
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  ✅ 필요
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                  각 유저가 자기 것만 조회
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  ❌ 필요 없음
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700">나만 쓰는 key</td>
                <td className="px-4 py-2 text-center text-gray-700">
                  ❌ 필요 없음
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Redisson 캐시 도입 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          🚀 Redisson 캐시 도입
        </h4>
        <div className="bg-gray-100 p-4 rounded mt-2">
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {`public Page<PostFollowingPageDto> getLikedPostsWithCache(Pageable pageable) {
    Long userId = tokenService.getIdFromToken();
    String cacheKey = String.format("likePost:user:%d:page:%d:size:%d",
                                     userId, pageable.getPageNumber(), pageable.getPageSize());

    RBucket<List<PostFollowingPageDto>> bucket = redissonClient.getBucket(cacheKey);
    List<PostFollowingPageDto> dtoList;

    if (bucket.isExists()) {
        dtoList = bucket.get();
    } else {
        Page<LikePost> likePosts = likePostRepository.findByUserId(userId, pageable);
        dtoList = likePosts.stream().map(PostFollowingPageDto::new).toList();
        bucket.set(dtoList, 10, TimeUnit.MINUTES);
    }

    return new PageImpl<>(dtoList, pageable, dtoList.size());
}`}
          </pre>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
          <li>사용자 개인 key 기반 캐시 (userId + page + size)</li>
          <li>10분 TTL 적용</li>
        </ul>
      </div>

      {/* 성능 개선 결과 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📊 성능 개선 결과 (k6 기준)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">
                  지표 항목
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-center text-gray-700">
                  개선 전
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-center text-gray-700">
                  개선 후
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-center text-gray-700">
                  개선율
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold">
                  최대 응답 시간
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  59.99s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700 font-bold">
                  22.26s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-green-600 font-bold">
                  ▼ 62.9% 단축 (개선 예정)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold">
                  평균 응답 시간
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  37.36s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700 font-bold">
                  376ms
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-green-600 font-bold">
                  ▼ 약 99배 단축
                </td>
              </tr>
              {/* <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold">
                  P95 응답 시간
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  51.85s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700 font-bold">
                  998.57ms
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-green-600 font-bold">
                  ▼ 98.1 단축
                </td>
              </tr> */}

              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold">
                  처리량 (RPS)
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  5.08 req/sec
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700 font-bold">
                  276.17 req/sec
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-green-600 font-bold">
                  ▲ 약 54.36배 향상
                </td>
              </tr>
              {/* <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold">
                  평균 요청 처리 시간
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700">
                  38.37s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-gray-700 font-bold">
                  1.37s
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center text-green-600 font-bold">
                  ▼ 96.4% 단축
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700 font-semibold">
                  최대 응답 시간
                </td>
                <td className="px-4 py-2 text-center text-gray-700">59.99s</td>
                <td className="px-4 py-2 text-center text-gray-700 font-bold">
                  22.26s
                </td>
                <td className="px-4 py-2 text-center text-green-600 font-bold">
                  ▼ 62.9% 단축
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        {/* 개선 전/후 이미지 영역 */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {/* 개선 전 이미지 */}
          <div className="flex-1 text-center">
            <div className="mb-2 text-gray-700 font-semibold">개선 전</div>
            {/* 이미지 삽입 위치 */}
            <img
              src="/images/beforeBookTree.png"
              alt="개선 전"
              className="mx-auto rounded shadow"
            />
          </div>
          {/* 개선 후 이미지 */}
          <div className="flex-1 text-center">
            <div className="mb-2 text-gray-700 font-semibold">개선 후</div>
            {/* 이미지 삽입 위치 */}
            <img
              src="/images/afterBookTree.png"
              alt="개선 후"
              className="mx-auto rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ 결론</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>
            <span className="font-medium">EntityGraph</span>로 N+1 문제 제거
          </li>
          <li>
            <span className="font-medium">Redisson 캐싱</span>으로 평균 응답
            시간{" "}
            <span className="text-green-700 font-semibold">약 99배 단축</span>
          </li>
          <li>
            RPS(처리량){" "}
            <span className="text-green-700 font-semibold">
              약 54.36 배 향상{" "}
            </span>{" "}
            및 오류율 <span className="text-green-700 font-semibold">0%</span>{" "}
            유지
          </li>
          <li>
            사용자 전용 데이터는 락 없는 캐시 전략으로 충분히 안전하며, 빠름
          </li>
        </ul>
      </div>

      {/* 실무 인사이트 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🧠 실무에서의 인사이트
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li>
            단순한 API도 고부하 상황에서는 성능 병목의 핵심이 될 수 있습니다.
          </li>
          <li>
            사소해 보이는 쿼리에도{" "}
            <span className="font-semibold">캐싱 전략을 고려하는 습관</span>이
            중요하다는 걸 실무에서 체감했습니다.
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-2 md:px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 transition-colors text-sm"
        >
          RPS(Requests Per Second) = 기본적으로 전체 요청 수 ÷ 전체 측정 시간
        </a>
      </div>
    </div>
  );
}
