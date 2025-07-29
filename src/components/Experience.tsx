export default function Experience() {
  const experiences = [
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
