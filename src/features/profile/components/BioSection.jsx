export default function BioSection({ bio }) {
  if (!bio) return null;

  return (
    <div className="mb-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-900 text-lg mb-2">About</h2>
      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
        {bio}
      </p>
    </div>
  );
}
