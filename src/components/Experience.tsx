export default function Experience() {
  const experiences = [
    {
      title: "UMC - 대학생 개발 연합 동아리 University MakeUs Challenge",
      subtitle: "MOT - 단체 투숙객 숙소 예약 플랫폼",
      period: "2023.03 ~ 2023.09",
      description: [
        "Java, Spring, HTTP 등 백엔드 전반에 대한 실무 지식 학습",
        "단체 투숙 행사(MT, OT) 예약을 위한 숙소·패키지 예약 플랫폼 구현",
        "패키지·후기 CRUD, 호텔명 중복 확인 API 구현 및 AWS 환경 구성(EC2, RDS, S3)",
        <a
          href="https://deserted-thought-336.notion.site/a963dc701ffa43ffb418e0d2a1b8829d"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          프로젝트 상세 설명 보기
        </a>,
      ],
      icon: (
        <svg
          className="w-6 h-6 text-white"
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
      title: "GDSC 부경대 - Google Developer Student Clubs",
      subtitle: "네트워크 지식 공유 및 컴퓨터 관련 글쓰기 스터디",
      period: "2023.09 ~ 2024.03",
      description: [
        "네트워크 관련 주제로 스터디 진행, 기초부터 심화까지 체계적으로 학습",
        "컴퓨터 관련 글쓰기 모임 '글또' 활동 참여, 기술 블로그 작성 및 공유",
        "동아리 내 다양한 세미나와 워크숍 참여를 통한 실무 역량 강화",
      ],
      icon: (
        <svg
          className="w-6 h-6 text-white"
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
          className="w-6 h-6 text-white"
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
          className="w-6 h-6 text-white"
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
    <section id="experience" className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Experience & Activities
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">다양한 경험과 활동을 통해 성장한 과정을 소개합니다</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-6">
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  idx === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  idx === 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                  idx === 2 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                  'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}>
                  {exp.icon}
                </div>
                
                <div className="flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 font-medium mb-3">{exp.subtitle}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-blue-800 font-medium">{exp.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {exp.description.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          idx === 0 ? 'bg-blue-500' :
                          idx === 1 ? 'bg-indigo-500' :
                          idx === 2 ? 'bg-cyan-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-blue-100">
                <p className="text-sm text-gray-500">
                  {idx === 0 && "Google 개발자 커뮤니티 활동을 통한 네트워킹과 기술 공유"}
                  {idx === 1 && "실무 프로젝트를 통한 백엔드 개발 경험과 AWS 활용"}
                  {idx === 2 && "체계적인 백엔드 교육과 프로젝트 성과"}
                  {idx === 3 && "실무 인턴십을 통한 협업 경험과 실전 개발"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
