export default function About() {
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-blue-100 hover:shadow-blue-200/50 transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl mr-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">소개</h3>
              <p className="text-blue-600 font-medium">Backend Developer</p>
            </div>
          </div>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            안녕하세요! 백엔드 개발자{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-2xl">
              장지현
            </span>{" "}
            입니다.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4 mb-4 inline-block shadow-lg group-hover:shadow-blue-300/50 transition-all duration-300">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">문제 해결 능력</h4>
              <p className="text-gray-600 leading-relaxed">
                문제를 깊이 있게 분석하고{" "}
                <span className="font-semibold text-blue-700">끝까지 해결하려는 태도</span>를
                가지고 있습니다.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl mr-4 mb-4 inline-block shadow-lg group-hover:shadow-indigo-300/50 transition-all duration-300">
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
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">지속적 학습</h4>
              <p className="text-gray-600 leading-relaxed">
                작은 경험도 놓치지 않고{" "}
                <span className="font-semibold text-indigo-700">기록하며, 성장의 발판</span>으로
                삼습니다.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl mr-4 mb-4 inline-block shadow-lg group-hover:shadow-cyan-300/50 transition-all duration-300">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">사용자 중심 사고</h4>
              <p className="text-gray-600 leading-relaxed">
                더 나은 사용자 경험과{" "}
                <span className="font-semibold text-cyan-700">시스템 확장을 고려</span>하며,
                꾸준히 기술을 넓혀갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
