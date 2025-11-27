import { useParams } from "react-router-dom";
import useDeveloperProfile from "../hooks/useDeveloperProfile";

import ProfileHeader from "../components/ProfileHeader";
import BioSection from "../components/BioSection";
import LinksSection from "../components/LinksSection";
import SkillsSection from "../components/SkillsSection";

export default function DeveloperProfile() {
  const { id } = useParams();
  const profile = useDeveloperProfile(id);

  if (!profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileHeader profile={profile} />

      <BioSection bio={profile.bio} />

      <SkillsSection skills={profile.skills} />

      <LinksSection links={profile.links} />
    </div>
  );
}
