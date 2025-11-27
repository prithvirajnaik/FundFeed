/**
 * Filters:
 * - Tag
 * - Funding stage
 * - Location
 * - Role
 */

const filterOptions = {
  tags: ["AI", "Fintech", "Blockchain", "SaaS", "Health"],
  stage: ["Pre-seed", "Seed", "Series A"],
  location: ["USA", "India", "Europe"],
  role: ["Developer", "Investor"],
};

export default function FeedFilters({ filters, setFilters }) {
  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-4 flex-wrap bg-white p-4 rounded shadow mb-4">

      {Object.keys(filterOptions).map((key) => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) => handleSelect(key, e.target.value)}
          className="border px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">{key.toUpperCase()}</option>
          {filterOptions[key].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ))}

    </div>
  );
}
