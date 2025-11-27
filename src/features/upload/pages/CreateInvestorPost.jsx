import { useState } from "react";
// import TagInput from "../upload/components/TagInput";  // reuse existing
import TagInput from "../components/TagInput"
// Optional: create StageSelect component for multi stage selection

export default function CreateInvestorPost() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    stages: [],
    amount_range: "",
    location: "",
    contact_preference: "email",
    logo: null,
  });

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("tags", JSON.stringify(form.tags));
    payload.append("stages", JSON.stringify(form.stages));
    payload.append("amount_range", form.amount_range);
    payload.append("location", form.location);
    payload.append("contact_preference", form.contact_preference);
    if (form.logo) payload.append("logo", form.logo);

    console.log("INVESTOR POST PAYLOAD →", payload);
    alert("Investor Post Ready (mock)!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Create Funding Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-xl">

        {/* Logo uploader */}
        <div>
          <label className="font-semibold">Logo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => update("logo", e.target.files[0])}
            className="mt-2"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Eg: Looking to invest in AI startups"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg h-28"
            placeholder="Describe your investment thesis..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        {/* Tags */}
        <TagInput
          tags={form.tags}
          setTags={(tags) => update("tags", tags)}
        />

        {/* Stages */}
        <div>
          <label className="font-semibold">Stages You Invest In</label>
          <select
            multiple
            className="w-full border px-3 py-2 rounded-lg"
            value={form.stages}
            onChange={(e) =>
              update("stages", Array.from(e.target.selectedOptions).map(o => o.value))
            }
          >
            <option value="pre-seed">Pre-seed</option>
            <option value="seed">Seed</option>
            <option value="series-a">Series A</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="font-semibold">Investment Amount Range</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="$10k-$100k"
            value={form.amount_range}
            onChange={(e) => update("amount_range", e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="India, USA, Remote..."
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        {/* Contact preference */}
        <div>
          <label className="font-semibold">Contact Preference</label>
          <select
            className="w-full border px-3 py-2 rounded-lg"
            value={form.contact_preference}
            onChange={(e) => update("contact_preference", e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="dm">In-app DM</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
        >
          Publish Post
        </button>

      </form>
    </div>
  );
}
