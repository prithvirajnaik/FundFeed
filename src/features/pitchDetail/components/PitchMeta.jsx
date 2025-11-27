export default function PitchMeta({ title, description, tags }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-4">{title}</h1>

      <p className="text-gray-600 mt-2 leading-relaxed">{description}</p>

      <div className="flex gap-2 flex-wrap mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gold text-black px-2 py-1 rounded-md text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
