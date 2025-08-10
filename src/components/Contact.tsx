import { FaGithub, FaBlogger, FaEnvelope } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

export default function Contact() {
  const contacts = [
    {
      title: "이메일",
      value: "jjhyun8876@gmail.com",
      link: "mailto:jjhyun8876@gmail.com",
      icon: <FaEnvelope className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-blue-500 to-blue-400",
    },
    {
      title: "GitHub",
      value: "https://github.com/treejh",
      link: "https://github.com/treejh",
      icon: <FaGithub className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-gray-500 to-gray-400",
    },
    {
      title: "Blog",
      value: "https://dose-blog.tistory.com",
      link: "https://dose-blog.tistory.com",
      icon: <FaBlogger className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-red-500 to-blue-400",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Contact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">
           
          </p>
        </div>

        {/* 연락처 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((c, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-xl mr-4 ${c.bg}`}>{c.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{c.title}</h3>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {c.value}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
