export default function Skills() {
  const skills = {
    Backend: [
      "Java",
      "Spring",
      "Hibernate",
      "Next.js",
      "TypeScript",
      "MySQL",
      "MariaDB",
      "PostgreSQL",
    ],
    DevOps: [
      "Docker",
      "AWS",
      "Git",
      "Grafana",
      "Prometheus",
      "k6",
      "Terraform",
      "GitHub Actions",
    ],
    Tools: ["IntelliJ", "VS Code", "Gradle", "Notion"],
  };

  return (
    <section
      id="skills"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">
            사용 가능한 기술 스택들을 소개합니다
          </p>
        </div>

        {/* Card List */}
        <div className="flex flex-col gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="flex items-start bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Left Icon */}
              <div
                className={`p-3 rounded-xl mr-6 ${
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

              {/* Right Content */}
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap- mb-4">
                  {/* <h3 className="text-xl font-bold text-gray-800">
                    {category}
                  </h3> */}
                  <span
                    className={`px-4 py-1 rounded-full text-lg font-semibold ${
                      index === 0
                        ? "bg-blue-100 text-blue-700"
                        : index === 1
                        ? "bg-purple-100 text-purple-700"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {index === 0 && "Skills"}
                    {index === 1 && "DevOps"}
                    {index === 2 && "Tools"}
                  </span>
                </div>

                {/* Tag List */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm "
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500">
                  {index === 0 && "개발에 필요한 핵심 기술들"}
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
