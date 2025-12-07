import { useState } from "react";

import useAuth from '../../../hooks/useAuth'
// import useFeedData from "../hooks/useFeedData";
import useRealFeed from "../hooks/userRealFeed";
import useInvestorPosts from "../../investor-posts/hooks/useInvestorPosts";

import PitchCard from "../components/PitchCard";
import InvestorPostCard from "../../investor-posts/components/InvestorPostCard";

import SearchBar from "../components/SearchBar";

export default function Feed() {
  const { user } = useAuth();

  const pitches = useRealFeed();            // Developer videos
  const investorPosts = useInvestorPosts(); // Investor funding posts

  const [search, setSearch] = useState("");

  const [tab, setTab] = useState(
    user?.role === "developer" ? "investor_posts" : "pitches"
  );

  return (
    <div className="px-3 sm:px-6 max-w-7xl mx-auto bg-[#f9f9f9] min-h-screen">

      <SearchBar search={search} setSearch={setSearch} />

      {/* FEED TAB SWITCH */}
      <div className="flex gap-4 my-4">
        <button
          className={`px-3 py-1 rounded-lg ${
            tab === "pitches" ? "text-orange-600 font-semibold" : "text-gray-600"
          }`}
          onClick={() => setTab("pitches")}
        >
          Pitches
        </button>

        <button
          className={`px-3 py-1 rounded-lg ${
            tab === "investor_posts" ? "text-orange-600 font-semibold" : "text-gray-600"
          }`}
          onClick={() => setTab("investor_posts")}
        >
          Investor Posts
        </button>
      </div>

      {/* GRID */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
          gap-4
        "
      >
        {/* PITCHES FEED */}
        {tab === "pitches" &&
          pitches.map((pitch) => (
            <PitchCard key={pitch.id} pitch={pitch} />
          ))}

        {/* INVESTOR POSTS FEED */}
        {tab === "investor_posts" &&
          investorPosts.map((post) => (
            <InvestorPostCard key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
}
