export default function JuseyoTroubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📡 공공데이터포털 API 인증 오류 해결
        </h3>

        <div className="space-y-4">
          {/* 문제 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🧨 문제
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Spring Boot 서버에서 공공데이터포털의 사업자 상태조회 API를
              호출하려 했으나 다음과 같은 문제가 발생:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                Postman에서는 정상 호출, 하지만 Spring Boot 애플리케이션에서는
                400 Bad Request 응답 발생
              </li>
            </ul>

            <p className="text-sm text-gray-700 mt-2">응답 메시지:</p>
            <div className="bg-gray-50 p-3 rounded-lg mt-2">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`{
  "code": -4,
  "msg": "등록되지 않은 인증키 입니다."
}`}
              </pre>
            </div>

            <p className="text-sm text-gray-700 mt-2">
              이후엔 아래와 같은 예외도 발생:
            </p>
            <div className="bg-gray-50 p-3 rounded-lg mt-2">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`java.lang.IllegalArgumentException: Invalid character '=' for QUERY_PARAM`}
              </pre>
            </div>
          </div>

          {/* 과정 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔍 과정
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <b>인증키를 application.yml에 URL 인코딩된 상태로 설정</b>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <pre className="text-xs text-gray-800 overflow-x-auto">
                    {`api:
  nts:
    service-key: RwvGMH8...%2FRVEJT%2BRj9r...%3D%3D`}
                  </pre>
                </div>
              </li>
              <li>
                <b>URL 문자열 직접 생성</b>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <pre className="text-xs text-gray-800 overflow-x-auto">
                    {`public String getApiUrl() {
    return "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=" + 인코딩된키;
}`}
                  </pre>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  이 방식은 RestTemplate이 내부적으로 %를 다시 인코딩 → %2F →
                  %252F
                </p>
                <p className="text-sm text-gray-700">
                  → API 서버에서는 잘못된 인증키로 판단
                </p>
              </li>
              <li>
                <b>UriComponentsBuilder 사용 시도</b>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <pre className="text-xs text-gray-800 overflow-x-auto">
                    {`UriComponents uri = UriComponentsBuilder
    .fromHttpUrl("https://api.odcloud.kr/api/nts-businessman/v1/status")
    .queryParam("serviceKey", "원본 키(RwvGM...)")  // 디코딩된 원본
    .build(true)  // 인코딩 방지
    .toUri();`}
                  </pre>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  하지만 키에 포함된 +, = 등의 특수 문자 때문에 Spring 내부에서
                  URI 문법 오류 발생
                </p>
                <p className="text-sm text-gray-700">
                  → IllegalArgumentException: Invalid character &apos;=&apos;
                  for QUERY_PARAM
                </p>
              </li>
            </ol>
          </div>

          {/* 해결 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ 해결
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              <b>🔧 해결 방법:</b> URLEncoder.encode()로 명시적 인코딩 →
              URI.create() 직접 사용
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`String encodedKey = URLEncoder.encode(ntsApiConfig.getServiceKey(), StandardCharsets.UTF_8);
String fullUrl = ntsApiConfig.getBaseUrl() + "?serviceKey=" + encodedKey;
URI uri = URI.create(fullUrl);`}
              </pre>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-3">
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {`ResponseEntity<Map> response = restTemplate.exchange(
    uri,
    HttpMethod.POST,
    request,  // HttpEntity
    Map.class
);`}
              </pre>
            </div>

            <p className="text-sm text-gray-700 mt-3">
              URLEncoder.encode()로 정확한 쿼리 인코딩을 수행한 후<br />
              Spring이 내부적으로 다시 인코딩하지 않도록 직접 URI를 생성하여
              전달
            </p>
          </div>

          {/* 결과 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📈 결과
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>공공데이터포털 API 호출이 정상적으로 수행</li>
              <li>
                인증키 오류(&quot;등록되지 않은 인증키 입니다.&quot;) 해결됨
              </li>
              <li>
                이후에도 400 오류 또는 URI 인코딩 오류 없이 안정적으로 동작
              </li>
            </ul>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>🔗 </strong>
              <a
                href="https://jjiyuuuuun.tistory.com/91"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Tistory 블로그 글 참고 링크
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
