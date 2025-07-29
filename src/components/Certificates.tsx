export default function Certificates() {
  const certificates = [
    {
      title: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2024.03",
      description: "소프트웨어 개발 및 정보처리 관련 전문 지식 인증",
    },
    {
      title: "SQLD",
      issuer: "한국데이터산업진흥원",
      date: "2025.04",
      description: "데이터베이스 설계 및 SQL 활용 능력 인증",
    },
  ];

  return (
    <section id="certificates" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Certificates</h2>
        <div className="space-y-6">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {cert.title}
              </h3>
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <span className="text-sm text-gray-600">{cert.issuer}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
              <p className="text-base text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
