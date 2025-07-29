export default function Education() {
  const education = [
    {
      title: "부경대학교",
      degree: "컴퓨터공학 학사 (편입)",
      period: "2022.03 - 2024.08",
      description: "졸업 • 학점 3.4/4.5 • 컴퓨터공학과 학생회 활동",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    // {
    //   title: "경인여자대학교",
    //   degree: "보건의료관리과",
    //   period: "2020.03 ~ 2022.02",
    //   description: "졸업 • 학점 4.08/4.5",
    //   icon: (
    //     <svg
    //       className="w-8 h-8 text-gray-400"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    //       />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <section id="education" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>
        <div className="grid grid-cols-1 gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{edu.icon}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {edu.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="text-sm text-gray-600">{edu.degree}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{edu.period}</span>
                  </div>
                  <p className="text-base text-gray-600">{edu.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
