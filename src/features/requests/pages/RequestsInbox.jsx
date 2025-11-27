import useAuth from "../../../hooks/useAuth";
import useRequests from "../hooks/useRequests";
import RequestCard from "../components/RequestCard";
import RequestEmptyState from "../components/RequestEmptyState";

export default function RequestsInbox() {
  const { user } = useAuth();

  // prevent investors from opening inbox
  if (user.role !== "developer") {
    return (
      <div className="p-10 text-center text-red-500">
        Only developers can access the Requests Inbox.
      </div>
    );
  }

  const { requests, markViewed } = useRequests(user.id);

  if (!requests) return <div className="p-10">Loading...</div>;

  if (requests.length === 0) return <RequestEmptyState />;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Contact Requests
      </h1>

      {requests.map((req) => (
        <RequestCard
          key={req.id}
          request={req}
          onViewed={markViewed}
        />
      ))}
    </div>
  );
}
