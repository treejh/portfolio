export default function Education() {
  const education = [
    {
      title: "국립 부경대학교",
      degree: "컴퓨터공학 학사 (편입)",
      period: "2022.03 - 2024.08",
      description: "졸업 • 학점 3.4/4.5 • 개발 동아리 활동",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "부산외국어대학교",
      degree: "컴퓨터공학과",
      period: "2020.03 ~ 2022.02",
      description: "졸업 • 학점 4.08/4.5 • 컴퓨터공학과 학생회 활동",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="education" className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">학업과 교육을 통해 쌓은 지식과 경험을 소개합니다</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {education.map((edu, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl mr-4 ${
                  idx === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  'bg-gradient-to-r from-indigo-500 to-purple-600'
                }`}>
                  {edu.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{edu.title}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
                  <span className="text-blue-800 font-semibold text-sm">
                    {edu.degree}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-blue-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">{edu.period}</span>
                </div>
                
                <p className="text-gray-600 text-base leading-relaxed">
                  {edu.description}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-blue-100">
                <p className="text-sm text-gray-500">
                  {idx === 0 && "컴퓨터공학 전공 지식과 개발 동아리 활동을 통한 실무 역량 강화"}
                  {idx === 1 && "컴퓨터공학 기초 지식과 학생회 활동을 통한 리더십 경험"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
