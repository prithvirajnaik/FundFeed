import { useState } from "react";

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

    if (tags.length >= 8)
      return alert("Maximum 8 tags allowed");

    if (tags.includes(tag))
      return alert("Duplicate tag");

    setTags([...tags, tag]);
    setValue("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="font-semibold text-gray-700">Tags</label>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => removeTag(tag)}
            className="bg-gold px-2 py-1 rounded-md text-sm cursor-pointer"
          >
            {tag} ✕
          </span>
        ))}
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={addTag}
        placeholder="Press Enter to add tag"
        className="mt-2 w-full px-3 py-2 border rounded-lg"
      />

      <p className="text-xs text-gray-500 mt-1">
        Add 3–8 tags
      </p>
    </div>
  );
}
