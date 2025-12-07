import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function ProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/accounts/profile/${id}/`)
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const { user, profile } = data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f9f9f9]">
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p>{user.role}</p>

      <div className="mt-4 p-4 bg-white rounded-xl shadow">
        {user.role === "developer" && (
          <>
            <p><strong>Bio:</strong> {profile?.bio}</p>
            <p><strong>Skills:</strong> {profile?.skills?.join(", ")}</p>
            <p><strong>GitHub:</strong> {profile?.github}</p>
          </>
        )}

        {user.role === "investor" && (
          <>
            <p><strong>Firm:</strong> {profile?.firm}</p>
            <p><strong>Stages:</strong> {profile?.stages?.join(", ")}</p>
            <p><strong>Sectors:</strong> {profile?.sectors?.join(", ")}</p>
          </>
        )}
      </div>
    </div>
  );
}
