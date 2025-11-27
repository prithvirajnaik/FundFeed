export default function BioSection({ bio }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Bio</h2>
      <p className="text-gray-700 leading-relaxed">{bio}</p>
    </div>
  );
}
