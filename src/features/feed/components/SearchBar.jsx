export default function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full mb-3 sm:mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search pitches..."
        className="
          w-full px-5 py-3 rounded-full 
          border border-[#e5e5e5] 
          bg-white
          text-[#0f0f0f] 
          placeholder-[#606060]
          shadow-sm
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
          outline-none transition
        "
      />
    </div>
  );
}
