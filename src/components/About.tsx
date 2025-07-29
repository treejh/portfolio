export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">About Me</h2>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
            소개
          </h3>
          <p className="text-lg font-medium text-gray-800 mb-6">
            안녕하세요! 백엔드 개발자{" "}
            <span className="text-blue-600 font-bold">장지현</span>입니다.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              <p className="text-lg text-gray-800">
                문제를 깊이 있게 분석하고{" "}
                <span className="font-medium">끝까지 해결하려는 태도</span>를
                가지고 있습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              <p className="text-lg text-gray-800">
                작은 경험도 놓치지 않고{" "}
                <span className="font-medium">기록하며, 성장의 발판</span>으로
                삼습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              <p className="text-lg text-gray-800">
                더 나은 사용자 경험과{" "}
                <span className="font-medium">시스템 확장을 고려</span>하며,
                꾸준히 기술을 넓혀갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
