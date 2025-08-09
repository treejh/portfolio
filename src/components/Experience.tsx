export default function Experience() {
  const experiences = [
    {
      title: "GDSC 부경대 - Google Developer Student Clubs",
      subtitle: "네트워크 지식 공유 및 컴퓨터 관련 글쓰기 스터디",
      period: "2023.09 ~ 2024.03",
      description: [
        "네트워크 관련 주제로 스터디 진행, 기초부터 심화까지 체계적으로 학습",
        "컴퓨터 관련 글쓰기 모임 ‘글또’ 활동 참여, 기술 블로그 작성 및 공유",
        "동아리 내 다양한 세미나와 워크숍 참여를 통한 실무 역량 강화",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "UMC - 대학생 개발 연합 동아리 University MakeUs Challenge",
      subtitle: "MOT - 단체 투숙객 숙소 예약 플랫폼",
      period: "2024.03 ~ 2024.09",
      description: [
        "Java, Spring, HTTP 등 백엔드 전반에 대한 실무 지식 학습",
        "단체 투숙 행사(MT, OT) 예약을 위한 숙소·패키지 예약 플랫폼 구현",
        "패키지·후기 CRUD, 호텔명 중복 확인 API 구현 및 AWS 환경 구성(EC2, RDS, S3)",
        <a
          href="https://deserted-thought-336.notion.site/a963dc701ffa43ffb418e0d2a1b8829d"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 underline hover:text-blue-700"
        >
          프로젝트 상세 설명 보기
        </a>,
      ],
      icon: (
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "멋쟁이사자처럼",
      subtitle: "백엔드 부트캠프 13기: Java",
      period: "2024.11 ~ 2025.06",
      description: [
        "Spring Boot 기반의 웹 서비스 개발, REST API 설계, DB 모델링, 배포 등 백엔드 전반을 학습",
        "프로젝트 우수상 수상",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },

    {
      title: "(주) 샤이닝라이언",
      subtitle: "멋쟁이사자처럼 백엔드 인턴십 (1개월)",
      period: "2025.07 ~ 2025.08",
      description: [
        "자사 프로젝트에 백엔드 인턴으로 참여하여 실무 협업 경험",
        "Toss 결제 연동, 구매/정산 API 구현 및 관리자 대시보드 연동",
        "프론트엔드와의 REST API 명세 협업 및 실시간 알림 로직 개발",
        "전체 기능 기획에 따라 도메인 설계 => DB 설계 및 API 명세 작성",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="experience" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Experience & Activities
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{exp.icon}</div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{exp.subtitle}</p>
                  <div className="flex flex-wrap gap-2 items-center mb-3">
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                  <ul className="list-disc pl-5 text-base text-gray-600 space-y-1">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
