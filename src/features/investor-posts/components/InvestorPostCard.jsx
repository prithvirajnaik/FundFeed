import { Bookmark, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvestorPostCard({ post, saved, onSave }) {
  return (
    <Link to={`/investor-post/${post.id}`} className="block">
      <div className="
        bg-white rounded-xl shadow-sm
        hover:bg-orange-50/50
        transition-all p-4
      ">

        {/* Header with logo */}
        <div className="flex items-center gap-3">
          <img
            src={post.logo_url}
            className="w-14 h-14 rounded-lg object-cover bg-gray-200"
            alt="logo"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-[#0f0f0f] text-base line-clamp-1">
              {post.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {post.description}
            </p>
          </div>
        </div>

        {/* tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-orange-200 text-orange-900 px-2 py-1 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* metrics + save */}
        <div className="flex items-center justify-between mt-4 text-gray-700 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={16} /> {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark size={16} /> {post.saved_count}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onSave(post.id);
            }}
            className={`text-sm font-medium ${
              saved ? "text-orange-600" : "text-gray-600"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>

      </div>
    </Link>
  );
}
