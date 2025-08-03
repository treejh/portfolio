import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUsers,
  FaCode,
  FaLightbulb,
  FaBrain,
  FaInfo,
  FaChevronLeft,
  FaChevronRight,
  FaDesktop,
} from "react-icons/fa";
import Image from "next/image";
import {
  TabType,
  Project,
  TeamMember,
  Contribution,
  Reflection,
} from "../types/project";
import { useProjects } from "../hooks/useProjects";
import JuseyoPerformance from "../data/performance/JuseyoPerformance";
import HakplePerformance from "../data/performance/HakplePerformance";
import BooktreePerformance from "../data/performance/BooktreePerformance";
import JuseyoTroubleshooting from "../data/troubleshooting/JuseyoTroubleshooting";
import HakpleTroubleshooting from "../data/troubleshooting/HakpleTroubleshooting";
import BooktreeTroubleshooting from "../data/troubleshooting/BooktreeTroubleshooting";
import JuseyoFeatures from "../data/features/JuseyoFeatures";
import HakpleFeatures from "../data/features/HakpleFeatures";
import BooktreeFeatures from "../data/features/BooktreeFeatures";

export default function Projects() {
  const {
    projects,
    uiImages,
    selectedTab,
    setSelectedTab,
    currentImageIndexes,
    nextImage,
    prevImage,
    setImageIndex,
  } = useProjects();

  // 탭 정의
  const tabs: TabType[] = [
    "소개",
    "팀 구성",
    "주요 기능",
    "담당 역할",
    "성능 최적화",
    "문제 해결 사례",
    "회고",
    "UI",
  ];

  // 키보드 네비게이션 처리
  const handleKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === "ArrowLeft") {
      prevImage(projectId);
    } else if (e.key === "ArrowRight") {
      nextImage(projectId);
    }
  };

  // 탭 아이콘 매핑
  const tabIcons = {
    소개: <FaInfo className="mr-2 text-blue-600" />,
    "팀 구성": <FaUsers className="mr-2 text-blue-600" />,
    "주요 기능": <FaCode className="mr-2 text-blue-600" />,
    "담당 역할": <FaLightbulb className="mr-2 text-blue-600" />,
    "성능 최적화": <FaCode className="mr-2 text-green-600" />,
    "문제 해결 사례": <FaCode className="mr-2 text-orange-600" />,
    회고: <FaBrain className="mr-2 text-blue-600" />,
    UI: <FaDesktop className="mr-2 text-blue-600" />,
  };

  // 선택된 탭에 따른 내용 렌더링
  const renderTabContent = (project: Project) => {
    const currentTab = selectedTab(project.id);

    switch (currentTab) {
      case "소개":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                💡 프로젝트 소개
              </h3>
              <div className="whitespace-pre-line text-gray-700">
                {project.longDescription}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTab(project.id, "UI")}
                className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
              >
                <FaDesktop className="mr-2" />
                UI 화면 보기
              </button>
            </div>
          </div>
        );
      case "팀 구성":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 text-gray-700">이름</th>
                  <th className="text-left py-2 px-3 text-gray-700">역할</th>
                </tr>
              </thead>
              <tbody>
                {project.team.map((member: TeamMember, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="py-2 px-3 text-gray-800">{member.name}</td>
                    <td className="py-2 px-3 text-gray-600">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "주요 기능":
        // BookTree 프로젝트인 경우
        if (project.id === "booktree") {
          return <BooktreeFeatures />;
        }
        // Juseyo 프로젝트인 경우에만 상세 기능 표시
        if (project.id === "juseyo") {
          return <JuseyoFeatures />;
        }
        // Hakple 프로젝트인 경우에만 상세 기능 표시
        if (project.id === "hakple") {
          return <HakpleFeatures />;
        }

        // 다른 프로젝트는 기존 방식으로 표시
        return (
          <ul className="list-disc pl-5 space-y-2">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        );
      case "담당 역할":
        return (
          <div className="space-y-4">
            {project.myContributions.map((contrib: Contribution, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-md text-gray-800 mb-2">
                  {contrib.title.includes("블로그 글")
                    ? "배포 및 운영"
                    : contrib.title}
                </h3>
                {contrib.title.includes("블로그 글") && (
                  <p className="text-gray-500 text-sm mb-3">
                    → 관련 기술과 고민은{" "}
                    <a
                      href="https://jjiyuuuuun.tistory.com/93"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 underline decoration-gray-400 hover:decoration-gray-600"
                    >
                      블로그 글
                    </a>
                    에서 확인 가능합니다
                  </p>
                )}
                <ul className="list-disc pl-5 space-y-1">
                  {contrib.details.map((detail: string, j: number) =>
                    detail.startsWith("  - ") ? (
                      <div key={j} className="ml-4 text-sm text-gray-600">
                        - {detail.replace("  - ", "")}
                      </div>
                    ) : (
                      <li key={j} className="text-gray-700">
                        {detail}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        );
      case "성능 최적화":
        // BookTree 프로젝트인 경우
        if (project.id === "booktree") {
          return <BooktreePerformance />;
        }
        // Juseyo 프로젝트인 경우에만 성능 최적화 내용 표시
        if (project.id === "juseyo") {
          return <JuseyoPerformance />;
        }
        // Hakple 프로젝트인 경우에만 성능 최적화 내용 표시
        if (project.id === "hakple") {
          return <HakplePerformance />;
        }

        // 다른 프로젝트는 기본 메시지 표시
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">
              이 프로젝트에는 성능 최적화 내용이 없습니다.
            </p>
          </div>
        );
      case "문제 해결 사례":
        // BookTree 프로젝트인 경우
        if (project.id === "booktree") {
          return <BooktreeTroubleshooting />;
        }
        // Juseyo 프로젝트인 경우에만 문제 해결 사례 표시
        if (project.id === "juseyo") {
          return <JuseyoTroubleshooting />;
        }
        // Hakple 프로젝트인 경우에만 문제 해결 사례 표시
        if (project.id === "hakple") {
          return <HakpleTroubleshooting />;
        }

        // 다른 프로젝트는 기본 메시지 표시
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">
              이 프로젝트에는 문제 해결 사례가 없습니다.
            </p>
          </div>
        );
      case "회고":
        return (
          <div className="space-y-4">
            {project.reflections.map((reflection: Reflection, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-md text-gray-800 mb-2">
                  {reflection.title}
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {reflection.details.map((detail: string, j: number) => (
                    <li key={j} className="text-gray-700">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case "UI":
        const projectImages =
          uiImages[project.id as keyof typeof uiImages] || [];
        const currentIndex = currentImageIndexes[project.id] || 0;

        if (projectImages.length === 0) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-500">이미지를 불러올 수 없습니다.</p>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="rounded-lg shadow-xl overflow-hidden">
              {/* 이미지 영역 */}
              <div
                className="relative w-full overflow-hidden bg-white flex items-center justify-center"
                style={{ minHeight: "75vh" }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, project.id)}
              >
                {/* 좌측 화살표 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage(project.id);
                  }}
                  className="absolute left-4 z-10 flex items-center justify-center w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-300"
                  aria-label="이전 이미지"
                >
                  <FaChevronLeft className="text-xl" />
                </button>

                {/* 우측 화살표 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage(project.id);
                  }}
                  className="absolute right-4 z-10 flex items-center justify-center w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-300"
                  aria-label="다음 이미지"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                <div className="relative w-full h-[70vh] flex items-center justify-center">
                  <Image
                    src={projectImages[currentIndex].src}
                    alt={projectImages[currentIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* 이미지 제목과 인디케이터 */}
              <div className="bg-white border-t border-gray-100">
                <div className="flex justify-center items-center px-4 py-4">
                  <div className="text-center bg-gray-50 px-6 py-2 rounded-full shadow-sm">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {projectImages[currentIndex].title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {currentIndex + 1} / {projectImages.length}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center py-2 px-6 space-x-3">
                  {projectImages.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageIndex(project.id, idx);
                      }}
                      className={`w-14 h-2 rounded-full transition-colors ${
                        idx === currentIndex
                          ? "bg-blue-500"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`${idx + 1}번 이미지로 이동`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md"
            >
              {/* 프로젝트 헤더 */}
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  {/* 로고 섹션 - 왼쪽 배치 */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0">
                    <Image
                      src={
                        project.id === "booktree"
                          ? "/images/북트리로고이미지.png"
                          : project.id === "juseyo"
                          ? "/images/주세요이미지.png"
                          : "/images/logo.png"
                      }
                      alt={`${project.title} 로고`}
                      width={192}
                      height={192}
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaCalendarAlt className="mr-2 text-sm" />
                        <span className="text-sm">{project.period}</span>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mb-3">
                        {project.description}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {project.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-2 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors text-sm"
                      >
                        <FaGithub className="mr-1 md:mr-2" /> GitHub
                      </a>
                      {project.id === "juseyo" && (
                        <>
                          <a
                            href="https://youtu.be/_gMZ8JVIi6k"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-2 md:px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-red-700 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="mr-1 md:mr-2" /> 시연
                            영상
                          </a>
                          <a
                            href="https://youtu.be/FELFFBucDe0?si=jswpwxR4ln5Zg1qp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-2 md:px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-md text-orange-700 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="mr-1 md:mr-2" /> 발표
                            영상
                          </a>
                        </>
                      )}
                      {project.id === "hakple" && (
                        <a
                          href="https://youtu.be/fph2-jl0f7Q?si=U_PJyop3Et76h0rN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-2 md:px-4 py-2 bg-green-100 hover:bg-green-200 rounded-md text-green-700 transition-colors text-sm"
                        >
                          <FaExternalLinkAlt className="mr-1 md:mr-2" /> 발표
                          영상
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700 mr-2 flex items-center">
                        <FaCode className="mr-1" />
                        기술 스택:
                      </span>
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 md:px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 탭 내비게이션 */}
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm whitespace-nowrap font-medium flex items-center ${
                      selectedTab(project.id) === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTab(project.id, tab)}
                  >
                    {tabIcons[tab]}
                    <span className="hidden sm:inline">{tab}</span>
                    <span className="sm:hidden">
                      {tab.length > 4 ? tab.substring(0, 4) : tab}
                    </span>
                  </button>
                ))}
              </div>

              {/* 선택된 탭 내용 */}
              <div className="p-4 md:p-6">{renderTabContent(project)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
