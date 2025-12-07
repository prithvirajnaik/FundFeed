import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Briefcase, MapPin, DollarSign } from "lucide-react";
import { getInvestorPost, saveInvestorPost, unsaveInvestorPost } from "../api/investorPostsApi";
import useContactModal from "../../contact/hooks/useContactModal";
import ContactModal from "../../contact/components/ContachModal";

export default function InvestorPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const contact = useContactModal();

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const data = await getInvestorPost(id);
      setPost(data);
      // Check if saved - this might need a separate check or be included in the response
      // For now, let's assume the response might have a 'is_saved' field if we add it to serializer
      // or we just default to false until we implement that check.
    } catch (err) {
      console.error("Failed to load post", err);
      setError("Failed to load post details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (saved) {
        await unsaveInvestorPost(id);
        setSaved(false);
      } else {
        await saveInvestorPost(id);
        setSaved(true);
      }
    } catch (err) {
      console.error("Failed to toggle save", err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading post details...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!post) return <div className="p-10 text-center">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-[#f9f9f9] min-h-screen">

      {/* ONE BIG CARD */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">

        {/* HEADER */}
        <div className="flex gap-4 items-start">
          <img
            src={post.logo_url || post.investor?.avatar || "https://via.placeholder.com/150"}
            className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200"
            alt="logo"
          />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {post.investor?.name || "Investor"}
            </h1>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Briefcase size={16} /> {post.investor?.role || "Investor"}
              </span>
              {post.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {post.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* TITLE OF POST */}
        {post.title && (
          <h2 className="text-xl font-semibold text-gray-900 border-t border-gray-100 pt-4">
            {post.title}
          </h2>
        )}

        {/* FUNDING DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Check Size</span>
            <p className="font-medium text-gray-900 flex items-center gap-1 mt-1">
              <DollarSign size={16} className="text-green-600" />
              {post.amount_range || "N/A"}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stages</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {post.stages && post.stages.length > 0 ? (
                post.stages.map(stage => (
                  <span key={stage} className="text-sm font-medium text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">{stage}</span>
                ))
              ) : "N/A"}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">About</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.description}</p>
        </div>

        {/* TAGS */}
        {post.tags && post.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className={`
              px-4 py-2.5 
              rounded-lg 
              flex items-center gap-2
              font-medium
              transition-colors
              ${saved ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            <Bookmark size={18} className={saved ? "fill-current" : ""} />
            {saved ? "Saved" : "Save Post"}
          </button>

          <button
            onClick={contact.openModal}
            className="
              flex-1
              px-4 py-2.5 
              bg-gray-900 
              text-white 
              rounded-lg 
              font-medium 
              hover:bg-black
              transition-colors
              shadow-md
            "
          >
            Contact Investor
          </button>
        </div>

      </div>

      {/* CONTACT MODAL */}
      <ContactModal
        open={contact.open}
        onClose={contact.closeModal}
        onSubmit={(payload) => console.log("CONTACT →", payload)}
        developer={{
          name: post.investor?.name,
          email: post.investor?.email, // Make sure backend sends this or we handle it
          id: post.investor?.id,
        }}
      />
    </div>
  );
}
