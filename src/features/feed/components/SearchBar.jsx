export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search pitches..."
      className="w-full px-4 py-2 rounded-lg border 
                 focus:ring-2 focus:ring-primary outline-none"
    />
  );
}
