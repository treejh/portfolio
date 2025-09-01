export default function HakpleTroubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📌 Redis 기반 좋아요 동기화 및 동시성 문제 해결
        </h3>

        <div className="space-y-4">
          {/* 문제 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🧨 문제
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              서비스 내 댓글에 대한 좋아요 기능을 구현하던 중, 다음과 같은
              문제가 발생:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                여러 사용자가 동시에 좋아요를 누르는 경우, likeCount 필드를
                DB에서 직접 수정함에 따라 트랜잭션 충돌 및 락 경합 현상이 발생함
              </li>
              <li>
                동시 요청 처리 중 좋아요 수가 틀어지거나, DB 반영이 지연되는
                등의 데이터 정합성 문제가 나타남
              </li>
              <li>
                트래픽이 몰리는 시점에는 DB 부하 증가로 전체 응답 지연 현상이
                발생함
              </li>
            </ul>
          </div>

          {/* 과정 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔍 과정
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              문제 분석을 통해 다음 사항을 파악:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                좋아요 수는 실시간으로 빠르게 업데이트되어야 하지만, 반드시 DB
                트랜잭션 안에서 처리할 필요는 없음
              </li>
              <li>
                likeCount는 계산 가능한 값이며, 정확성만 보장되면 Redis 등 임시
                저장소에서 캐싱해도 무방함
              </li>
              <li>
                동시에 여러 요청이 들어올 경우 임계 구간을 보호하기 위한 락
                처리가 필요함
              </li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              이에 따라, 다음과 같은 방향으로 리팩토링을 진행함:
            </p>
          </div>

          {/* 해결 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <b>Redis 캐시 도입</b>
                <br />
                Redis에 <code>
                  comment:like:count:&#123;commentId&#125;
                </code>{" "}
                형태의 키로 좋아요 수를 저장
                <br />
                사용자가 좋아요를 누르면 Redis에서 INCR, 취소 시 DECR 연산을
                수행
                <br />
                댓글의 좋아요 수 조회 시에도 Redis 값을 우선적으로 사용함
              </li>
              <li>
                <b>Redisson 분산 락 적용</b>
                <br />
                동일한 댓글에 대해 동시에 좋아요 요청이 들어오는 경우를 제어하기
                위해 Redisson 기반의 RLock 적용
                <br />한 사용자 요청이 완료되기 전까지는 다른 요청이 해당
                리소스를 건드릴 수 없도록 처리
              </li>
              <li>
                <b>주기적 DB 동기화</b>
                <br />
                Redis의 좋아요 수를 5분마다 DB에 반영하는 스케줄러 구현
                <br />
                Redis 장애 시에도 기존 DB 값으로 Fallback 가능하도록 보완
              </li>
            </ol>

            {/* 코드 예시 */}
            <div className="mt-6">
              <h5 className="text-md font-semibold text-gray-800 mb-3">
                💻 구현 코드 예시
              </h5>

              <div className="space-y-4">
                {/* 1. 좋아요 처리 (+1) */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 1. 좋아요 처리 (+1)
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`redisTemplate.opsForValue().increment("comment:like:count:" + commentId);`}
                  </pre>
                </div>

                {/* 2. 좋아요 취소 (-1) */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 2. 좋아요 취소 (-1)
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`redisTemplate.opsForValue().decrement("comment:like:count:" + commentId);`}
                  </pre>
                </div>

                {/* 3. 좋아요 수 조회 (Redis → DB fallback) */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 3. 좋아요 수 조회 (Redis → DB fallback)
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`Integer count = redisTemplate.opsForValue().get(key);
return (count != null) ? count : DB에서 조회;`}
                  </pre>
                </div>

                {/* 4. Redis → DB 동기화 스케줄러 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 4. Redis → DB 동기화 스케줄러
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`@Scheduled(fixedRate = 300000) // 5분마다
comment.setLikeCount(count from Redis);
commentRepository.save(comment);`}
                  </pre>
                </div>

                {/* 5. Redisson 락 기반 좋아요 토글 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 5. Redisson 락 기반 좋아요 토글
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`RLock lock = redissonClient.getLock("lock:comment:like:" + commentId);
if (lock.tryLock(5, 3, TimeUnit.SECONDS)) {
    if (이미 좋아요) {
        likeRepository.delete(...);
        Redis.decrement(...);
    } else {
        likeRepository.save(...);
        Redis.increment(...);
    }
}
lock.unlock();`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📈 결과 (JMeter 테스트)
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
                      52ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      29ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▼ 44%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      최대 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      1824ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      64ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▼ 96%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      처리량
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      3.4/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      32.0/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 9.4배
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      응답 안정성
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      135.84
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      5.31
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      크게 향상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 핵심 개선:</strong> Redis 캐시와 Redisson 락을 통해
                좋아요 요청 처리 성능이 9배 이상 향상되었으며, 동시성 문제도
                완전히 해결하여 안정적인 서비스를 제공할 수 있게 됨.
              </p>
            </div>

            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-4">
              <li>좋아요 요청 처리 성능이 9배 이상 향상됨</li>
              <li>Redis 캐시 구조를 통해 DB 부하를 크게 줄임</li>
              <li>Redisson 락을 통해 정합성과 동시성 안전성을 확보</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
