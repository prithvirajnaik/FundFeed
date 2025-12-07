import { useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import useInvestorProfile from "../hooks/useInvestorProfile";
import { useAuth } from "../../../context/AuthContext";
import EditInvestorProfileModal from "../components/EditInvestorProfileModal";

import ProfileHeader from "../components/ProfileHeader";
import BioSection from "../components/BioSection";
import InvestorInfoSection from "../components/InvestorInfoSection";
import LinksSection from "../components/LinksSection";

export default function InvestorProfile() {
  const { id } = useParams();
  const { profile, loading, error, refetch } = useInvestorProfile(id);
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading profile</div>;
  if (!profile) return <div className="p-10 text-center">Profile not found</div>;

  const isOwner = user?.id === profile.id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">

      <ProfileHeader
        profile={{
          avatar: profile.avatar,
          name: profile.name,
          title: profile.type,
          location: profile.location,
        }}
        isOwner={isOwner}
        onEdit={() => setIsEditModalOpen(true)}
      />

      <div className="border-t border-gray-100 pt-8">
        <BioSection bio={profile.bio} />
        <LinksSection links={profile.links} />
        <InvestorInfoSection profile={profile} />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditInvestorProfileModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            refetch();
          }}
        />
      )}

    </div>
  );
}
