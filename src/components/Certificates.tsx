export default function Certificates() {
  const certificates = [
    {
      title: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2024.03",
      description: "소프트웨어 개발 및 정보처리 관련 전문 지식 인증",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "SQLD",
      issuer: "한국데이터산업진흥원",
      date: "2025.04",
      description: "데이터베이스 설계 및 SQL 활용 능력 인증",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="certificates" className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 mt-4">
            전문성을 인정받은 자격증과 인증을 소개합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl mr-4 ${
                  idx === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  'bg-gradient-to-r from-indigo-500 to-purple-600'
                }`}>
                  {cert.icon}
                </div>
                <div className="flex-1">
                <div className="flex items-center gap-3  mb-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {cert.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 ">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-blue-800 text-sm font-medium">{cert.date}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3  mb-1">
                    
                    <span className="text-blue-600 text-sm">{cert.issuer}</span>
                   
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {cert.description}
              </p>
              
              <div className="pt-3 border-t border-blue-100">
                <p className="text-sm text-gray-500">
                  {idx === 0 && "국가 공인 자격증으로 소프트웨어 개발 역량을 인정받았습니다"}
                  {idx === 1 && "데이터베이스 전문가로서의 실무 능력을 검증받았습니다"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
