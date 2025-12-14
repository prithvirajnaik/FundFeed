import { useState } from "react";
import toast from 'react-hot-toast';
import { X } from "lucide-react";

/**
 * Supports:
    Add tags with Enter
    Limit 3–8 tags
    Remove tag on click
 */

export default function TagInput({ tags, setTags }) {
  const [value, setValue] = useState("");

  const addTag = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const tag = value.trim();
    if (!tag) return;

    if (tags.length >= 8) {
      toast.error("Maximum 8 tags allowed");
      return;
    }

    if (tags.includes(tag)) {
      toast.error("Tag already exists");
      return;
    }

    setTags([...tags, tag]);
    setValue("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="font-semibold text-gray-700">Tags</label>

      <div className="flex flex-wrap gap-2 mt-2 mb-2">
        {tags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => removeTag(tag)}
            aria-label={`Remove tag ${tag}`}
            className="flex items-center gap-1 bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-yellow-200 transition"
          >
            {tag} <X size={14} />
          </button>
        ))}
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={addTag}
        placeholder="Press Enter to add tag"
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <p className="text-xs text-gray-500 mt-1">
        Add 3–8 tags related to your industry or tech.
      </p>
    </div>
  );
}
