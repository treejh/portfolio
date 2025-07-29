export default function HakpleFeatures() {
  return (
    <div className="space-y-6">
      {/* 주요 포인트 섹션 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          주요 포인트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              👥 JWT 기반 회원 관리
            </h4>
            <p className="text-sm text-gray-600">
              보안 강화된 인증 시스템과 개인화된 프로필 관리로 안전하고 편리한
              서비스 이용
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              📝 자유/인기 게시판 분리
            </h4>
            <p className="text-sm text-gray-600">
              자유로운 소통 공간과 인기글 선별 시스템으로 활발한 커뮤니티 형성
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              🔔 실시간 알림 시스템
            </h4>
            <p className="text-sm text-gray-600">
              댓글, 좋아요, 공지사항 등 모든 활동에 대한 실시간 알림으로 참여도
              향상
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              📅 개인 맞춤 캘린더
            </h4>
            <p className="text-sm text-gray-600">
              일정 관리와 알림 기능을 통한 효율적인 개인 시간 관리 지원
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
            <h4 className="font-semibold text-gray-800 mb-2">
              ⚙️ 체계적인 관리자 기능
            </h4>
            <p className="text-sm text-gray-600">
              학원 정보 관리, 관리자 계정 관리, 회원 관리 등 효율적인 시스템
              운영 지원
            </p>
          </div>
        </div>
      </div>

      {/* 상세 기능 섹션 */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📋 상세 기능</h3>

          {/* 회원 관리 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">👥</span>
              회원 관리
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              JWT 기반 인증 시스템으로 보안을 강화하고, 개인화된 서비스 이용을
              지원합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>JWT(JSON Web Token) 기반 인증 시스템으로 보안 강화</li>
              <li>신규 사용자 회원가입 및 기존 사용자 로그인 기능</li>
              <li>사용자 휴대폰 번호 변경 및 프로필 이미지 변경 기능</li>
              <li>개인화된 서비스 이용 지원</li>
            </ul>
          </div>

          {/* 게시판 기능 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📝</span>
              게시판 기능
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>자유 게시판: 사용자들이 자유롭게 소통할 수 있는 공간</li>
              <li>인기 게시판: 조회수, 좋아요 수 기반 인기글 선별</li>
              <li>게시글 작성, 수정, 삭제 기능 제공</li>
            </ul>
          </div>

          {/* 공지사항 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📢</span>
              공지사항
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>관리자 공지사항 등록 및 관리 기능</li>
              <li>사용자 공지사항 조회 및 열람 기능</li>
              <li>효율적인 정보 전달 시스템</li>
            </ul>
          </div>

          {/* 댓글 및 좋아요 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">💬</span>
              댓글 & 좋아요
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>게시글 댓글 작성, 수정, 삭제 기능</li>
              <li>게시글 &apos;좋아요&apos; 기능으로 상호작용 활성화</li>
              <li>커뮤니티 기능 강화</li>
            </ul>
          </div>

          {/* 실시간 알림 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🔔</span>
              실시간 알림
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>댓글 작성 시 실시간 알림</li>
              <li>게시글 &apos;좋아요&apos; 시 실시간 알림</li>
              <li>공지사항 등록 시 실시간 알림</li>
              <li>서비스 참여도 향상</li>
            </ul>
          </div>

          {/* 캘린더 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📅</span>
              캘린더
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>개인화된 캘린더 화면 제공</li>
              <li>일정 추가, 수정, 삭제 기능</li>
              <li>일정 알림 기능으로 효율적인 일정 관리</li>
              <li>중요한 일정 놓침 방지</li>
            </ul>
          </div>

          {/* 관리자 기능 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">⚙️</span>
              관리자 기능
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>학원 정보 관리 (등록, 수정)</li>
              <li>관리자 계정 관리 (추가, 수정, 삭제)</li>
              <li>전체 회원 목록 조회 및 관리</li>
              <li>효율적인 시스템 운영 지원</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
