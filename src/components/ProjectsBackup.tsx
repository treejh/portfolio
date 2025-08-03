import { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUsers,
  FaCode,
  FaLightbulb,
  FaBrain,
  FaInfo,
  FaChevronLeft,
  FaChevronRight,
  FaDesktop,
} from "react-icons/fa";
import Image from "next/image";

type TabType =
  | "소개"
  | "팀 구성"
  | "주요 기능"
  | "담당 역할"
  | "성능 최적화"
  | "문제 해결 사례"
  | "회고"
  | "UI";

interface TeamMember {
  name: string;
  role: string;
}

interface Contribution {
  title: string;
  details: string[];
}

interface Reflection {
  title: string;
  details: string[];
}

interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  longDescription: string;
  role: string;
  github: string;
  liveDemo?: string;
  technologies: string[];
  features: string[];
  challenges: string;
  lessons: string;
  team: TeamMember[];
  myContributions: Contribution[];
  reflections: Reflection[];
  thumbnail: string;
}

export default function Projects() {
  const [selectedTabs, setSelectedTabs] = useState<{ [key: string]: TabType }>(
    {}
  );
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});

  // 탭 정의
  const tabs: TabType[] = [
    "소개",
    "팀 구성",
    "주요 기능",
    "담당 역할",
    "성능 최적화",
    "문제 해결 사례",
    "회고",
    "UI",
  ];

  // UI 이미지 정의
  const uiImages = {
    juseyo: [
      {
        src: "/images/주세요메인화면.png",
        alt: "Juseyo 메인화면",
        title: "Juseyo 메인 페이지",
      },
      {
        src: "/images/주세요관리자대시보드.png",
        alt: "Juseyo 관리자대시보드",
        title: "관리자 대시보드",
      },
      {
        src: "/images/주세요비품요청내역.png",
        alt: "Juseyo 비품요청내역",
        title: "비품 요청내역 조회",
      },
      {
        src: "/images/주세요비품반납내역.png",
        alt: "Juseyo 비품반납내역",
        title: "비품 반납내역 조회",
      },
      {
        src: "/images/주세요입고내역.png",
        alt: "Juseyo 입고내역",
        title: "입고내역 조회",
      },
      {
        src: "/images/사용자 맞춤 추천 비품.png",
        alt: "Juseyo 사용자 맞춤 추천 비품",
        title: "일반회원 대시보드",
      },
      {
        src: "/images/주세요비품요청.png",
        alt: "Juseyo 비품요청",
        title: "나의 비품 요청 리스트",
      },
      {
        src: "/images/주세요새비품요청.png",
        alt: "Juseyo 새비품요청",
        title: "새 비품 요청",
      },
      { src: "/images/주세요검색.png", alt: "Juseyo 검색", title: "검색 기능" },
      { src: "/images/주세요채팅.png", alt: "Juseyo 채팅", title: "채팅 기능" },
    ],
    hakple: [
      {
        src: "/images/학플메인페이지.png",
        alt: "Hakple 메인페이지",
        title: "Hakple 메인페이지",
      },
      {
        src: "/images/학플홈페이지.png",
        alt: "Hakple 홈페이지",
        title: "홈페이지",
      },
      { src: "/images/학플게시판.png", alt: "Hakple 게시판", title: "게시판" },
      { src: "/images/학플게시물.png", alt: "Hakple 게시물", title: "게시물" },
      {
        src: "/images/학플마이페이지.png",
        alt: "Hakple 마이페이지",
        title: "마이페이지",
      },
      {
        src: "/images/관리자페이지.png",
        alt: "Hakple 관리자페이지",
        title: "관리자페이지",
      },
    ],
  };

  // 이미지 이동 함수
  const prevImage = (projectId: string) => {
    const images = uiImages[projectId as keyof typeof uiImages] || [];
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectId]:
        (prev[projectId] || 0) === 0
          ? images.length - 1
          : (prev[projectId] || 0) - 1,
    }));
  };

  const nextImage = (projectId: string) => {
    const images = uiImages[projectId as keyof typeof uiImages] || [];
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectId]:
        (prev[projectId] || 0) === images.length - 1
          ? 0
          : (prev[projectId] || 0) + 1,
    }));
  };

  // 키보드 네비게이션 처리
  const handleKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === "ArrowLeft") {
      prevImage(projectId);
    } else if (e.key === "ArrowRight") {
      nextImage(projectId);
    }
  };

  const projects = [
    {
      id: "juseyo",
      title: "Juseyo (재고/자산 관리 플랫폼)",
      period: "2025.05.02 ~ 2025.06.02",
      description:
        "기업별 자산과 재고를 효율적으로 관리하고 요청·승인 프로세스를 자동화하는 재고 관리 플랫폼",
      longDescription: `
        Juseyo는 자산과 재고를 효율적으로 관리하고, 요청 및 승인 프로세스를 자동화하는 재고 관리 플랫폼입니다.
        단순한 자산 등록/조회 기능을 넘어, 부서별 자산 분류, 체계적인 요청 흐름, 실시간 재고 현황 파악까지 하나의 시스템 안에서 통합 관리할 수 있도록 설계되었습니다.
      `,
      role: "개발 팀장, 백엔드 개발, 프론트엔드 개발",
      github: "https://github.com/treejh/JUSEYO",
      liveDemo: "https://www.app.jusey0.site/",
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "MySQL",
        "React",
        "Next.js",
        "TypeScript",
        "Docker",
        "AWS EC2",
        "AWS S3",
        "NGINX",
        "Terraform",
        "GitHub Actions",
        "Redis",
        "Swagger",
        "JavaScript",
      ],
      features: [
        "🌟 부서 및 역할(Role) 기반 권한 관리",
        "🔄 요청 → 승인 → 반납 흐름 구조",
        "📊 실시간 상태 추적 및 Excel 입출력",
        "💬 SSE 기반 알림 & STOMP 기반 실시간 채팅",
        "🤖 사용자 맞춤 비품 추천 기능 구현",
        "회원 & 인증 - 역할 기반 회원가입, JWT 인증, 이메일 & 휴대폰 인증",
        "비품 관리 - 비품 등록/수정/삭제/조회, 요청 생성/승인/반려, 출고/입고 상태 추적",
        "실시간 채팅 - 1:1 / 고객센터 / 단체방, STOMP + SockJS + JWT 인증",
        "실시간 알림 - SSE 기반 실시간 알림, 역할 기반 이벤트 알림",
        "검색 및 추천 - 키워드/카테고리 기반 검색, 협업 필터링 알고리즘을 통한 비품 추천",
      ],
      challenges:
        "대규모 기업의 복잡한 자산 관리 프로세스를 효율적으로 자동화하고, 실시간 데이터 처리와 사용자 맞춤 추천 시스템을 구현하는 과정에서 성능 최적화에 도전했습니다.",
      lessons:
        "이 프로젝트를 통해 PM 역할을 수행하며 팀 관리와 프로젝트 기획의 중요성을 배웠습니다. 또한 복잡한 비즈니스 로직을 체계적으로 설계하고, 실시간 기능과 AI 추천 시스템을 구현하는 기술을 습득했습니다.",
      team: [
        { name: "황지윤", role: "PM" },
        { name: "장지현", role: "개발 팀장" },
        { name: "홍보람", role: "팀원" },
        { name: "근하람", role: "팀원" },
        { name: "이현석", role: "팀원" },
      ],
      myContributions: [
        {
          title: "회원 및 인증 기능",
          details: [
            "JWT 인증 기반 로그인 처리 구현 및 사용자 상태(정상/정지)에 따른 접근 제어 필터 적용",
            "이메일 인증: Google SMTP를 활용한 이메일 인증 기능 구현 (회원가입 및 비밀번호 재설정 시 사용)",
            "휴대폰 인증: 누리고 SMS API를 활용한 휴대폰 본인 인증 및 인증번호 검증 기능 개발",
            "RTR 방식의 인증 구조 적용: Access Token + Refresh Token 구조로 로그인 세션 유지",
            "Refresh Token은 Redis에 저장하고 만료 시간에 따라 자동 삭제되도록 설정",
            "회원 등급/권한 관리 로직: 최초 매니저 / 일반 매니저 / 일반 회원 3단계로 구분하여 처리",
            "회원 승인 절차: 최초 매니저는 일반 매니저 가입 승인, 매니저(최초/일반)는 일반 회원 가입 승인 가능",
          ],
        },
        {
          title: "STOMP 기반 실시간 채팅 기능",
          details: [
            "1:1 / 그룹 / 고객센터 채팅방 생성 기능 구현 (중복 채팅방 방지 로직 포함)",
            "채팅방 입장, 나가기, 메시지 송수신 등 전반적인 실시간 채팅 흐름 구현",
            "STOMP + SockJS를 활용한 WebSocket 메시지 처리 구조 설계",
            "JWT 쿠키 기반 세션 인증 및 사용자별 메시지 권한 검증",
            "마지막 입장 시간 기준으로 ‘NEW’ 뱃지 표시 여부 계산 기능 구현",
            "채팅방의 참여자 목록, 상대방 정보, 새 메시지 여부 등의 조회 API 제공",
            "고객센터 전용 채팅방에서는 랜덤 매니저 매칭 로직 포함",
            "메시지, 채팅방, 참여자 정보는 모두 RDS(MySQL)에 영속화하여 기록 관리",
            "사용자가 모두 퇴장한 채팅방은 Redis를 활용해 자동 삭제 예약 처리 (지연 삭제)",
            "채팅 메시지 전송 시 알림(EventPublisher) 이벤트 연동 → 알림 기능과 통합",
            "채팅방 상태(ENTER, CREATE, INVITED 등)에 따른 행동 제어 및 예외 처리 로직 구현",
          ],
        },
        {
          title: "S3 기반 이미지 업로드 및 삭제 기능",
          details: [
            "Amazon S3를 활용한 이미지 업로드 및 삭제 기능 구현",
            "시간 기반 UUID를 이용해 고유한 파일명을 생성하여 충돌 방지",
            "파일 업로드 시 Content-Type을 명시하여 브라우저 내 자동 다운로드 현상 방지",
            "업로드된 파일은 `PublicRead` 권한을 적용해 웹에서 바로 접근 가능하도록 설정",
            "업로드 완료 후 S3에 저장된 이미지의 URL 반환",
            "이미지 삭제 시 `.com/` 경로 이후 키값을 추출하여 S3 객체 삭제 수행",
            "예외 상황(삭제 실패 등)에 대해 커스텀 `BusinessLogicException` 처리 적용",
          ],
        },

        {
          title: "프로젝트 디자인 및 기술 총괄",
          details: [
            "회원가입, 로그인, 채팅 등 주요 기능 화면 디자인 직접 설계 및 프론트 구현 연동",
            "공통 버튼, 입력창, 카드 등 UI 컴포넌트를 기준화하여 일관된 사용자 경험 제공",
            "디자인 시스템 기반으로 팀원들과 협업하여 재사용 가능한 컴포넌트 구조 정립",
            "에러 발생 시 팀 내 주요 기술 이슈 직접 디버깅 및 해결, 개발 총괄 역할 수행",
            "팀 내 프론트/백엔드 개발 가이드 제시 및 기능 구현 방향성 주도",
          ],
        },
      ],
      reflections: [
        {
          title: "PM 역할의 중요성",
          details: [
            "프로젝트 기획부터 배포까지 전체 과정을 관리하며 팀 리더십의 중요성을 깨달았습니다.",
            "명확한 요구사항 정의와 일정 관리가 프로젝트 성공의 핵심임을 배웠습니다.",
          ],
        },
        {
          title: "복잡한 비즈니스 로직 설계",
          details: [
            "기업의 실제 업무 프로세스를 시스템화하는 과정에서 도메인 설계의 중요성을 경험했습니다.",
            "상태 관리와 워크플로우 설계를 통해 확장 가능한 아키텍처의 필요성을 느꼈습니다.",
          ],
        },
        {
          title: "AI 추천 시스템 구현",
          details: [
            "협업 필터링 알고리즘을 구현하며 데이터 분석과 머신러닝의 기초를 배웠습니다.",
            "사용자 행동 데이터를 분석하여 개인화된 서비스를 제공하는 방법을 습득했습니다.",
          ],
        },
        {
          title: "팀 협업과 커뮤니케이션",
          details: [
            "다양한 역할의 팀원들과 협업하며 효과적인 의사소통의 중요성을 깨달았습니다.",
            "기술적 의사결정과 비즈니스 요구사항의 균형을 맞추는 리더십을 경험했습니다.",
          ],
        },
      ],
      thumbnail: "/images/project-thumb.jpg",
    },
    {
      id: "hakple",
      title: "Hakple (학원생 커뮤니티 플랫폼)",
      period: "2025.04.03 ~ 2025.05.01",
      description:
        "학원 수강생들이 자유롭게 소통하고 정보를 공유할 수 있는 커뮤니티 플랫폼",
      longDescription: `
        Hakple은 학원 수강생들이 자유롭게 소통하고 정보를 공유할 수 있는 커뮤니티 플랫폼입니다.
        회원 관리, 게시판, 공지사항, 댓글, 좋아요, 알림, 캘린더, 관리자 페이지 등 다양한 기능을 제공합니다.
      `,
      role: "백엔드 개발, 프론트엔드 전체 구현",
      github: "https://github.com/golden-dobakhe/hakple",
      liveDemo: "https://www.hakple.site",
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript",
        "MySQL",
        "Redis",
        "AWS S3",
        "Docker",
        "Terraform",
        "AWS EC2",
        "GitHub Actions",
        "NGINX",
        "Swagger",
      ],
      features: [
        "👥 회원 관리",
        "• JWT(JSON Web Token) 기반 인증 시스템으로 보안 강화",
        "• 신규 사용자 회원가입 및 기존 사용자 로그인 기능",
        "• 사용자 휴대폰 번호 변경 및 프로필 이미지 변경 기능",
        "• 개인화된 서비스 이용 지원",
        "",
        "📝 게시판 기능",
        "• 자유 게시판: 사용자들이 자유롭게 소통할 수 있는 공간",
        "• 인기 게시판: 조회수, 좋아요 수 기반 인기글 선별",
        "• 게시글 작성, 수정, 삭제 기능 제공",
        "",
        "📢 공지사항",
        "• 관리자 공지사항 등록 및 관리 기능",
        "• 사용자 공지사항 조회 및 열람 기능",
        "• 효율적인 정보 전달 시스템",
        "",
        "💬 댓글 & 좋아요",
        "• 게시글 댓글 작성, 수정, 삭제 기능",
        "• 게시글 &apos;좋아요&apos; 기능으로 상호작용 활성화",
        "• 커뮤니티 기능 강화",
        "",
        "🔔 실시간 알림",
        "• 댓글 작성 시 실시간 알림",
        "• 게시글 &apos;좋아요&apos; 시 실시간 알림",
        "• 공지사항 등록 시 실시간 알림",
        "• 서비스 참여도 향상",
        "",
        "📅 캘린더",
        "• 개인화된 캘린더 화면 제공",
        "• 일정 추가, 수정, 삭제 기능",
        "• 일정 알림 기능으로 효율적인 일정 관리",
        "• 중요한 일정 놓침 방지",
        "",
        "⚙️ 관리자 기능",
        "• 학원 정보 관리 (등록, 수정)",
        "• 관리자 계정 관리 (추가, 수정, 삭제)",
        "• 전체 회원 목록 조회 및 관리",
        "• 효율적인 시스템 운영 지원",
      ],
      challenges:
        "여러 사용자의 동시 접속과 실시간 데이터 업데이트를 처리하는 과정에서 성능 최적화에 도전했습니다.",
      lessons:
        "이 프로젝트를 통해 대규모 데이터를 효율적으로 처리하는 방법과 실시간 기능을 구현하는 기술을 배웠습니다. 또한 팀 협업 과정에서 효과적인 커뮤니케이션의 중요성을 깨달았습니다.",
      team: [
        { name: "박주호", role: "팀장" },
        { name: "김명수", role: "부팀장" },
        { name: "고희은", role: "팀원" },
        { name: "도상원", role: "팀원" },
        { name: "황지윤", role: "팀원" },
      ],
      myContributions: [
        {
          title: "회원 및 인증 기능",
          details: [
            "JWT 인증 기반 로그인 처리 구현 및 사용자 상태(정상/정지)에 따른 접근 제어 필터 적용",
            "이메일 인증: Google SMTP를 활용한 이메일 인증 기능 구현 (회원가입 및 비밀번호 재설정 시 사용)",
            "휴대폰 인증: 누리고 SMS API를 활용한 휴대폰 본인 인증 및 인증번호 검증 기능 개발",
            "RTR 방식의 인증 구조 적용: Access Token + Refresh Token 구조로 로그인 세션 유지",
            "Refresh Token은 Redis에 저장하고 만료 시간에 따라 자동 삭제되도록 설정",
            "회원 등급/권한 관리 로직: 최초 매니저 / 일반 매니저 / 일반 회원 3단계로 구분하여 처리",
            "회원 승인 절차: 최초 매니저는 일반 매니저 가입 승인, 매니저(최초/일반)는 일반 회원 가입 승인 가능",
            "회원 가입 요청에 대한 승인 / 반려 기능 구현 및 상태에 따른 알림 처리 포함",
          ],
        },
        {
          title: "비밀번호 재설정 기능 구현",
          details: [
            "누리고 SMS API를 활용하여 휴대폰 인증 기반 비밀번호 재설정 기능 개발",
            "6자리 랜덤 인증번호 생성 및 5분 유효 시간 설정",
            "Redis를 활용한 인증번호 임시 저장 및 관리",
            "사용자 보안성을 고려한 토큰 검증 및 예외 처리 로직 구성",
          ],
        },
        {
          title: "댓글 기능 개발",
          details: [
            "게시글 댓글 작성, 삭제, 수정, 신고 기능 구현",
            "JWT 기반 토큰 인증을 통해 사용자 권한 검증 및 요청 처리",
            "소프트 딜리트(Soft Delete) 패턴 적용으로 데이터 무결성 유지",
          ],
        },
        {
          title: "캘린더 기능 개발",
          details: [
            "사용자 맞춤 일정 등록/수정/삭제 기능이 포함된 캘린더 페이지 구현",
            "FullCalendar 라이브러리 기반으로 직관적인 UI 개발",
            "일정 알림 및 카테고리별 필터링 기능 추가",
          ],
        },
        {
          title: "프론트엔드 전체 구현 (Next.js 기반)",
          details: [
            "전체 페이지 디자인을 총괄하며 일관된 디자인 시스템 및 스타일링 전략 적용",
            "반응형 레이아웃 설계로 다양한 기기에서의 최적화된 사용자 경험 제공",
            "상태 관리 및 API 연동 구조 설계로 효율적인 데이터 흐름 구현",
          ],
        },
        {
          title: "사용자 마이페이지(내 정보 페이지) 구현",
          details: [
            "사용자 활동 내역 조회 및 관리 기능 개발",
            "비밀번호 변경 기능 구현",
          ],
        },
        {
          title: "접근성 및 성능 최적화",
          details: [
            "다양한 기기에서도 편리하게 사용할 수 있도록 반응형 레이아웃 설계",
            "스켈레톤 UI 적용으로 로딩 상태에서의 사용자 경험 개선",
          ],
        },
      ],
      reflections: [
        {
          title: "협업의 중요성 인식",
          details: [
            "기능 구현보다 소통이 더 중요하다는 것을 느꼈습니다.",
            "이슈 등록, PR 메시지, 커밋 메시지 등의 규칙을 정해두는 것이 중요하다는 것을 깨달았습니다.",
          ],
        },
        {
          title: "문서화의 필요성",
          details: [
            "API 명세서, 요구 사항 정의서, ERD, 역할 분담 등을 문서화하고 팀원들과 공유하는 것이 중요하다는 것을 알게 되었습니다.",
            "트러블 슈팅 기록을 통해 같은 문제가 생겼을 때 빠르게 해결할 수 있었습니다.",
          ],
        },
        {
          title: "테스트의 중요성",
          details: [
            "더 안정적인 코드를 위해 테스트의 중요성을 느꼈습니다.",
            "다음 프로젝트에는 제대로 된 테스트 도구를 활용하고 싶습니다.",
          ],
        },
        {
          title: "패키지 구조의 중요성",
          details: [
            "프로젝트 규모가 커질수록 도메인별로 패키지를 나누는 것이 유지보수에 좋다는 것을 느꼈습니다.",
          ],
        },
        {
          title: "새로운 기술 경험",
          details: [
            "카카오 로그인, 누리고 SMS 인증 API, Soft Delete, meAPI, fetchAPI, 블랙리스트 토큰 등 처음 사용해본 기술들을 경험했습니다.",
            "다음에는 처음부터 카카오 로그인 구현이나 배포를 직접 해보고 싶다는 생각이 들었습니다.",
          ],
        },
        {
          title: "성능 최적화에 대한 관심",
          details: [
            "DB 요청 속도 줄이기나 AI 기능 추가 등 성능 최적화에 대한 욕심이 생겼습니다.",
          ],
        },
      ],
      thumbnail: "/images/project-thumb.jpg",
    },
  ];

  // 현재 선택된 탭 가져오기 (기본값: '소개')
  const getSelectedTab = (projectId: string) =>
    selectedTabs[projectId] || "소개";

  // 탭 변경 함수
  const setSelectedTab = (projectId: string, tab: TabType) => {
    setSelectedTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  // 탭 아이콘 매핑
  const tabIcons = {
    소개: <FaInfo className="mr-2 text-blue-600" />,
    "팀 구성": <FaUsers className="mr-2 text-blue-600" />,
    "주요 기능": <FaCode className="mr-2 text-blue-600" />,
    "담당 역할": <FaLightbulb className="mr-2 text-blue-600" />,
    "성능 최적화": <FaCode className="mr-2 text-green-600" />,
    "문제 해결 사례": <FaCode className="mr-2 text-orange-600" />,
    회고: <FaBrain className="mr-2 text-blue-600" />,
    UI: <FaDesktop className="mr-2 text-blue-600" />,
  };

  // 선택된 탭에 따른 내용 렌더링
  const renderTabContent = (project: Project) => {
    const selectedTab = getSelectedTab(project.id);

    switch (selectedTab) {
      case "소개":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                💡 프로젝트 소개
              </h3>
              <div className="whitespace-pre-line text-gray-700">
                {project.longDescription}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTab(project.id, "UI")}
                className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
              >
                <FaDesktop className="mr-2" />
                UI 화면 보기
              </button>
            </div>
          </div>
        );
      case "팀 구성":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 text-gray-700">이름</th>
                  <th className="text-left py-2 px-3 text-gray-700">역할</th>
                </tr>
              </thead>
              <tbody>
                {project.team.map((member: TeamMember, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="py-2 px-3 text-gray-800">{member.name}</td>
                    <td className="py-2 px-3 text-gray-600">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "주요 기능":
        // Juseyo 프로젝트인 경우에만 상세 기능 표시
        if (project.id === "juseyo") {
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
                      기업 조직 구조에 맞춘 세분화된 권한 관리 시스템으로
                      보안성과 효율성을 동시에 확보
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
                      실시간 재고 현황 파악과 Excel 연동으로 데이터 관리 효율성
                      극대화
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      💬 SSE 기반 알림 & STOMP 기반 실시간 채팅
                    </h4>
                    <p className="text-sm text-gray-600">
                      실시간 커뮤니케이션으로 사용자 경험 향상 및 업무 효율성
                      증대
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      🤖 사용자 맞춤 비품 추천 기능 구현
                    </h4>
                    <p className="text-sm text-gray-600">
                      협업 필터링 알고리즘을 활용한 개인화된 추천 시스템으로
                      사용자 만족도 향상
                    </p>
                  </div>
                </div>
              </div>

              {/* 상세 기능 섹션 */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    📋 상세 기능
                  </h3>

                  {/* 회원가입 및 인증 */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="mr-2">👥</span>
                      회원가입 및 인증
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      역할 기반 회원가입 및 JWT 인증 방식을 적용하여 보안성과
                      관리 편의성을 높였습니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>
                        역할(Role)에 따른 회원가입: 관리자(Admin), 일반
                        사용자(User), 최초 매니저(Initial Manager), 일반
                        매니저(Manager)
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
                      <li>
                        비품요청 관리: 사용자별 요청 생성, 수정, 승인, 반려
                      </li>
                      <li>
                        대여 처리: 대여 승인 시 출고 상태 변경 및 재고 차감
                      </li>
                      <li>
                        반납 처리: 반납 승인 시 입고 상태 변경 및 재고 복구
                      </li>
                      <li>
                        개별자산 관리: 비품의 인스턴스 단위 등록 및 상태 관리
                      </li>
                      <li>
                        비품추적: 요청 처리 시 이력 기록 및 상태 변경 추적
                      </li>
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
                      STOMP 기반 WebSocket으로 구현한 실시간 채팅 기능입니다.
                      1:1, 고객센터, 그룹 채팅을 지원하며, JWT 인증과 Redis,
                      RDS를 활용한 구조입니다.
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
                      권한(Role)에 따라 다양한 이벤트 발생 시 알림을 전송하도록
                      옵저버 패턴과 스케줄러 기반 로직을 조합하여 구현했습니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>
                        역할 기반 알림 시스템: 권한(Role)에 따라 다양한 이벤트에
                        대해 알림을 전송
                      </li>
                      <li>
                        옵저버 패턴 적용: 비품 요청/반납, 회원 가입 등 실시간
                        이벤트 발생 시 즉시 알림 발송
                      </li>
                      <li>
                        스케줄러 기반 알림: 지정 반납일 초과, 요청 지연 등
                        주기적 검사에 따른 알림 발송
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

        // Hakple 프로젝트인 경우에만 상세 기능 표시
        if (project.id === "hakple") {
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
                      보안 강화된 인증 시스템과 개인화된 프로필 관리로 안전하고
                      편리한 서비스 이용
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      📝 자유/인기 게시판 분리
                    </h4>
                    <p className="text-sm text-gray-600">
                      자유로운 소통 공간과 인기글 선별 시스템으로 활발한
                      커뮤니티 형성
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      🔔 실시간 알림 시스템
                    </h4>
                    <p className="text-sm text-gray-600">
                      댓글, 좋아요, 공지사항 등 모든 활동에 대한 실시간 알림으로
                      참여도 향상
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
                      학원 정보 관리, 관리자 계정 관리, 회원 관리 등 효율적인
                      시스템 운영 지원
                    </p>
                  </div>
                </div>
              </div>

              {/* 상세 기능 섹션 */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    📋 상세 기능
                  </h3>

                  {/* 회원 관리 */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="mr-2">👥</span>
                      회원 관리
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      JWT 기반 인증 시스템으로 보안을 강화하고, 개인화된 서비스
                      이용을 지원합니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>
                        JWT(JSON Web Token) 기반 인증 시스템으로 보안 강화
                      </li>
                      <li>신규 사용자 회원가입 및 기존 사용자 로그인 기능</li>
                      <li>
                        사용자 휴대폰 번호 변경 및 프로필 이미지 변경 기능
                      </li>
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
                      <li>
                        자유 게시판: 사용자들이 자유롭게 소통할 수 있는 공간
                      </li>
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
                      <li>
                        게시글 &apos;좋아요&apos; 기능으로 상호작용 활성화
                      </li>
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

        // 다른 프로젝트는 기존 방식으로 표시
        return (
          <ul className="list-disc pl-5 space-y-2">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        );
      case "담당 역할":
        return (
          <div className="space-y-4">
            {project.myContributions.map((contrib: Contribution, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-md text-gray-800 mb-2">
                  {contrib.title.includes("블로그 글")
                    ? "배포 및 운영"
                    : contrib.title}
                </h3>
                {contrib.title.includes("블로그 글") && (
                  <p className="text-gray-500 text-sm mb-3">
                    → 관련 기술과 고민은{" "}
                    <a
                      href="https://jjiyuuuuun.tistory.com/93"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 underline decoration-gray-400 hover:decoration-gray-600"
                    >
                      블로그 글
                    </a>
                    에서 확인 가능합니다
                  </p>
                )}
                <ul className="list-disc pl-5 space-y-1">
                  {contrib.details.map((detail: string, j: number) =>
                    detail.startsWith("  - ") ? (
                      <div key={j} className="ml-4 text-sm text-gray-600">
                        - {detail.replace("  - ", "")}
                      </div>
                    ) : (
                      <li key={j} className="text-gray-700">
                        {detail}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        );
      case "성능 최적화":
        // Juseyo 프로젝트인 경우에만 성능 최적화 내용 표시
        if (project.id === "juseyo") {
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
                      카테고리별 수량/종류 통계, 품목 사용 빈도, Outbound 상태
                      통계 등 주요 통계 API가 자주 호출
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>통계 호출마다 복잡한 DB 연산 + 그룹핑 발생</li>
                      <li>사용자 수 증가에 따라 응답 지연, DB 부하 증가</li>
                      <li>
                        TTL 만료 시점에 다수의 요청 동시 유입 → DB 병목 발생
                      </li>
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
                            <td className="px-4 py-3 text-sm text-gray-700">
                              30분
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              반복 요청에 대해 빠른 응답 제공
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 text-sm text-gray-700">
                              품목 사용 빈도 랭킹
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              ZSet
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              실시간
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              Top-N 정렬 및 점수 누적에 최적화
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              Outbound 상태 통계
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              Hash
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              10분
                            </td>
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
                        <strong>💡 특징:</strong> Value 구조로 30분 TTL, 반복
                        요청에 대해 빠른 응답 제공
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
                        <strong>💡 특징:</strong> ZSet 구조로 실시간 랭킹, 점수
                        기반 정렬 및 Top-N 조회 최적화
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
                        <strong>💡 특징:</strong> Hash 구조 + Redisson 락으로
                        동시성 제어, 10분 TTL로 상태별 개수 빠른 조회
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
                  <strong>
                    평균 응답 시간 최대 88% 단축, 처리량 최대 35% 향상
                  </strong>
                </p>
                <p className="text-sm text-gray-700">
                  → 고부하 상황에서도 안정적 통계 처리 가능
                </p>
              </div>

              {/* 정리 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ✅ 정리
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>
                    Redis 자료구조를 통계 목적별로 Value, ZSet, Hash로 분리 설계
                  </li>
                  <li>Redisson 분산 락으로 TTL 만료 시 중복 조회 방지</li>
                  <li>응답 속도는 최대 88% 단축, 처리량은 최대 35% 증가</li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">
                  <strong>
                    🧠 실시간 분석 시스템에서 TTL 전략, 동시성 제어, 직렬화
                    성능이 얼마나 중요한지 실무를 통해 깊이 체감한 경험입니다.
                  </strong>
                </p>
              </div>
            </div>
          );
        }

        // Hakple 프로젝트인 경우에만 성능 최적화 내용 표시
        if (project.id === "hakple") {
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
                      게시판 기능 개발 중, 댓글 목록 조회 시 다음과 같은 성능
                      이슈 발생:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>board.getComments() 호출 시 N+1 쿼리 발생</li>
                      <li>
                        각 댓글마다 좋아요 상태를 확인하기 위해 contains() 반복
                        호출
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
                      💬 문제점: LAZY 로딩으로 인해 댓글 수 N만큼 DB 쿼리 추가
                      발생 → N+1
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
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ✅ 정리
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Fetch Join을 통해 N+1 쿼리 제거</li>
                  <li>
                    좋아요 여부는 Set.contains() 대신 Map.get()으로 최적화
                  </li>
                  <li>평균 응답 시간 84% 단축, 처리량 27% 증가</li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">
                  <strong>
                    🧠 단순 조회 로직도 성능 병목의 원인이 될 수 있으며, 사전
                    대응이 중요함을 실무에서 체감했습니다.
                  </strong>
                </p>
              </div>
            </div>
          );
        }

        // 다른 프로젝트는 기본 메시지 표시
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">
              이 프로젝트에는 성능 최적화 내용이 없습니다.
            </p>
          </div>
        );
      case "문제 해결 사례":
        // Juseyo 프로젝트인 경우에만 문제 해결 사례 표시
        if (project.id === "juseyo") {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📡 공공데이터포털 API 인증 오류 해결
                </h3>

                <div className="space-y-4">
                  {/* 문제 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      🧨 문제
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Spring Boot 서버에서 공공데이터포털의 사업자 상태조회
                      API를 호출하려 했으나 다음과 같은 문제가 발생:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>
                        Postman에서는 정상 호출, 하지만 Spring Boot
                        애플리케이션에서는 400 Bad Request 응답 발생
                      </li>
                    </ul>

                    <p className="text-sm text-gray-700 mt-2">응답 메시지:</p>
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <pre className="text-xs text-gray-800 overflow-x-auto">
                        {`{
  "code": -4,
  "msg": "등록되지 않은 인증키 입니다."
}`}
                      </pre>
                    </div>

                    <p className="text-sm text-gray-700 mt-2">
                      이후엔 아래와 같은 예외도 발생:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <pre className="text-xs text-gray-800 overflow-x-auto">
                        {`java.lang.IllegalArgumentException: Invalid character '=' for QUERY_PARAM`}
                      </pre>
                    </div>
                  </div>

                  {/* 과정 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      🔍 과정
                    </h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                      <li>
                        <b>
                          인증키를 application.yml에 URL 인코딩된 상태로 설정
                        </b>
                        <div className="bg-gray-50 p-3 rounded-lg mt-2">
                          <pre className="text-xs text-gray-800 overflow-x-auto">
                            {`api:
  nts:
    service-key: RwvGMH8...%2FRVEJT%2BRj9r...%3D%3D`}
                          </pre>
                        </div>
                      </li>
                      <li>
                        <b>URL 문자열 직접 생성</b>
                        <div className="bg-gray-50 p-3 rounded-lg mt-2">
                          <pre className="text-xs text-gray-800 overflow-x-auto">
                            {`public String getApiUrl() {
    return "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=" + 인코딩된키;
}`}
                          </pre>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          이 방식은 RestTemplate이 내부적으로 %를 다시 인코딩 →
                          %2F → %252F
                        </p>
                        <p className="text-sm text-gray-700">
                          → API 서버에서는 잘못된 인증키로 판단
                        </p>
                      </li>
                      <li>
                        <b>UriComponentsBuilder 사용 시도</b>
                        <div className="bg-gray-50 p-3 rounded-lg mt-2">
                          <pre className="text-xs text-gray-800 overflow-x-auto">
                            {`UriComponents uri = UriComponentsBuilder
    .fromHttpUrl("https://api.odcloud.kr/api/nts-businessman/v1/status")
    .queryParam("serviceKey", "원본 키(RwvGM...)")  // 디코딩된 원본
    .build(true)  // 인코딩 방지
    .toUri();`}
                          </pre>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          하지만 키에 포함된 +, = 등의 특수 문자 때문에 Spring
                          내부에서 URI 문법 오류 발생
                        </p>
                        <p className="text-sm text-gray-700">
                          → IllegalArgumentException: Invalid character
                          &apos;=&apos; for QUERY_PARAM
                        </p>
                      </li>
                    </ol>
                  </div>

                  {/* 해결 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      ✅ 해결
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      <b>🔧 해결 방법:</b> URLEncoder.encode()로 명시적 인코딩 →
                      URI.create() 직접 사용
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-xs text-gray-800 overflow-x-auto">
                        {`String encodedKey = URLEncoder.encode(ntsApiConfig.getServiceKey(), StandardCharsets.UTF_8);
String fullUrl = ntsApiConfig.getBaseUrl() + "?serviceKey=" + encodedKey;
URI uri = URI.create(fullUrl);`}
                      </pre>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mt-3">
                      <pre className="text-xs text-gray-800 overflow-x-auto">
                        {`ResponseEntity<Map> response = restTemplate.exchange(
    uri,
    HttpMethod.POST,
    request,  // HttpEntity
    Map.class
);`}
                      </pre>
                    </div>

                    <p className="text-sm text-gray-700 mt-3">
                      URLEncoder.encode()로 정확한 쿼리 인코딩을 수행한 후<br />
                      Spring이 내부적으로 다시 인코딩하지 않도록 직접 URI를
                      생성하여 전달
                    </p>
                  </div>

                  {/* 결과 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      📈 결과
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>공공데이터포털 API 호출이 정상적으로 수행</li>
                      <li>
                        인증키 오류(&quot;등록되지 않은 인증키 입니다.&quot;)
                        해결됨
                      </li>
                      <li>
                        이후에도 400 오류 또는 URI 인코딩 오류 없이 안정적으로
                        동작
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>🔗 </strong>
                      <a
                        href="https://jjiyuuuuun.tistory.com/91"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Tistory 블로그 글 참고 링크
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Hakple 프로젝트인 경우에만 문제 해결 사례 표시
        if (project.id === "hakple") {
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
                      서비스 내 댓글에 대한 좋아요 기능을 구현하던 중, 다음과
                      같은 문제가 발생:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>
                        여러 사용자가 동시에 좋아요를 누르는 경우, likeCount
                        필드를 DB에서 직접 수정함에 따라 트랜잭션 충돌 및 락
                        경합 현상이 발생함
                      </li>
                      <li>
                        동시 요청 처리 중 좋아요 수가 틀어지거나, DB 반영이
                        지연되는 등의 데이터 정합성 문제가 나타남
                      </li>
                      <li>
                        트래픽이 몰리는 시점에는 DB 부하 증가로 전체 응답 지연
                        현상이 발생함
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
                        좋아요 수는 실시간으로 빠르게 업데이트되어야 하지만,
                        반드시 DB 트랜잭션 안에서 처리할 필요는 없음
                      </li>
                      <li>
                        likeCount는 계산 가능한 값이며, 정확성만 보장되면 Redis
                        등 임시 저장소에서 캐싱해도 무방함
                      </li>
                      <li>
                        동시에 여러 요청이 들어올 경우 임계 구간을 보호하기 위한
                        락 처리가 필요함
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
                        Redis에{" "}
                        <code>
                          comment:like:count:&#123;commentId&#125;
                        </code>{" "}
                        형태의 키로 좋아요 수를 저장
                        <br />
                        사용자가 좋아요를 누르면 Redis에서 INCR, 취소 시 DECR
                        연산을 수행
                        <br />
                        댓글의 좋아요 수 조회 시에도 Redis 값을 우선적으로
                        사용함
                      </li>
                      <li>
                        <b>Redisson 분산 락 적용</b>
                        <br />
                        동일한 댓글에 대해 동시에 좋아요 요청이 들어오는 경우를
                        제어하기 위해 Redisson 기반의 RLock 적용
                        <br />한 사용자 요청이 완료되기 전까지는 다른 요청이
                        해당 리소스를 건드릴 수 없도록 처리
                      </li>
                      <li>
                        <b>주기적 DB 동기화</b>
                        <br />
                        Redis의 좋아요 수를 5분마다 DB에 반영하는 스케줄러 구현
                        <br />
                        Redis 장애 시에도 기존 DB 값으로 Fallback 가능하도록
                        보완
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
                        <strong>💡 핵심 개선:</strong> Redis 캐시와 Redisson
                        락을 통해 좋아요 요청 처리 성능이 9배 이상 향상되었으며,
                        동시성 문제도 완전히 해결하여 안정적인 서비스를 제공할
                        수 있게 됨.
                      </p>
                    </div>

                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-4">
                      <li>좋아요 요청 처리 성능이 9배 이상 향상됨</li>
                      <li>
                        동시에 요청해도 데이터 충돌 없이 안정적으로 처리 가능
                      </li>
                      <li>Redis 캐시 구조를 통해 DB 부하를 크게 줄임</li>
                      <li>Redisson 락을 통해 정합성과 동시성 안전성을 확보</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // 다른 프로젝트는 기본 메시지 표시
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">
              이 프로젝트에는 문제 해결 사례가 없습니다.
            </p>
          </div>
        );
      case "회고":
        return (
          <div className="space-y-4">
            {project.reflections.map((reflection: Reflection, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-md text-gray-800 mb-2">
                  {reflection.title}
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {reflection.details.map((detail: string, j: number) => (
                    <li key={j} className="text-gray-700">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case "UI":
        const projectImages =
          uiImages[project.id as keyof typeof uiImages] || [];
        const currentIndex = currentImageIndexes[project.id] || 0;

        if (projectImages.length === 0) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-500">이미지를 불러올 수 없습니다.</p>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="rounded-lg shadow-xl overflow-hidden">
              {/* 이미지 영역 */}
              <div
                className="relative w-full overflow-hidden bg-white flex items-center justify-center"
                style={{ minHeight: "75vh" }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, project.id)}
              >
                {/* 좌측 화살표 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage(project.id);
                  }}
                  className="absolute left-4 z-10 flex items-center justify-center w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-300"
                  aria-label="이전 이미지"
                >
                  <FaChevronLeft className="text-xl" />
                </button>

                {/* 우측 화살표 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage(project.id);
                  }}
                  className="absolute right-4 z-10 flex items-center justify-center w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-300"
                  aria-label="다음 이미지"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                <div className="relative w-full h-[70vh] flex items-center justify-center">
                  <Image
                    src={projectImages[currentIndex].src}
                    alt={projectImages[currentIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* 이미지 제목과 인디케이터 */}
              <div className="bg-white border-t border-gray-100">
                <div className="flex justify-center items-center px-4 py-4">
                  <div className="text-center bg-gray-50 px-6 py-2 rounded-full shadow-sm">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {projectImages[currentIndex].title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {currentIndex + 1} / {projectImages.length}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center py-2 px-6 space-x-3">
                  {projectImages.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndexes((prev) => ({
                          ...prev,
                          [project.id]: idx,
                        }));
                      }}
                      className={`w-14 h-2 rounded-full transition-colors ${
                        idx === currentIndex
                          ? "bg-blue-500"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`${idx + 1}번 이미지로 이동`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md"
            >
              {/* 프로젝트 헤더 */}
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  {/* 로고 섹션 - 왼쪽 배치 */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0">
                    <Image
                      src={
                        project.id === "juseyo"
                          ? "/images/주세요이미지.png"
                          : "/images/logo.png"
                      }
                      alt={`${project.title} 로고`}
                      width={192}
                      height={192}
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaCalendarAlt className="mr-2 text-sm" />
                        <span className="text-sm">{project.period}</span>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mb-3">
                        {project.description}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {project.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-2 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors text-sm"
                      >
                        <FaGithub className="mr-1 md:mr-2" /> GitHub
                      </a>
                      {project.id === "juseyo" && (
                        <>
                          <a
                            href="https://youtu.be/xFiNAreXASI?si=UQrH5aXcmsNUwpeV"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-2 md:px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-red-700 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="mr-1 md:mr-2" /> 시연
                            영상
                          </a>
                          <a
                            href="https://youtu.be/FELFFBucDe0?si=jswpwxR4ln5Zg1qp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-2 md:px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-md text-orange-700 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="mr-1 md:mr-2" /> 발표
                            영상
                          </a>
                        </>
                      )}
                      {project.id === "hakple" && (
                        <a
                          href="https://youtu.be/fph2-jl0f7Q?si=U_PJyop3Et76h0rN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-2 md:px-4 py-2 bg-green-100 hover:bg-green-200 rounded-md text-green-700 transition-colors text-sm"
                        >
                          <FaExternalLinkAlt className="mr-1 md:mr-2" /> 발표
                          영상
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700 mr-2 flex items-center">
                        <FaCode className="mr-1" />
                        기술 스택:
                      </span>
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 md:px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 탭 내비게이션 */}
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm whitespace-nowrap font-medium flex items-center ${
                      getSelectedTab(project.id) === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTab(project.id, tab)}
                  >
                    {tabIcons[tab]}
                    <span className="hidden sm:inline">{tab}</span>
                    <span className="sm:hidden">
                      {tab.length > 4 ? tab.substring(0, 4) : tab}
                    </span>
                  </button>
                ))}
              </div>

              {/* 선택된 탭 내용 */}
              <div className="p-4 md:p-6">{renderTabContent(project)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
