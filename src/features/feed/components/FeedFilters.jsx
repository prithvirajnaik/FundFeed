const filterOptions = {
  tags: ["AI", "Fintech", "Blockchain", "SaaS", "Health"],
  stage: ["Pre-seed", "Seed", "Series A"],
  location: ["USA", "India", "Europe"],
  role: ["Developer", "Investor"],
};

export default function FeedFilters({ filters, setFilters }) {
  const handleSelect = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div 
      className="
        flex gap-2 sm:gap-3 flex-wrap 
        bg-white 
        p-3 sm:p-4 
        rounded-xl shadow-sm 
        border border-[#e5e5e5] 
        mb-5
      "
    >
      {Object.keys(filterOptions).map(key => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) => handleSelect(key, e.target.value)}
          className="
            border border-[#e5e5e5] 
            bg-white 
            px-4 py-2 rounded-full 
            text-[#0f0f0f] 
            shadow-sm
            hover:border-[#c9c9c9]
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400
            transition
          "
        >
          <option value="">{key.toUpperCase()}</option>
          {filterOptions[key].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ))}

    </div>
  );
}
