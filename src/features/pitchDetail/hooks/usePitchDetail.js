/**
 * Mock single pitch fetch
 * Later: replace with backend GET /api/pitches/:id
 */

import { useState, useEffect } from "react";

export default function usePitchDetail(pitchId) {
  const [pitch, setPitch] = useState(null);

  useEffect(() => {
    // simulated fetch delay
    setTimeout(() => {
      setPitch({
        id: pitchId,
        title: "AI Vision-Based Fitness Coach",
        description:
          "An AI-powered fitness coach that analyzes your workout form in real-time using your phone camera.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        tags: ["AI", "Health", "Computer Vision"],
        views: 1200,
        saves: 43,
        createdAt: "2025-11-20",
        developer: {
          name: "John Doe",
          role: "Full Stack Developer",
          avatar: "/avatar1.png",
          location: "India",
          id: "dev123"
        }
      });
    }, 300);
  }, [pitchId]);

  return pitch;
}
