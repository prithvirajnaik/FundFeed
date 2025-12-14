import { Bookmark, BookmarkCheck, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InvestorPostCard({
  post,
  saved = false,
  onSave,
  onUnsave,
}) {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(`/investor-post/${post.id}`);
  };

  return (
    <div
      onClick={goToPost}
      className="
        relative cursor-pointer
        bg-white rounded-xl shadow-sm
        hover:bg-orange-50/50
        transition-all p-4
      "
    >
      {/* HEADER */}
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

      {/* TAGS */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="bg-orange-200 text-orange-900 px-2 py-1 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* METRICS */}
      <div className="flex items-center gap-3 mt-4 text-gray-700 text-sm">
        <span className="flex items-center gap-1">
          <Eye size={16} /> {post.views}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark size={16} /> {post.saved_count}
        </span>
      </div>

      {/* SAVE / UNSAVE */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔑 THIS is the magic
          saved ? onUnsave?.(post.id) : onSave?.(post.id);
        }}
        title={saved ? "Remove from saved" : "Save post"}
        className={`
          absolute top-3 right-3
          flex items-center gap-1
          px-3 py-1.5 rounded-full text-xs font-medium
          transition
          ${saved
            ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        {saved ? (
          <>
            <BookmarkCheck size={14} />
            Saved
          </>
        ) : (
          <>
            <Bookmark size={14} />
            Save
          </>
        )}
      </button>
    </div>
  );
}
