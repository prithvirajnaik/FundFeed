import { useState, useEffect } from "react";

/**
 * Fetch developer profile.
 * Replace mock with backend later.
 */

export default function useDeveloperProfile(id) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulated fetch delay
    setTimeout(() => {
      setProfile({
        id,
        name: "Prithvi Naik",
        title: "Full Stack Developer",
        bio: "Engineer passionate about AI, full-stack development, and building tools that help people. Currently developing an investor-dev platform.",
        avatar: "/avatar1.png",
        location: "India",
        skills: ["React", "Node.js", "AI/ML", "Flutter", "Web Dev"],
        links: {
          github: "https://github.com/username",
          portfolio: "https://portfolio.com",
          linkedin: "https://linkedin.com/in/username",
        }
      });
    }, 300);
  }, [id]);

  return profile;
}
