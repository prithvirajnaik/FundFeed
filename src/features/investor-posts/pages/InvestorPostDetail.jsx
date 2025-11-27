import { useParams } from "react-router-dom";
import useInvestorPosts from "../hooks/useInvestorPosts";
import { Bookmark, Briefcase, MapPin } from "lucide-react";
import useContactModal from "../../contact/hooks/useContactModal";
import ContactModal from "../../contact/components/ContachModal";

export default function InvestorPostDetail() {
  const { id } = useParams();
  const posts = useInvestorPosts();
  const contact = useContactModal();

  const post = posts.find((p) => p.id === id);

  if (!post) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-6 bg-[#f9f9f9] min-h-screen">

      {/* ONE BIG CARD */}
      <div className="bg-white rounded-xl p-5 shadow space-y-6">

        {/* HEADER */}
        <div className="flex gap-4 items-center">
          <img
            src={post.logo}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f] leading-tight">
              {post.investorName}
            </h1>

            <p className="text-gray-700 flex items-center gap-1 mt-1 text-sm sm:text-base">
              <Briefcase size={16} /> {post.investorType}
            </p>

            <p className="text-gray-700 flex items-center gap-1 mt-1 text-sm sm:text-base">
              <MapPin size={16} /> {post.location}
            </p>
          </div>
        </div>

        {/* TITLE OF POST */}
        {post.title && (
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0f0f0f]">
            {post.title}
          </h2>
        )}

        {/* FUNDING DETAILS */}
        <div className="space-y-2 text-[15px]">
          <p><strong>Ticket Size:</strong> {post.ticketSize || "N/A"}</p>
          <p><strong>Stages:</strong> {post?.stages?.join(", ") || "N/A"}</p>
          <p><strong>Sectors:</strong> {post?.sectors?.join(", ") || "N/A"}</p>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-lg font-semibold mb-1 text-[#0f0f0f]">About</h2>
          <p className="text-gray-700 leading-relaxed">{post.description}</p>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-orange-200 text-orange-900 px-3 py-1 rounded-md text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ACTION BUTTONS INSIDE CARD */}
        <div className="flex gap-3 pt-3">
          <button
            className="
              px-4 py-2 
              bg-gray-200 
              rounded-lg 
              flex items-center gap-2
              font-medium
              text-[#0f0f0f]
            "
          >
            <Bookmark size={18} /> Save
          </button>

          <button
            onClick={contact.openModal}
            className="
              px-4 py-2 
              bg-black 
              text-white 
              rounded-lg 
              font-medium 
              hover:bg-black/90
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
          name: post.investorName,
          email: post.email,
          id: post.id,
        }}
      />
    </div>
  );
}
