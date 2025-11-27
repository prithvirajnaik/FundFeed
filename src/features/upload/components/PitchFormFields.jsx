/**
 * Includes:
    Title (max 80 chars)
    Description (max 300 chars)
    Funding Stage dropdown
    Ask summary
 */


export default function PitchFormFields({ form, update }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4 space-y-4">

      {/* Title */}
      <div>
        <label className="font-semibold">Title</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value.slice(0, 80))}
          placeholder="Title (max 80 chars)"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold">Short Description</label>
        <textarea
          value={form.description}
          onChange={(e) =>
            update("description", e.target.value.slice(0, 300))
          }
          placeholder="Describe your idea (max 300 chars)"
          className="w-full px-3 py-2 border rounded-lg h-28"
        />
      </div>

      {/* Funding Stage */}
      <div>
        <label className="font-semibold">Funding Stage</label>

        <select
          value={form.stage}
          onChange={(e) => update("stage", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Select Stage</option>
          <option value="Pre-seed">Pre-seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
        </select>
      </div>

      {/* Ask */}
      <div>
        <label className="font-semibold">Funding Ask</label>
        <input
          value={form.ask}
          onChange={(e) => update("ask", e.target.value)}
          placeholder='Example: "$50k for 6 months runway"'
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
