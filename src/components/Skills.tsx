export default function Skills() {
  const skills = {
    Backend: ["Java", "Spring", "MySQL", "Hibernate"],
    DevOps: ["Docker", "AWS", "Git", "Grafana", "Prometheus", "k6"],
    Tools: ["IntelliJ", "VS Code", "Gradle", "Notion"],
  };

  return (
    <section
      id="skills"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">
            사용 가능한 기술 스택들을 소개합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className="flex items-center mb-5">
                <div
                  className={`p-3 rounded-xl mr-4 ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : index === 1
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {index === 0 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    )}
                    {index === 1 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    )}
                    {index === 2 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{category}</h3>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-block px-3 py-2 rounded-xl text-sm font-semibold  ${
                      index === 0
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                        : index === 1
                        ? "bg-gradient-to-r from-indigo-100 to-purple-200 text-indigo-800"
                        : "bg-gradient-to-r from-cyan-100 to-blue-200 text-cyan-800"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-blue-100">
                <p className="text-sm text-gray-500">
                  {index === 0 && "백엔드 개발에 필요한 핵심 기술들"}
                  {index === 1 && "개발 및 배포 환경 구축 기술들"}
                  {index === 2 && "개발 생산성을 높이는 도구들"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
