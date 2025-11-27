import { useEffect, useState } from "react";

/**
 * Fetches contact requests sent to a developer.
 * Backend route will become:
 *   GET /api/developer/:id/requests
 */

export default function useRequests(developerId) {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setRequests([
        {
          id: "req1",
          pitchId: "1",
          pitchTitle: "AI Fitness Coach",
          investor: {
            id: "inv123",
            name: "Rohan Mehta",
            type: "Angel Investor",
          },
          message:
            "Hi! I'm impressed with your pitch—would love to know your current traction and planned runway.",
          meetingLink: "https://calendly.com/rohan",
          preference: "email",
          createdAt: "2025-01-15T10:20:00Z",
          viewed: false,
        },
        {
          id: "req2",
          pitchId: "2",
          pitchTitle: "SaaS Workflow Builder",
          investor: {
            id: "inv222",
            name: "Sonal Ventures",
            type: "VC",
          },
          message:
            "We invest in automation tools. Can you share an early demo?",
          meetingLink: "",
          preference: "dm",
          createdAt: "2025-01-16T12:45:00Z",
          viewed: true,
        },
      ]);
    }, 400);
  }, [developerId]);

  return {
    requests,
    markViewed: (id) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, viewed: true } : r
        )
      );
    },
  };
}
