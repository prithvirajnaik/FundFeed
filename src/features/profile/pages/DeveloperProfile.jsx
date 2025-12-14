import { useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import useDeveloperProfile from "../hooks/useDeveloperProfile";
import { useAuth } from "../../../context/AuthContext";
import EditDeveloperProfileModal from "../components/EditDeveloperProfileModal";

import ProfileHeader from "../components/ProfileHeader";
import BioSection from "../components/BioSection";
import LinksSection from "../components/LinksSection";
import SkillsSection from "../components/SkillsSection";

export default function DeveloperProfile() {
  const { id } = useParams();
  const { profile, loading, error, refetch } = useDeveloperProfile(id);
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading profile</div>;
  if (!profile) return <div className="p-10 text-center">Profile not found</div>;

  const isOwner = user?.id === profile.id;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 relative">

      <ProfileHeader profile={profile} isOwner={isOwner}/>

      <BioSection bio={profile.bio} />

      <SkillsSection skills={profile.skills} />

      <LinksSection links={profile.links} />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditDeveloperProfileModal
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
