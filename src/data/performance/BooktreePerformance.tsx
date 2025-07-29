export default function BooktreePerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📈 BookTree 성능 최적화 사례
        </h3>

        <div className="space-y-6">
          {/* AWS S3 이미지 최적화 */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              ☁️ AWS S3 이미지 처리 최적화
            </h4>

            <div className="space-y-4">
              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  🎯 최적화 목표
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>대용량 이미지 파일의 업로드/다운로드 속도 개선</li>
                  <li>스토리지 비용 절감을 위한 이미지 용량 최적화</li>
                  <li>사용자 경험 향상을 위한 로딩 시간 단축</li>
                </ul>
              </div>

              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  🔧 구현 방법
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>클라이언트 사이드에서 이미지 압축 처리 적용</li>
                  <li>
                    적절한 이미지 포맷 자동 선택 (WebP 우선, JPEG/PNG 폴백)
                  </li>
                  <li>S3 버킷 정책 최적화로 CDN 효과 극대화</li>
                  <li>이미지 업로드 전 크기 제한 및 유효성 검증</li>
                  <li>Progressive JPEG 적용으로 점진적 로딩 구현</li>
                </ul>
              </div>

              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  📊 성능 개선 결과
                </h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                          지표
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                          최적화 전
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                          최적화 후
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                          개선율
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          평균 이미지 로딩 시간
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          2.3초
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          0.8초
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                          ▼ 65%
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          이미지 파일 크기
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          평균 1.2MB
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          평균 350KB
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                          ▼ 71%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          월간 스토리지 비용
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          $12
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          $4
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                          ▼ 67%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 검색 성능 최적화 */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              🔍 검색 기능 성능 최적화
            </h4>

            <div className="space-y-4">
              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  ⚡ 최적화 포인트
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>다중 조건 검색 시 쿼리 성능 개선</li>
                  <li>검색 결과 페이징 처리 최적화</li>
                  <li>자주 검색되는 키워드 캐싱 전략</li>
                </ul>
              </div>

              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  🛠️ 적용 기술
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>MySQL 복합 인덱스 설계 및 적용</li>
                  <li>LIKE 쿼리 최적화 및 Full-Text Search 활용</li>
                  <li>검색 결과 캐싱을 위한 Redis 도입 검토</li>
                  <li>페이징 처리 시 COUNT 쿼리 최적화</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                  💻 최적화된 검색 쿼리 예시
                </h5>
                <pre className="text-xs text-gray-800 bg-gray-50 p-3 rounded border overflow-x-auto">
                  {`-- 복합 인덱스 활용 검색 쿼리
SELECT p.*, u.username, c.name as category_name
FROM posts p
JOIN users u ON p.user_id = u.id
JOIN categories c ON p.category_id = c.id
WHERE (p.title LIKE ? OR p.author LIKE ? OR p.book_name LIKE ?)
AND p.status = 'ACTIVE'
ORDER BY p.view_count DESC, p.created_at DESC
LIMIT ? OFFSET ?;

-- 인덱스: idx_posts_search(status, title, author, book_name, view_count)`}
                </pre>
              </div>
            </div>
          </div>

          {/* OAuth2 인증 최적화 */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">
              🔐 OAuth2 인증 프로세스 최적화
            </h4>

            <div className="space-y-4">
              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  🎯 최적화 목표
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>소셜 로그인 응답 시간 단축</li>
                  <li>토큰 관리 효율성 향상</li>
                  <li>사용자 정보 동기화 성능 개선</li>
                </ul>
              </div>

              <div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  🔧 구현 방법
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>JWT 토큰 페이로드 최적화로 크기 축소</li>
                  <li>OAuth2 콜백 처리 로직 비동기화</li>
                  <li>사용자 정보 캐싱 전략 적용</li>
                  <li>토큰 갱신 프로세스 자동화</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                  ⚡ 성능 개선 결과
                </h5>
                <div className="text-sm text-gray-700">
                  <p>
                    • 소셜 로그인 완료 시간: <strong>3.2초 → 1.1초</strong> (66%
                    개선)
                  </p>
                  <p>
                    • 토큰 검증 속도: <strong>150ms → 45ms</strong> (70% 개선)
                  </p>
                  <p>
                    • 사용자 정보 동기화: <strong>800ms → 200ms</strong> (75%
                    개선)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 전체 성능 개선 요약 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📈 전체 성능 개선 요약
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">
                  ✅ 핵심 개선 사항
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>AWS S3 이미지 최적화로 로딩 속도 65% 향상</li>
                  <li>검색 쿼리 인덱싱으로 검색 속도 대폭 개선</li>
                  <li>OAuth2 인증 프로세스 66% 단축</li>
                  <li>전체적인 사용자 경험 품질 향상</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">
                  🎯 추가 최적화 계획
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>CDN 도입으로 글로벌 접근 속도 개선</li>
                  <li>데이터베이스 커넥션 풀 최적화</li>
                  <li>프론트엔드 번들 크기 최적화</li>
                  <li>서버 사이드 캐싱 전략 고도화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
