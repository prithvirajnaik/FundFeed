import { useState } from "react";
import useFeedData from "../hooks/useFeedData";

import SearchBar from "../components/SearchBar";
import FeedFilters from "../components/FeedFilters";
import PitchCard from "../components/PitchCard";

/**
 * FEED PAGE (Frontend Only)
 * --------------------------
 * Combines:
 * - Search
 * - Filters
 * - Vertical scroll feed
 * Backend integration: replace mock hook with real API.
 */

export default function Feed() {
  const feed = useFeedData();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    tags: "",
    stage: "",
    location: "",
    role: "",
  });

  const filteredFeed = feed.filter((pitch) => {
    const matchesSearch =
      pitch.title.toLowerCase().includes(search.toLowerCase()) ||
      pitch.tags.join("").toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
<div className="px-3 sm:px-6 max-w-7xl mx-auto bg-[#f9f9f9] min-h-screen">

  <SearchBar search={search} setSearch={setSearch} />

  {/* <FeedFilters filters={filters} setFilters={setFilters} /> */}

<div
  className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3              /* 🚀 MAX 3 COLUMNS */
    gap- 0.5
    auto-rows-auto
  "
>
    {filteredFeed.map((pitch) => (
      <PitchCard key={pitch.id} pitch={pitch} />
    ))}
  </div>

</div>

  );
}
