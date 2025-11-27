import { useEffect, useState } from "react";

export default function useInvestorProfile(id) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        id,
        name: "Rohan Mehta",
        firm: "FutureWave Capital",
        type: "Angel Investor",
        stages: ["Seed", "Pre-seed"],
        sectors: ["AI", "Fintech", "SaaS"],
        contactPreference: "email",
        avatar: "/investorAvatar.png",
        location: "Mumbai, India",
        links: {
          linkedin: "https://linkedin.com/in/someinvestor",
          website: "https://futurewave.vc",
        },
        bio: "Backing early-stage founders building in AI and software infrastructure.",
      });
    }, 300);
  }, [id]);

  return profile;
}
