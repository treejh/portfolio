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

  
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    // ✅ 현재 뷰포트 기준으로 즉시 한 번 계산(초기 렌더에서 zoom 없이도 반영되도록)
    const recalc = () => {
      const viewportY = window.innerHeight * 0.3; // 화면 상단에서 30% 지점
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
        threshold: 0.1,                // 🔽 더 쉽게 트리거
        rootMargin: "0px 0px -20% 0px" // 🔽 뷰포트 하단 20% 남기고 조기 발화
      }
    );

    sections.forEach((section) => observer.observe(section));

    // ✅ 초기 1회 강제 계산 (브라우저별 초기 옵저버 미발화 대응)
    recalc();

    // ✅ 리사이즈/회전 시 재계산 (줌/레이아웃 변화와 비슷한 효과)
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
      {/* 왼쪽 Hero(사이드) - 데스크탑 */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-[430px] bg-gradient-to-b from-slate-100 to-gray-100 shadow-md z-10">
        <div className="flex flex-col h-full justify-between py-6 px-7 pt-16">
          <HeroSide activeSection={activeSection} />
        </div>
      </aside>

      {/* 콘텐츠 래퍼: ✅ 더 이상 ml 주지 않음 */}
      <div className="flex flex-col">
        {/* 모바일에서는 HeroSide가 위에 */}
        <div className="md:hidden bg-gradient-to-b from-slate-800 via-blue-700 to-sky-300 shadow-sm px-6 py-10">
          <HeroSide activeSection={activeSection} />
        </div>

        <main className="flex-1 p-4 md:p-8 md:px-12 lg:px-16 space-y-6 max-w-full">
          <section id="about" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <About />
          </section>
          <section id="skills" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Skills />
          </section>
          <section id="education" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Education />
          </section>
          <section id="experience" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Experience />
          </section>
          <section id="certificates" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Certificates />
          </section>
          <section id="projects" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Projects />
          </section>
          <section id="contact" className="bg-white rounded-lg shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100">
            <Contact />
          </section>
        </main>
      </div>
    </div>
  );
}
