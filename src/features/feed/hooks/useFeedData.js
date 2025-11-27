import { useState, useEffect } from "react";

/**
 * useFeedData()
 * Mock feed provider (backend-ready)
 * Later: replace mock with real API call.
 */

export default function useFeedData() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Simulated API delay
    setTimeout(() => {
setFeed([
  {
    id: 1,
    title: "AI Startup: Vision-Based Fitness Coach",
    thumbnail: "https://dummyimage.com/600x400/000/fff",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    tags: ["AI", "Computer Vision", "Health"],
    views: 1200,
    saves: 43,
    createdAt: "2025-11-20",
  },
  {
    id: 2,
    title: "Blockchain Payment Splitter MVP",
    thumbnail: "/mockThumb2.png",
    videoUrl: "/mockVideo2.mp4",
    tags: ["Fintech", "Web3"],
    views: 860,
    saves: 19,
    createdAt: "2025-11-18",
  },
  {
    id: 3,
    title: "SaaS Tool: Auto-Generate Pitch Decks with AI",
    thumbnail: "https://dummyimage.com/600x400/222/fff",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    tags: ["AI", "Productivity"],
    views: 1450,
    saves: 72,
    createdAt: "2025-11-17",
  },
  {
    id: 4,
    title: "EdTech App: AR-Based Science Lab",
    thumbnail: "https://dummyimage.com/600x400/113355/fff",
    videoUrl: "/mockVideo3.mp4",
    tags: ["AR", "Education"],
    views: 980,
    saves: 35,
    createdAt: "2025-11-16",
  },
  {
    id: 5,
    title: "GreenTech: Smart Waste Sorting Robot",
    thumbnail: "https://dummyimage.com/600x400/008800/fff",
    videoUrl: "/mockVideo4.mp4",
    tags: ["Robotics", "Environment"],
    views: 1570,
    saves: 88,
    createdAt: "2025-11-15",
  },
  {
    id: 6,
    title: "Fintech App: Credit Score Coaching AI",
    thumbnail: "https://dummyimage.com/600x400/cc5500/fff",
    videoUrl: "/mockVideo5.mp4",
    tags: ["Fintech", "AI"],
    views: 740,
    saves: 29,
    createdAt: "2025-11-14",
  },
  {
    id: 7,
    title: "FoodTech: Smart Meal Planner with Grocery Sync",
    thumbnail: "https://dummyimage.com/600x400/990033/fff",
    videoUrl: "/mockVideo6.mp4",
    tags: ["FoodTech", "AI"],
    views: 1140,
    saves: 51,
    createdAt: "2025-11-13",
  },
  {
    id: 8,
    title: "Travel App: AI Itinerary Generator",
    thumbnail: "https://dummyimage.com/600x400/003366/fff",
    videoUrl: "/mockVideo7.mp4",
    tags: ["Travel", "AI"],
    views: 1320,
    saves: 67,
    createdAt: "2025-11-11",
  },
  {
    id: 9,
    title: "HealthTech: Continuous Stress Monitor Ring",
    thumbnail: "https://dummyimage.com/600x400/444/fff",
    videoUrl: "/mockVideo8.mp4",
    tags: ["HealthTech", "Wearables"],
    views: 900,
    saves: 28,
    createdAt: "2025-11-10",
  },
  {
    id: 10,
    title: "Recruitment Tool: AI Role-Matching Engine",
    thumbnail: "https://dummyimage.com/600x400/550055/fff",
    videoUrl: "/mockVideo9.mp4",
    tags: ["HRTech", "AI"],
    views: 1780,
    saves: 96,
    createdAt: "2025-11-09",
  },
  {
    id: 11,
    title: "Logistics: Drone-Based Parcel Dropping Demo",
    thumbnail: "https://dummyimage.com/600x400/666/fff",
    videoUrl: "/mockVideo10.mp4",
    tags: ["Logistics", "Drones"],
    views: 2100,
    saves: 120,
    createdAt: "2025-11-08",
  },
]);

    }, 400);
  }, []);

  return feed;
}
