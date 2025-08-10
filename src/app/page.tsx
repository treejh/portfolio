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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* 왼쪽 Hero(사이드) - 데스크탑 */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-[430px] bg-gradient-to-b from-slate-300 via-blue-500 to-sky-300 shadow-md z-10">
        <div className="flex flex-col h-full justify-between py-6 px-7 pt-16">
          <HeroSide activeSection={activeSection} />
        </div>
      </aside>
      {/* 모바일에서는 HeroSide가 위에 */}
      <div className="flex flex-col w-full md:ml-[450px]">
        <div className="md:hidden bg-gradient-to-b from-slate-800 via-blue-700 to-sky-300 shadow-sm px-6 py-10">
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
