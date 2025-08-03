import { FaExternalLinkAlt } from "react-icons/fa";

export default function BooktreeTroubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🛠 서비스 무중단 배포 구조 개선 (Blue-Green Deployment)
        </h3>

        <div className="space-y-4">
          {/* 문제 상황 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📌 문제 상황
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>
                기존 구조에서는 컨테이너 교체 시, Nginx가 새 컨테이너로
                전환되기까지 잠시 서비스가 중단되는 문제가 발생
              </li>
              <li>
                구버전과 신버전 컨테이너가 겹치며 포트 충돌 및 502 오류 등
                사용자 경험 악화
              </li>
            </ul>
          </div>

          {/* 원인 분석 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🔍 원인 분석
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>
                단일 포트를 공유하는 구조에서 컨테이너 교체 시점에 레이턴시 존재
              </li>
              <li>
                Nginx 프록시 설정이 실시간으로 반영되지 않아 사용자에게 오류
                페이지 노출
              </li>
            </ul>
          </div>

          {/* 해결 방법 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🚀 해결 방법
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>
                Blue-Green 방식 도입: <code>app1_1</code>과 <code>app1_2</code>{" "}
                두 컨테이너를 번갈아 배포
              </li>
              <li>Nginx 리버스 프록시 설정 자동 갱신 스크립트 구현</li>
              <li>
                신규 버전 컨테이너에 헬스 체크 통과 시에만 트래픽 전환 후 기존
                컨테이너 종료
              </li>
            </ul>
          </div>

          {/* 컨테이너 두 개가 동시에 떠 있는 구조 이미지 */}
          <div className="flex flex-col items-center my-6">
            <img
              src="/images/blue-green-containers.png"
              alt="Blue-Green 컨테이너 구조"
              className="rounded shadow border border-gray-200 object-contain"
              style={{ width: "100%", maxWidth: "500px", height: "auto" }}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              두 개의 컨테이너(app1_1, app1_2)가 번갈아 배포되어 무중단 서비스
              유지
            </p>
          </div>

          {/* 개선 효과 및 장점 */}
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h5 className="text-md font-semibold text-green-800 mb-2">
              ✅ 개선 효과 및 장점
            </h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>
                <b>무중단 배포</b> 실현: 사용자 입장에서 서비스 중단 없이 새
                버전 적용
              </li>
              <li>오류 페이지 노출 최소화: 502 등 배포 중 오류 발생률 감소</li>
              <li>운영 자동화: 배포 시간 단축 및 수작업 부담 감소</li>
              <li>
                롤백 용이: 문제가 발생하면 즉시 이전 버전 컨테이너로 트래픽 전환
                가능
              </li>
              <li>
                성능 안정성 향상: 헬스 체크 통과 후에만 트래픽을 전환하여 장애
                예방
              </li>
              <li>배포 신뢰도 향상: 실제 운영 환경에서의 배포 리스크 최소화</li>
            </ul>
          </div>

          {/* 성능/운영 효과 요약 */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 핵심 인사이트:</strong> Blue-Green Deployment와 Nginx
              리버스 프록시 자동화는 실서비스에서 무중단 배포와 빠른 롤백, 운영
              효율성, 사용자 경험 개선에 매우 효과적임을 직접 경험했습니다.
              실시간 헬스 체크와 자동 트래픽 전환 구조로 배포 신뢰도와 서비스
              가용성을 크게 높일 수 있었습니다.
            </p>
          </div>

          {/* 관련 시연 영상 */}
          {/* 관련 시연 영상 */}
          <div className="mt-4">
            <a
              href="https://youtu.be/ph49FP6AyXw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-2 md:px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 transition-colors text-sm"
            >
              <FaExternalLinkAlt className="mr-1 md:mr-2" /> Blue-Green 무중단
              배포 시연 영상
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
