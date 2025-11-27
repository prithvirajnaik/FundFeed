import { useState, useEffect } from "react";

export default function useInvestorPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // MOCK DATA (replace with backend later)
    const mock = [
      {
        id: "ip1",
        investor_id: "u10",
        title: "Looking to invest in early AI teams",
        description: "Fast decisions. Prefer pre-seed and seed. Ticket size $10k-$100k.",
        tags: ["AI", "SaaS"],
        stages: ["pre-seed", "seed"],
          sectors: ["AI", "SaaS"], 
        amount_range: "$10k-$100k",
        logo_url: "https://picsum.photos/80/80?1",
        views: 120,
        saved_count: 8,
        created_at: "2025-11-28",
      },
      {
        id: "ip2",
        investor_id: "u11",
        title: "Fintech angel syndicate open for new founders",
        description: "We back fintech startups globally. Quick intro call.",
        tags: ["Fintech", "Payments"],
        stages: ["seed"],  sectors: ["AI", "SaaS"], 
        amount_range: "$25k-$150k",
        logo_url: "https://picsum.photos/80/80?2",
        views: 90,
        saved_count: 5,
      }
    ];

    setPosts(mock);
  }, []);

  return posts;
}
