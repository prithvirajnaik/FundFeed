import { useParams } from "react-router-dom";

import useInvestorProfile from "../hooks/useInvestorProfile";
import ProfileHeader from "../components/ProfileHeader";
import BioSection from "../components/BioSection";
import InvestorInfoSection from "../components/InvestorInfoSection";
import LinksSection from "../components/LinksSection";

export default function InvestorProfile() {
  const { id } = useParams();
  const profile = useInvestorProfile(id);

  if (!profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Header with Avatar, Name, Title */}
      <ProfileHeader 
        profile={{
          avatar: profile.avatar,
          name: profile.name,
          title: profile.type,
          location: profile.location,
        }}
      />

      {/* Optional bio */}
      <BioSection bio={profile.bio} />

      {/* Investor Details */}
      <InvestorInfoSection profile={profile} />

      {/* Links */}
      <LinksSection links={profile.links} />

    </div>
  );
}
