export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
        Skills & Highlights
      </h2>

      <div className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
