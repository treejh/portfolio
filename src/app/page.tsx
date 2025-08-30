"use client";

import { useEffect, useState } from "react";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import HeroSide from "@/components/HeroSide";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [showNotice, setShowNotice] = useState(true); // ✅ 공지 배너 표시 여부

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );

    const recalc = () => {
      const viewportY = window.innerHeight * 0.3;
      let current = activeSection;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        const inView = r.top <= viewportY && r.bottom >= viewportY;
        if (inView) {
          s.classList.add("visible");
          current = s.id;
        }
      });
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
    };
  }, []);

  return (
    // ✅ 사이드바 폭만큼 패딩으로 자리 확보 + 가로 스크롤 방지
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 md:pl-[430px] overflow-x-hidden">
      {/* 🔔 공지 배너 */}
      {showNotice && (
        <div className="sticky top-0 z-20">
          <div className="bg-blue-100 border-b border-blue-200 text-gray-900">
            <div className="max-w-full px-4 py-2 md:py-2.5 flex items-center gap-2">
              <span aria-hidden className="text-base md:text-lg">
                📢
              </span>
              <p className="text-sm md:text-[15px] text-gray-700">
                화면 비율을 <span className="font-semibold">90%</span>로
                맞추시면 더 편하게 볼 수 있습니다.
              </p>
              <button
                type="button"
                aria-label="공지 닫기"
                onClick={() => setShowNotice(false)}
                className="ml-auto rounded-md px-2 py-1 text-gray-700/80 hover:bg-white"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 왼쪽 Hero(사이드) - 데스크탑 */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-[430px] bg-gradient-to-b from-slate-100 to-gray-100 shadow-md z-10">
        <div className="flex flex-col h-full justify-between py-6 px-7 pt-16">
          <HeroSide activeSection={activeSection} />
        </div>
      </aside>

      {/* 콘텐츠 래퍼 */}
      <div className="flex flex-col">
        {/* 모바일에서는 HeroSide가 위에 */}
        <div className="md:hidden bg-gradient-to-b from-slate-100 to-gray-100 shadow-md px-6 py-10">
          <HeroSide activeSection={activeSection} />
        </div>

        <main className="flex-1 p-4 md:p-8 md:px-12 lg:px-16 space-y-6 max-w-full">
          <section
            id="about"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <About />
          </section>
          <section
            id="skills"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Skills />
          </section>
          <section
            id="education"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Education />
          </section>
          <section
            id="experience"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Experience />
          </section>
          <section
            id="certificates"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Certificates />
          </section>
          <section
            id="projects"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Projects />
          </section>
          <section
            id="contact"
            className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
          >
            <Contact />
          </section>
        </main>
      </div>
    </div>
  );
}
