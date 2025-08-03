export default function JuseyoPerformance() {
  return (
    <div className="space-y-6">
      {/* 참고 링크 */}
      <div className="mb-2">
        <p className="text-gray-500 text-sm mb-3">
          → 관련 기술과 고민은{" "}
          <a
            href="https://dose-blog.tistory.com/entry/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B3%A0%EB%8F%84%ED%99%94-%EC%B1%84%ED%8C%85-%EB%A9%94%EC%8B%9C%EC%A7%80-%EC%A1%B0%ED%9A%8C-Redis-%EC%BA%90%EC%8B%B1-%EB%B0%8F-%EB%9D%BD-%EB%8F%84%EC%9E%85"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 underline decoration-gray-400 hover:decoration-gray-600"
          >
            블로그 글
          </a>
          에서 확인 가능합니다
        </p>
      </div>

      {/* 제목 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🧩 채팅 메시지 조회 캐싱 및 동시성 제어 성능 개선
        </h3>

        <div className="space-y-4">
          {/* 🔁 Redisson 사용 결정 이유 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔁 Redisson 사용 결정 이유
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
              <li>
                채팅 메시지 캐시는 TTL 기반이라 Lettuce로 락 확인만 해도 충분해
                보였으나, 트래픽이 몰릴 때는 락 획득이 동시에 일어나고,
                <span className="font-semibold">
                  Lettuce 사용 시 수많은 요청이 CPU를 점유한 채로 락 확인을 반복
                </span>
              </li>
              <li>
                이로 인해{" "}
                <span className="font-semibold text-red-600">
                  서버 부하가 급격히 증가
                </span>
                할 수 있어,
                <span className="font-semibold text-blue-700">Redisson</span>을
                사용하기로 결정
              </li>
            </ul>
          </div>

          {/* 1. Redis 분산 락 도입 배경 */}
          <div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                📌 도입 배경
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                실시간 채팅 기능 개발 중, 메시지 페이지 조회 시 다음과 같은 성능
                문제가 발생:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  클라이언트가 채팅방에 진입할 때마다 메시지를 DB에서 직접 조회
                </li>
                <li>빈 메시지 응답도 매번 DB 접근 → 불필요한 쿼리 낭비</li>
                <li>
                  동시 요청 시 중복된 DB 조회가 병렬로 발생 → Race Condition 및
                  성능 저하
                </li>
                <li>전체 응답 성공률 및 속도 모두 불안정</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded mt-2 text-sm text-gray-700">
            <div className="mb-2 font-semibold">문제 상황:</div>
            <pre className="mb-2">{`모든 채팅방(단체/개인/고객센터)이 하나의 메시지 조회 API를 공유함

- 메시지 조회 시마다 DB에 직접 접근 (캐시 미적용)
- 동시에 수십~수백 명이 요청 → 모든 요청이 DB 조회 시도
- 대량의 DB 쿼리 발생으로 응답 지연 및 실패율 증가

public Page<ChatMessage> getChatMessage(Long roomId, Pageable pageable) {
    User user = userService.findById(tokenService.getIdFromToken());
    ChatRoom chatRoom = chatRoomService.findChatRoomById(roomId);

    if (chatUserRepository.findByUserAndChatRoom(user, chatRoom).isEmpty()) {
        throw new BusinessLogicException(ExceptionCode.NOT_ENTER_CHAT_ROOM);
    }

    return chatMessageRepository.findByChatRoom(chatRoom, pageable);
}
`}</pre>
          </div>

          {/* 목표 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결 목표
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>반복적인 메시지 조회 요청에 대한 DB 부하 완화</li>
              <li>캐시 기반 응답 구조 도입으로 평균 응답 시간 개선</li>
              <li>
                Redisson 기반 분산 락을 통해 캐시 MISS 상황에서의 동시성 문제
                방지
              </li>
              <li>AOP 적용으로 락 처리 로직을 재사용 가능하게 분리</li>
              <li>
                <span className="font-semibold">
                  Prometheus + Grafana 연동을 통해 성능 지표 실시간 수집 및
                  모니터링 체계 구축
                </span>
                <br />
                <span className="ml-2 text-gray-600">
                  → 성능 개선 전후 효과를 수치 기반으로 검증 가능
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 해결 1: Redis 캐시 + AOP 기반 분산 락 구조 도입 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 1: Redis 캐시 + AOP 기반 분산 락 구조 도입
        </h3>
        <div className="space-y-4">
          {/* 기존 방식 (비효율) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 기존 방식 (비효율)
            </h4>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <pre className="text-sm text-gray-700 overflow-x-auto">{`public Page<ChatMessage> getChatMessage(Long roomId, Pageable pageable) {
    // 매 요청마다 DB 접근
    return chatMessageRepository.findByChatRoom(chatRoom, pageable);
}`}</pre>
            </div>
            <p className="text-sm text-gray-700 mt-2 font-semibold">
              💬 문제점:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
              <li>매 요청마다 직접 DB 접근 → 트래픽 증가 시 병목</li>
              <li>
                캐시 TTL이 만료되면 다수 요청이 동시에 DB 접근 → Race Condition
              </li>
              <li>락 처리 없이 동시에 요청 → 중복 연산, 응답 실패율 증가</li>
            </ul>
          </div>

          {/* 개선 방법 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 개선 방법
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-[400px] bg-white border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-gray-700 font-semibold">
                      항목
                    </th>
                    <th className="px-4 py-2 border-b text-gray-700 font-semibold">
                      적용 기술
                    </th>
                    <th className="px-4 py-2 border-b text-gray-700 font-semibold">
                      설명
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium text-gray-800">
                      📦 캐싱 구조
                    </td>
                    <td className="px-4 py-2 text-blue-700">Redis</td>
                    <td className="px-4 py-2 text-gray-800">
                      chatroom:&#123;roomId&#125;:messages:page:&#123;n&#125;
                      키에 메시지 저장
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium text-gray-800">
                      🔐 분산 락
                    </td>
                    <td className="px-4 py-2 text-blue-700">Redisson + AOP</td>
                    <td className="px-4 py-2 text-gray-800">
                      <span className="font-mono">@RedisCacheLock</span> 커스텀
                      애노테이션으로 락 처리 추상화
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-800">
                      ⏱ 재시도 로직
                    </td>
                    <td className="px-4 py-2 text-blue-700">AOP 내부 구현</td>
                    <td className="px-4 py-2 text-gray-800">
                      락 획득 실패 시 일정 시간 간격으로 Redis 재조회
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* 🛠 핵심 구현 (간략 예시) */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  🛠 핵심 구현 (간략 예시)
                </h4>
                <div className="bg-gray-100 p-4 rounded">
                  <pre className="text-sm text-gray-700 overflow-x-auto">{`@RedisCacheLock(key = "'chatroom:' + #roomId + ':messages:page:' + #pageable.pageNumber")
public Page<ChatResponseDto> getChatMessageWithLock(...) {
    // 캐시 Double-check → DB 조회 → Redis 저장
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 해결 2: TTL 만료 시 Redisson 락 적용 */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 해결 2: TTL 만료 시 Redisson 락 적용
        </h3>

        {/* 기존 문제 상황 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            🔧 기존 방식 (문제 상황)
          </h4>
          <div className="bg-gray-100 p-4 rounded mt-2 text-sm text-gray-700">
            <pre>{` Redis 캐시 TTL이 만료되면 모든 요청이 동시에 DB 접근
 캐시 MISS가 동시에 발생 → 동일한 DB 쿼리가 중복 실행됨`}</pre>
          </div>

          <p className="text-sm text-gray-700 mt-2 font-semibold">💬 문제점:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
            <li>
              수십~수백 개의 요청이 동시에 DB를 조회 → 응답 지연 및 DB 부하 폭증
            </li>
            <li>
              TTL 만료 순간에 캐시가 없으므로 모든 요청이 MISS 상태로 진입
            </li>
            <li>락 없이 처리하면 Race Condition 발생 → 실패율 증가</li>
          </ul>
        </div>

        {/* 개선 방법 */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            ✅ 개선 방법
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>
              <strong>Redisson</strong>을 활용해 분산 락 적용 → 동시에 단 하나의
              요청만 DB 접근 허용
            </li>
            <li>
              락 처리 로직은 <code>@RedisCacheLock</code> 커스텀 애노테이션으로
              AOP에 위임
            </li>
            <li>
              <strong>락 획득 실패 시</strong>에는 일정 시간 대기하며 Redis를
              재조회 → 캐시가 채워지면 그대로 응답
            </li>
            <li>
              재시도 횟수 (<code>lockRetry</code>) 및 대기 간격 (
              <code>delayMillis</code>)은 설정값으로 제어
            </li>
            <li>끝까지 캐시가 없으면 fallback으로 메서드 실행 → 안정성 확보</li>
          </ul>
        </div>

        {/* 재시도 로직 요약 */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            🔁 락 실패 시 캐시 재시도 전략
          </h4>
          <div className="bg-gray-100 p-4 rounded text-sm text-gray-700">
            <pre>{`for (int i = 0; i < lockRetry; i++) {
    List<Object> cached = redisTemplate.opsForList().range(key, 0, -1);
    if (cached != null && !cached.isEmpty()) {
        return cached; // 캐시가 채워지면 바로 반환
    }
    Thread.sleep(delayMillis); // 대기 후 재시도
}`}</pre>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            락 획득 실패 시에도 무작정 실패시키지 않고, 짧은 시간 간격으로
            캐시를 재조회하며 <strong>결과를 공유</strong>할 수 있도록
            설계했습니다. 덕분에 동시성 안정성과 성능을 모두 확보할 수
            있었습니다.
          </p>
        </div>

        {/* 핵심 흐름 요약 */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            📌 해결 2: 흐름 요약
          </h4>
          <pre className="text-sm bg-gray-100 p-4 rounded text-gray-700 overflow-x-auto">{`[요청 A] 캐시 MISS → 락 획득 성공 → DB 조회 + Redis 저장
[요청 B, C, D...] 캐시 MISS → 락 실패 → Redis 재조회 반복 → 캐시 HIT → 바로 응답`}</pre>
        </div>
      </div>

      {/* 1-1. 전체 동작 흐름 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          🛠️ 전체 동작 흐름 (Redisson + Redis 캐싱)
        </h2>
        <div className="bg-gray-100 p-4 rounded mt-2">
          <pre className="text-sm text-gray-700 overflow-x-auto">{`🧑‍💻 [클라이언트] 
   → GET /api/v1/chats/{roomId}?page=0

📦 [Spring 서버: ChatMessageService.getChatMessage(roomId, pageable)]
   └─ 🔍 Redis 캐시 조회 (🔑 chatroom:{roomId}:messages:page:0)
        ├─ ✅ 캐시 HIT → 메시지 리스트 반환
        └─ ❌ 캐시 MISS
             └─ 🔒 Redisson 락 획득 시도
                  ├─ 🔓 락 획득 성공
                  │    ├─ 📄 DB에서 메시지 조회
                  │    ├─ 📝 Redis에 캐시 저장 + TTL 설정
                  │    └─ 📤 결과 반환
                  └─ 🔐 락 획득 실패
                       └─ ⏳ 짧게 대기 후 캐시 재조회 or fallback

`}</pre>
        </div>
      </div>

      {/* 성능 개선 결과 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📈 성능 개선 결과 (k6 + Prometheus + Grafana)
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📊 부하 테스트 주요 지표
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      지표 항목
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 전
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 후
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 효과
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      총 요청 수
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      1481
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      3659
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      +147% 증가
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      응답 성공률
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      63.9%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      100%
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      +36.1% 향상
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      평균 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      17.78s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      5.98s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      -66.4% 단축
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      95% 응답 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      35.11s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      11.57s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      -67% 단축
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      실패 요청 수
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      534 (36.05%)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      0
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      0% 실패
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      처리량 (RPS)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      18.4 req/s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      63.4 req/s
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      +244% 향상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 모니터링 스크린샷 */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <img
                src="/images/before.png"
                alt="개선 전 Grafana 대시보드"
                className="rounded shadow"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                개선 전: 요청 실패율 36.5%, 응답 지연 심각
              </p>
            </div>
            <div className="flex-1">
              <img
                src="/images/after.png"
                alt="개선 후 Grafana 대시보드"
                className="rounded shadow"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                개선 후: 100% 성공률, 처리량 2.4배 증가
              </p>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            <strong>k6 + Prometheus + Grafana</strong>로 실시간 부하 테스트 및
            모니터링 자동화
          </div>
        </div>
      </div>

      {/* 효과 요약 */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          📊 효과 요약
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>캐시 우선 구조로 조회 응답 속도 획기적 개선</li>
          <li>Redisson 기반 분산 락 적용으로 동시성 문제 해결</li>
          <li>AOP 기반 락 적용으로 재사용성 및 유지보수성 향상</li>
          <li>
            평균 응답 시간 66% 단축, 요청 실패율 0% 달성, 처리량 2.4배 증가
          </li>
        </ul>
      </div>

      {/* 정리 및 인사이트 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🧠 실무에서의 인사이트
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-3">
          <li>
            <span className="font-semibold text-blue-900">
              실시간성이 중요한 서비스에서는 단순 조회 API도 서비스 전체의
              병목점이 될 수 있음
            </span>
          </li>
          <li>
            <span className="font-semibold text-blue-900">
              TTL + 분산 락 + 캐시 저장 조합은 대량 요청 환경에서도 안정적인
              성능을 확보하는 핵심 전략
            </span>
          </li>
          <li>
            락 처리, 캐시 접근, 예외 대응 등의 공통 로직을{" "}
            <span className="font-mono font-semibold">@AOP</span>로 추상화하여
            코드 재사용성과 유지보수성 강화
          </li>
          <li>
            <span className="font-semibold text-blue-700">
              k6 + Prometheus + Grafana
            </span>
            를 통한 실시간 부하 테스트 및 모니터링으로 개선 효과를 수치로
            검증하고 운영 신뢰도 향상
          </li>
        </ul>
        <p className="text-sm text-gray-700">
          이번 개선을 통해, 불필요한 DB 접근을 막고 캐시 기반의 안전한 병렬
          처리를 구현하는 것이 얼마나 중요한지 실감했습니다.
          <br />
          실시간 모니터링과 자동화된 테스트 환경 덕분에, 개선 효과를 명확하게
          수치로 검증하고 운영 신뢰성을 크게 높일 수 있었습니다.
        </p>
      </div>
    </div>
  );
}
