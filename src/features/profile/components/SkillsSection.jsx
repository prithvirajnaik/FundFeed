export default function SkillsSection({ skills }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Skills & Tags</h2>

      <div className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gold rounded-lg text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
