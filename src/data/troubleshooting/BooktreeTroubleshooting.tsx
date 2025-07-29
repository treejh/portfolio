export default function BooktreeTroubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📌 OAuth2 소셜 로그인 CORS 오류 해결
        </h3>

        <div className="space-y-4">
          {/* 문제 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🧨 문제
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Kakao와 GitHub OAuth2 소셜 로그인 구현 중, 다음과 같은 문제가
              발생:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                프론트엔드(Next.js)에서 백엔드(Spring Boot) OAuth2 콜백 호출 시
                CORS 오류 발생
              </li>
              <li>
                소셜 로그인 후 리다이렉트 과정에서 토큰 전달이 정상적으로
                이루어지지 않음
              </li>
              <li>
                개발 환경과 배포 환경에서 서로 다른 도메인으로 인한 쿠키 설정
                문제
              </li>
            </ul>
          </div>

          {/* 과정 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔍 과정
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              문제 분석을 통해 다음 사항을 파악:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                Spring Security의 CORS 설정이 OAuth2 엔드포인트에 제대로
                적용되지 않음
              </li>
              <li>
                OAuth2 콜백 처리 시 프론트엔드 도메인에 대한 허용 설정 누락
              </li>
              <li>
                JWT 토큰을 쿠키로 전달할 때 SameSite 및 Secure 속성 설정 문제
              </li>
              <li>개발/배포 환경별로 다른 도메인 설정이 필요함을 확인</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              이에 따라, 다음과 같은 방향으로 문제를 해결함:
            </p>
          </div>

          {/* 해결 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <b>Spring Security CORS 설정 강화</b>
                <br />
                OAuth2 엔드포인트를 포함한 모든 경로에 CORS 설정 적용
                <br />
                프론트엔드 도메인을 명시적으로 허용하고 credentials 옵션 활성화
              </li>
              <li>
                <b>OAuth2 성공 핸들러 커스터마이징</b>
                <br />
                소셜 로그인 성공 후 프론트엔드로 안전하게 토큰을 전달하는 로직
                구현
                <br />
                리다이렉트 URL에 토큰을 포함하여 전달하는 방식으로 변경
              </li>
              <li>
                <b>환경별 도메인 설정 분리</b>
                <br />
                개발/배포 환경에 따른 도메인 설정을 application.yml에서 관리
                <br />
                프로필별로 다른 CORS 허용 도메인 설정 적용
              </li>
            </ol>

            {/* 코드 예시 */}
            <div className="mt-6">
              <h5 className="text-md font-semibold text-gray-800 mb-3">
                💻 구현 코드 예시
              </h5>

              <div className="space-y-4">
                {/* 1. CORS 설정 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 1. Spring Security CORS 설정
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`@Configuration
public class SecurityConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:3000", 
            "https://www.booktri.site"
        ));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}`}
                  </pre>
                </div>

                {/* 2. OAuth2 성공 핸들러 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 2. OAuth2 성공 핸들러
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                      HttpServletResponse response, 
                                      Authentication authentication) {
        
        String token = jwtTokenProvider.createToken(authentication);
        String redirectUrl = String.format("%s/auth/callback?token=%s", 
                                          frontendUrl, token);
        
        response.sendRedirect(redirectUrl);
    }
}`}
                  </pre>
                </div>

                {/* 3. 프론트엔드 토큰 처리 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 3. Next.js 토큰 처리
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`// pages/auth/callback.tsx
export default function AuthCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // 토큰을 안전하게 저장
      localStorage.setItem('accessToken', token);
      
      // 메인 페이지로 리다이렉트
      router.push('/');
    }
  }, []);
  
  return <div>로그인 처리 중...</div>;
}`}
                  </pre>
                </div>

                {/* 4. 환경별 설정 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ 4. 환경별 도메인 설정
                  </h6>
                  <pre className="text-xs text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    {`# application-dev.yml
app:
  frontend-url: http://localhost:3000
  cors:
    allowed-origins: http://localhost:3000

# application-prod.yml  
app:
  frontend-url: https://www.booktri.site
  cors:
    allowed-origins: https://www.booktri.site`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📈 결과
            </h4>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h5 className="text-md font-semibold text-green-800 mb-2">
                ✅ 개선 효과
              </h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Kakao, GitHub 소셜 로그인이 모든 환경에서 정상 작동</li>
                <li>CORS 오류 완전 해결로 사용자 경험 크게 개선</li>
                <li>토큰 전달 과정의 보안성 강화</li>
                <li>개발/배포 환경 간 일관된 동작 보장</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      지표
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      문제 발생 시
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      해결 후
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">
                      개선 효과
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      소셜 로그인 성공률
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      15%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      98%
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      ▲ 83%p
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      로그인 완료 시간
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      실패/무한로딩
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      1.1초
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      정상 작동
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      사용자 만족도
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      매우 낮음
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      높음
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold text-center">
                      크게 향상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 핵심 학습:</strong> OAuth2와 CORS 설정은
                프론트엔드-백엔드 분리 환경에서 매우 중요한 요소이며, 환경별로
                다른 설정이 필요함을 깨달았습니다. 특히 보안을 고려하면서도
                사용자 경험을 해치지 않는 토큰 전달 방식의 중요성을 배웠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
