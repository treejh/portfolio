export default function HakplePerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🧩 JPA N+1 및 좋아요 상태 조회 개선
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📌 배경
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              게시판 기능 개발 중, 댓글 목록 조회 시 다음과 같은 성능 이슈 발생:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>board.getComments() 호출 시 N+1 쿼리 발생</li>
              <li>
                각 댓글마다 좋아요 상태를 확인하기 위해 contains() 반복 호출
              </li>
              <li>댓글 10개 → 쿼리 11개 발생 (LAZY 로딩 문제)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결 목표
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>DB 쿼리 수 최소화 및 응답 속도 개선</li>
              <li>좋아요 상태 조회 방식 효율화</li>
              <li>전체 처리량 향상 및 코드 가독성 개선</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 해결 1: N+1 쿼리 해결 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 1: N+1 쿼리 해결
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 기존 방식 (비효율)
            </h4>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`List<Comment> comments = board.getComments(); // 댓글 수만큼 추가 쿼리 발생`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              💬 문제점: LAZY 로딩으로 인해 댓글 수 N만큼 DB 쿼리 추가 발생 →
              N+1
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 개선 방법
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Fetch Join을 사용해 댓글 + 작성자 정보를 단일 쿼리로 조회
            </p>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`@Query("""
SELECT c FROM Comment c
JOIN FETCH c.user
WHERE c.board.id = :boardId AND c.status = :status
ORDER BY c.creationTime ASC
""")
List<Comment> findWithUserByBoardIdAndStatus(Long boardId, Status status);`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              💡 단일 쿼리로 모든 댓글과 작성자 정보를 한 번에 조회
            </p>
          </div>
        </div>
      </div>

      {/* 해결 2: 좋아요 상태 조회 최적화 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 2: 좋아요 상태 조회 최적화
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 기존 방식 (비효율)
            </h4>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`boolean isLiked = likedIds.contains(comment.getId()); // 댓글 수만큼 반복 탐색 (O(n))`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 개선 방법
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Map 자료구조로 변경하여 시간복잡도 O(n) → O(1) 로 개선
            </p>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`Map<Long, Boolean> likedMap = likes.stream()
    .map(like -> like.getComment().getId())
    .collect(Collectors.toMap(Function.identity(), id -> true));

boolean isLiked = likedMap.getOrDefault(comment.getId(), false); // O(1)`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              💡 Map.get()으로 O(1) 시간복잡도로 좋아요 상태 조회
            </p>
          </div>
        </div>
      </div>

      {/* 최종 통합 코드 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 최종 통합 코드 (핵심 부분)
        </h3>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {`public List<CommentResponseDto> getCommentsByBoardId(Long boardId, Long userId) {
    // 1. Fetch Join으로 N+1 해결
    List<Comment> comments = commentRepository.findWithUserByBoardIdAndStatus(boardId, Status.ACTIVE);

    // 2. 좋아요 상태 Map으로 최적화
    List<Long> commentIds = comments.stream().map(Comment::getId).toList();
    List<CommentLike> likes = likeRepository.findByCommentIdInAndUserId(commentIds, userId);

    Map<Long, Boolean> likedMap = likes.stream()
        .map(like -> like.getComment().getId())
        .collect(Collectors.toMap(Function.identity(), id -> true));

    return comments.stream()
        .map(comment -> CommentResponseDto.fromEntity(comment, likedMap.getOrDefault(comment.getId(), false)))
        .toList();
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* 성능 개선 결과 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📈 성능 개선 결과 (JMeter 테스트)
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📌 댓글 목록 조회 API
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      지표
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 전
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 후
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선율
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      평균 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      105ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      17ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▼ 83.8% 단축
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      최대 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      620ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      138ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▼ 77.7% 단축
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      처리량 (TPS)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      80.1/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      102.2/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 27.6% 향상
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      응답 안정성 점수
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      90.66
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      8.42
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▼ 90.7% 개선
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 정리 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ 정리</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Fetch Join을 통해 N+1 쿼리 제거</li>
          <li>좋아요 여부는 Set.contains() 대신 Map.get()으로 최적화</li>
          <li>평균 응답 시간 84% 단축, 처리량 27% 증가</li>
        </ul>
        <p className="text-sm text-gray-700 mt-3">
          <strong>
            🧠 단순 조회 로직도 성능 병목의 원인이 될 수 있으며, 사전 대응이
            중요함을 실무에서 체감했습니다.
          </strong>
        </p>
      </div>
    </div>
  );
}
