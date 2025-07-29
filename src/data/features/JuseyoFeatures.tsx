export default function JuseyoFeatures() {
  return (
    <div className="space-y-6">
      {/* 주요 포인트 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          주요 포인트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              🌟 부서 및 역할(Role) 기반 권한 관리
            </h4>
            <p className="text-sm text-gray-600">
              기업 조직 구조에 맞춘 세분화된 권한 관리 시스템으로 보안성과
              효율성을 동시에 확보
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              🔄 요청 → 승인 → 반납 흐름 구조
            </h4>
            <p className="text-sm text-gray-600">
              체계적인 워크플로우로 업무 프로세스 자동화 및 투명성 확보
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              📊 실시간 상태 추적 및 Excel 입출력
            </h4>
            <p className="text-sm text-gray-600">
              실시간 재고 현황 파악과 Excel 연동으로 데이터 관리 효율성 극대화
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              💬 SSE 기반 알림 & STOMP 기반 실시간 채팅
            </h4>
            <p className="text-sm text-gray-600">
              실시간 커뮤니케이션으로 사용자 경험 향상 및 업무 효율성 증대
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
            <h4 className="font-semibold text-gray-800 mb-2">
              🤖 사용자 맞춤 비품 추천 기능 구현
            </h4>
            <p className="text-sm text-gray-600">
              협업 필터링 알고리즘을 활용한 개인화된 추천 시스템으로 사용자
              만족도 향상
            </p>
          </div>
        </div>
      </div>

      {/* 상세 기능 섹션 */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📋 상세 기능</h3>

          {/* 회원가입 및 인증 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">👥</span>
              회원가입 및 인증
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              역할 기반 회원가입 및 JWT 인증 방식을 적용하여 보안성과 관리
              편의성을 높였습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                역할(Role)에 따른 회원가입: 관리자(Admin), 일반 사용자(User),
                최초 매니저(Initial Manager), 일반 매니저(Manager)
              </li>
              <li>JWT 기반 인증 및 권한 관리</li>
              <li>이메일 인증 / 휴대폰 인증 구현</li>
              <li>
                Refresh Token을 Redis에 저장하여, RTR 방식(Refresh Token
                Rotation)으로 Access Token 재발급
              </li>
            </ul>
          </div>

          {/* 비품 관리 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📑</span>
              비품 관리
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>비품 CRUD: 비품 추가, 수정, 삭제, 조회 기능</li>
              <li>비품요청 관리: 사용자별 요청 생성, 수정, 승인, 반려</li>
              <li>대여 처리: 대여 승인 시 출고 상태 변경 및 재고 차감</li>
              <li>반납 처리: 반납 승인 시 입고 상태 변경 및 재고 복구</li>
              <li>개별자산 관리: 비품의 인스턴스 단위 등록 및 상태 관리</li>
              <li>비품추적: 요청 처리 시 이력 기록 및 상태 변경 추적</li>
              <li>엑셀 내보내기: 데이터 다운로드</li>
            </ul>
          </div>

          {/* 채팅 기능 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">💬</span>
              채팅 기능
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              STOMP 기반 WebSocket으로 구현한 실시간 채팅 기능입니다. 1:1,
              고객센터, 그룹 채팅을 지원하며, JWT 인증과 Redis, RDS를 활용한
              구조입니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>STOMP + SockJS 기반 실시간 메시지 전송</li>
              <li>1:1 / 고객센터 / 그룹 채팅방 생성 및 관리</li>
              <li>JWT 쿠키 인증 기반 세션 사용자 메시지 처리</li>
              <li>메시지 RDS 저장, 채팅방 상태 Redis 관리</li>
              <li>미확인 메시지 &apos;NEW&apos; 뱃지 표시</li>
              <li>중복 채팅방 생성 방지</li>
            </ul>
          </div>

          {/* 알림 기능 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">✨</span>
              알림 기능
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              권한(Role)에 따라 다양한 이벤트 발생 시 알림을 전송하도록 옵저버
              패턴과 스케줄러 기반 로직을 조합하여 구현했습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                역할 기반 알림 시스템: 권한(Role)에 따라 다양한 이벤트에 대해
                알림을 전송
              </li>
              <li>
                옵저버 패턴 적용: 비품 요청/반납, 회원 가입 등 실시간 이벤트
                발생 시 즉시 알림 발송
              </li>
              <li>
                스케줄러 기반 알림: 지정 반납일 초과, 요청 지연 등 주기적 검사에
                따른 알림 발송
              </li>
              <li>SSE(Server-Sent Events) 기반 실시간 알림 전달</li>
            </ul>
          </div>

          {/* 검색 및 추천 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🔍</span>
              검색 및 추천
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>키워드/카테고리 기반 검색</li>
              <li>협업 필터링 알고리즘을 통한 비품 추천</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
