export default function JuseyoPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📦 비품 통계 API 캐싱 및 성능 최적화
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📌 배경
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              카테고리별 수량/종류 통계, 품목 사용 빈도, Outbound 상태 통계 등
              주요 통계 API가 자주 호출
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>통계 호출마다 복잡한 DB 연산 + 그룹핑 발생</li>
              <li>사용자 수 증가에 따라 응답 지연, DB 부하 증가</li>
              <li>TTL 만료 시점에 다수의 요청 동시 유입 → DB 병목 발생</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결 목표
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>주요 분석 API 평균 응답 속도 200ms 이하 달성</li>
              <li>Redis 캐싱 도입으로 DB 조회 횟수 최소화</li>
              <li>TTL 만료 후 동시성 문제(Redisson Lock) 제어</li>
              <li>실시간 통계 + 정확성 + 확장성 동시 확보</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 해결 1: Redis 캐시 구조 최적화 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 1: Redis 캐시 구조 최적화
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 기존 방식 (비효율)
            </h4>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`List<Item> items = itemRepository.findAllByManagementDashboardIdAndStatus(managementId, Status.ACTIVE);
Map<String, CategorySummaryDTO> result = process(items); // 매 요청마다 DB 접근 + 가공`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">💬 문제점:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
              <li>매번 DB에서 전체 품목 데이터를 조회</li>
              <li>불필요한 반복 연산 및 응답 지연 발생</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 개선 방법
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              통계 목적별로 Redis 자료구조를 분리 설계
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      항목
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      Redis 자료구조
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      TTL
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      목적
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      카테고리별 요약 통계
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Value (Map)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">30분</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      반복 요청에 대해 빠른 응답 제공
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      품목 사용 빈도 랭킹
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">ZSet</td>
                    <td className="px-4 py-3 text-sm text-gray-700">실시간</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Top-N 정렬 및 점수 누적에 최적화
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Outbound 상태 통계
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">Hash</td>
                    <td className="px-4 py-3 text-sm text-gray-700">10분</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      상태별 개수 빠른 조회
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`Map<String, CategorySummaryDTO> cached = redisTemplate.opsForValue().get(key);
if (cached != null) return cached;

// MISS일 때만 DB 조회 및 Redis 저장`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 해결 2: TTL 만료 시 Redisson 락 적용 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 2: TTL 만료 시 Redisson 락 적용
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 기존 방식 (문제 상황)
            </h4>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`// 캐시가 만료되면 모든 요청이 동시에 DB 접근 → 병목 발생`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">💬 문제점:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
              <li>수십 개의 요청이 동시에 DB 조회 수행</li>
              <li>급격한 트래픽 상승 시 DB 부하 폭증</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 개선 방법
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Redisson RLock 적용으로 한 요청만 DB 접근 허용</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`RLock lock = redissonClient.getLock("lock:outbound:count:" + managementId);
if (lock.tryLock(3, 2, TimeUnit.SECONDS)) {
    // DB 조회 후 Redis 저장
}`}
              </pre>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              그 외 요청은 캐시가 적재된 후 Redis HIT로 빠르게 응답
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
          {/* 1. 카테고리 요약 통계 캐시 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              🔍 카테고리 요약 통계 캐시
            </h4>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`public Map<String, CategorySummaryDTO> getCategorySummary() {
    String key = getCategorySummaryKey(managementId);
    Map<String, CategorySummaryDTO> cached = (Map<String, CategorySummaryDTO>) 
        objectRedisTemplate.opsForValue().get(key);
    if (cached != null) return cached;

    // DB 조회 및 가공
    List<Item> items = itemRepository.findAllByManagementDashboardIdAndStatus(...);
    Map<String, CategorySummaryDTO> result = ...;

    objectRedisTemplate.opsForValue().set(key, result, Duration.ofMinutes(30));
    return result;
}`}
              </pre>
            </div>
            <div className="mt-2 p-2 bg-green-50 rounded">
              <p className="text-xs text-green-700">
                <strong>💡 특징:</strong> Value 구조로 30분 TTL, 반복 요청에
                대해 빠른 응답 제공
              </p>
            </div>
          </div>

          {/* 2. 품목별 사용 빈도 Top-N 조회 (ZSet) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📈 품목별 사용 빈도 Top-N 조회 (ZSet)
            </h4>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`public List<ItemUsageFrequencyDTO> getItemUsageRanking(int topN) {
    Set<ZSetOperations.TypedTuple<String>> zset = stringRedisTemplate.opsForZSet()
        .reverseRangeWithScores(redisKey, 0, topN - 1);
    ...
}`}
              </pre>
            </div>
            <div className="mt-2 p-2 bg-blue-50 rounded">
              <p className="text-xs text-blue-700">
                <strong>💡 특징:</strong> ZSet 구조로 실시간 랭킹, 점수 기반
                정렬 및 Top-N 조회 최적화
              </p>
            </div>
          </div>

          {/* 3. Outbound 상태 통계 (Redisson 분산 락) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📦 Outbound 상태 통계 (Redisson 분산 락)
            </h4>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`public Map<Outbound, Long> loadAndCacheOutboundSummary() {
    RLock lock = redissonClient.getLock(lockKey);
    if (lock.tryLock(1, 5, TimeUnit.SECONDS)) {
        // Redis 재확인 후 DB 조회
        List<Object[]> results = itemInstanceRepository
            .countAllByOutboundGroupAndManagementIdAndStatus(...);
        Map<String, String> redisMap = ...;
        objectRedisTemplate.opsForHash().putAll(redisKey, redisMap);
        objectRedisTemplate.expire(redisKey, Duration.ofMinutes(10));
        return mapped;
    } else {
        // 락 실패 시 짧게 대기 후 캐시 재확인
    }
}`}
              </pre>
            </div>
            <div className="mt-2 p-2 bg-orange-50 rounded">
              <p className="text-xs text-orange-700">
                <strong>💡 특징:</strong> Hash 구조 + Redisson 락으로 동시성
                제어, 10분 TTL로 상태별 개수 빠른 조회
              </p>
            </div>
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
              📌 1. 카테고리별 수량/종류 분석 API
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
                      596ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      74ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 87.6% 개선
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      최대 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      1531ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      190ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 87.6% 개선
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      처리량 (TPS)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      24.0/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      32.5/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 35.4% 향상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📌 2. Outbound 상태 통계 API
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
                      263ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      74ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 71.9% 개선
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      최대 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      1538ms
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      498ms
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 67.6% 개선
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      처리량 (TPS)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      30.5/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      32.9/sec
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 7.9% 향상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 효과 요약 */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          📊 효과 요약
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          <strong>평균 응답 시간 최대 88% 단축, 처리량 최대 35% 향상</strong>
        </p>
        <p className="text-sm text-gray-700">
          → 고부하 상황에서도 안정적 통계 처리 가능
        </p>
      </div>

      {/* 정리 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ 정리</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Redis 자료구조를 통계 목적별로 Value, ZSet, Hash로 분리 설계</li>
          <li>Redisson 분산 락으로 TTL 만료 시 중복 조회 방지</li>
          <li>응답 속도는 최대 88% 단축, 처리량은 최대 35% 증가</li>
        </ul>
        <p className="text-sm text-gray-700 mt-3">
          <strong>
            🧠 실시간 분석 시스템에서 TTL 전략, 동시성 제어, 직렬화 성능이
            얼마나 중요한지 실무를 통해 깊이 체감한 경험입니다.
          </strong>
        </p>
      </div>
    </div>
  );
}
