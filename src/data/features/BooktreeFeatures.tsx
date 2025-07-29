export default function BooktreeFeatures() {
  return (
    <div className="space-y-6">
      {/* 주요 포인트 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          주요 포인트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              🔐 OAuth2 소셜 로그인
            </h4>
            <p className="text-sm text-gray-600">
              Kakao, GitHub 연동으로 간편하고 안전한 로그인 시스템 구현
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              📝 개인 블로그 시스템
            </h4>
            <p className="text-sm text-gray-600">
              카테고리별 독서 기록 분류와 체계적인 블로그 관리
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              🔍 다양한 검색 기능
            </h4>
            <p className="text-sm text-gray-600">
              제목, 작가, 책이름 기준 검색과 카테고리별 필터링
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              ☁️ AWS S3 이미지 관리
            </h4>
            <p className="text-sm text-gray-600">
              클라우드 기반 이미지 저장과 최적화된 파일 관리 시스템
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
            <h4 className="font-semibold text-gray-800 mb-2">
              🎯 팔로우 & 소셜 기능
            </h4>
            <p className="text-sm text-gray-600">
              사용자 간 팔로우, 좋아요, 댓글 시스템으로 활발한 커뮤니티 형성
            </p>
          </div>
        </div>
      </div>

      {/* 상세 기능 섹션 */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📋 상세 기능</h3>

          {/* 회원 관리 및 인증 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">👥</span>
              회원 관리 및 인증
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              OAuth2 기반 소셜 로그인과 일반 로그인을 모두 지원하여 사용자
              편의성을 극대화했습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Kakao, GitHub OAuth2 소셜 로그인 연동</li>
              <li>일반 이메일 기반 회원가입 및 로그인</li>
              <li>JWT 토큰 기반 인증 및 세션 관리</li>
              <li>이메일 API를 활용한 비밀번호 찾기</li>
              <li>회원 프로필 관리 및 탈퇴 기능</li>
            </ul>
          </div>

          {/* 블로그 시스템 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📝</span>
              개인 블로그 시스템
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              독서 기록을 체계적으로 관리할 수 있는 개인 블로그 플랫폼을
              제공합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>개인 블로그 생성, 수정, 삭제 기능</li>
              <li>카테고리별 독서 기록 분류 시스템</li>
              <li>블로그 내 게시글 최신순/좋아요순 정렬</li>
              <li>블로그 프로필 및 설정 관리</li>
              <li>블로그 내 팔로잉/스크랩 조회</li>
            </ul>
          </div>

          {/* 게시글 관리 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📄</span>
              게시글 관리
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>독서 후기 게시글 작성, 수정, 삭제</li>
              <li>이미지 첨부 및 리치 텍스트 에디터</li>
              <li>본인 게시글 내 검색 기능</li>
              <li>게시글 조회수 및 좋아요 통계</li>
              <li>카테고리별 게시글 분류</li>
            </ul>
          </div>

          {/* 인기 게시글 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🔥</span>
              인기 게시글 시스템
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>메인 페이지 실시간 인기 게시글 (조회수 기준)</li>
              <li>월간 인기 게시글로 트렌드 파악</li>
              <li>카테고리별 TOP5 게시글 추천</li>
              <li>실시간 월간 일기 게시글 조회</li>
            </ul>
          </div>

          {/* 소셜 기능 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🎯</span>
              소셜 기능
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>사용자 팔로우/언팔로우 기능</li>
              <li>게시글, 댓글, 대댓글 좋아요</li>
              <li>댓글 및 대댓글 작성/수정/삭제</li>
              <li>마음에 드는 글 스크랩 기능</li>
              <li>팔로잉 사용자 게시글 모아보기</li>
            </ul>
          </div>

          {/* 검색 및 필터링 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🔍</span>
              검색 및 필터링
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>전체 게시글 통합 검색 (제목, 작가, 책이름)</li>
              <li>블로그 내 게시글 검색</li>
              <li>카테고리별 게시글 필터링</li>
              <li>검색 결과 페이징 및 정렬</li>
            </ul>
          </div>

          {/* 카테고리 관리 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📂</span>
              카테고리 관리
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>메인 카테고리 및 개인 카테고리 생성</li>
              <li>카테고리별 게시글 정리 및 관리</li>
              <li>카테고리 수정 및 삭제 기능</li>
              <li>카테고리별 인기 게시글 조회</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
