export default function Skills() {
  const skills = {
    "Backend": ["Java", "Spring", "MySQL", "Hibernate"],
    "DevOps": ["Docker", "AWS", "Git"],
    "Tools": ["IntelliJ", "VS Code", "Gradle", "Notion"]
  };

  return (
    <section id="skills" className="py-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tech Stack</h2>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 