import Link from "next/link";
import Image from "next/image";
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaCertificate,
  FaProjectDiagram,
  FaEnvelope,
  FaGithub,
  FaBlog,
  FaBriefcase,
} from "react-icons/fa";

type HeroSideProps = {
  activeSection: string;
};

export default function HeroSide({ activeSection }: HeroSideProps) {
  const navItems = [
    { id: "about", label: "About Me", icon: <FaUser /> },
    { id: "skills", label: "Skills", icon: <FaCode /> },
    { id: "education", label: "Education", icon: <FaGraduationCap /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/treejh" },
    { name: "Blog", icon: <FaBlog />, url: "https://dose-blog.tistory.com" },
    { name: "Email", icon: <FaEnvelope />, url: "mailto:jjhyun8876@gmail.com" },
  ];

  return (
    <div className="flex flex-col h-full max-w-xs w-full mx-auto">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md overflow-hidden bg-gradient-to-br from-blue-100 to-sky-100">
          <Image
            src="/images/profile.jpg"
            alt="장지현 프로필 사진"
            width={128}
            height={128}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">장지현</h1>
          <p className="text-base text-blue-100">꾸준함으로 성장중인</p>
          <p className="text-base text-blue-100">백엔드 개발자 장지현입니다</p>
        </div>

        <div className="flex gap-3 mt-1">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
              aria-label={link.name}
              title={link.name}
            >
              <span className="text-lg">{link.icon}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center">
          <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium shadow-md">
            Java
          </span>
          <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium shadow-md">
            Spring
          </span>
          <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium shadow-md">
            MySQL
          </span>
          <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium shadow-md">
            Docker
          </span>
        </div>
      </div>

      <nav className="mt-8">
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 
                ${
                  activeSection === item.id
                    ? "bg-white/30 text-white font-medium shadow-md backdrop-blur-sm border border-white/20"
                    : "text-blue-100 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span className="mr-2.5 text-sm opacity-80">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                {activeSection === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/20 mx-4">
        <p className="text-xs text-blue-200 mt-2 text-center">© 2025 장지현</p>
      </div>
    </div>
  );
}
