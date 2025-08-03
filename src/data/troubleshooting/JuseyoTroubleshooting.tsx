export default function JuseyoTroubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🚧 k6 성능 테스트 중 토큰 인증 문제 해결
        </h3>

        <div className="space-y-4">
          {/* 문제 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🧨 문제
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <b>k6</b>를 이용해 메시지 API 성능 테스트를 하던 중, 모든 요청이{" "}
              <b>403 Forbidden</b>으로 응답됨
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>응답 실패율 100%</li>
              <li>서버 로그 상, accessToken 없이 요청된 것으로 확인</li>
            </ul>
          </div>

          {/* 과정 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔍 과정
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <b>accessToken은 Set-Cookie로 전달</b>
                <br />
                Spring Security는 accessToken을 쿠키에 저장 (Set-Cookie)
              </li>
              <li>
                <b>k6는 브라우저가 아니기 때문에 Set-Cookie 자동 저장 불가</b>
                <br />
                accessToken을 담지 못한 채 요청됨 → 인증 실패
              </li>
              <li>인증된 요청을 위해 accessToken을 헤더에도 포함시켜야 함</li>
            </ol>
          </div>

          {/* 시각화(실패/성공) 이미지 영역 */}
          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="flex-1 bg-white rounded-lg shadow p-3 flex flex-col items-center">
              <img
                src="/images/gra1.png"
                alt="오류율 100% 실패 Grafana/k6 대시보드"
                className="rounded mb-2 border border-gray-200 object-contain"
                style={{ width: "100%", maxWidth: "380px", height: "200px" }}
              />
              <p className="text-xs text-gray-500 text-center">
                인증 실패 시: 오류율 100% (Grafana)
              </p>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow p-3 flex flex-col items-center">
              <img
                src="/images/gra4.png"
                alt="성공률 100% 정상 Grafana/k6 대시보드"
                className="rounded mb-2 border border-gray-200 object-contain"
                style={{ width: "100%", maxWidth: "380px", height: "200px" }}
              />
              <p className="text-xs text-gray-500 text-center">
                인증 성공 후: 정상 요청 성공률 (k6)
              </p>
            </div>
          </div>

          {/* 해결 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <b>🔧 해결 방법:</b> 테스트 환경에서 accessToken을{" "}
              <code>Authorization</code> 헤더로도 내려주고, 추출 시 헤더를 우선
              처리
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`httpServletResponse.setHeader("Authorization", "Bearer " + accessToken);`}
              </pre>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-3">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`public String getAccessToken(HttpServletRequest request) {
    String authorization = request.getHeader("Authorization");
    if (authorization != null && authorization.startsWith("Bearer ")) {
        return authorization.substring(7);
    }

    // fallback to cookie
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
    }

    return null;
}`}
              </pre>
            </div>

            <p className="text-sm text-gray-700 mt-3">
              <b>헤더 우선 인증 처리</b> 로 브라우저 외 테스트 환경(k6)에서도
              accessToken 사용 가능
            </p>
          </div>

          {/* 결과 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📈 결과
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>k6 요청에서도 accessToken이 적용되어 인증 문제 해결</li>
              <li>정상적인 성능 테스트 가능</li>
              <li>
                Prometheus → Grafana로 실시간 응답 성공률 및 지표 시각화 가능
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              ⚠️ 주의: 이 방식은 보안상 안전하지 않기 때문에 테스트 용도를 위해
              구현하였습니다.
            </p>

            {/* 참고 링크 */}
            <div className="mt-8 space-y-2">
              <div className="text-sm text-gray-600">
                🔗 관련 문제에 대한 블로그 글:&nbsp;
                <a
                  href="https://dose-blog.tistory.com/entry/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-k6-%EA%B7%B8%EB%9D%BC%ED%8C%8C%EB%82%98-%EC%98%A4%EB%A5%98%EC%9C%A8-100-%ED%95%B4%EA%B2%B0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  k6 + Grafana 오류율 100% 문제 해결 사례
                </a>
              </div>
              <div className="text-sm text-gray-600">
                🔗 환경 설정 가이드:&nbsp;
                <a
                  href="https://dose-blog.tistory.com/entry/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B3%A0%EB%8F%84%ED%99%94-k6-Prometheus-Grafana-%ED%86%B5%ED%95%A9-%EB%B6%80%ED%95%98-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  Prometheus + Grafana + k6 환경 설정 방법
                </a>
              </div>
              <div className="text-sm text-gray-600">
                🔗 WebSocket 연결 시 JWT 인증 문제 해결 블로그 글:&nbsp;
                <a
                  href="https://dose-blog.tistory.com/entry/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-stomp-%EC%B1%84%ED%8C%85-%EC%BF%A0%ED%82%A4-%ED%86%A0%ED%81%B0-JWT-%EC%9D%B8%EC%8B%9D-%EB%AC%B8%EC%A0%9C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  WebSocket 연결 시 JWT(쿠키) 인증 문제
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
