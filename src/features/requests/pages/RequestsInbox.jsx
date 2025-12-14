import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRequests from "../hooks/useRequests";
import RequestCard from "../components/RequestCard";
import EmptyState from "../../../components/EmptyState";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Inbox, Send, Mail } from "lucide-react";

export default function RequestsInbox() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("inbox"); // 'inbox' | 'sent'
  const { requests, loading, markViewed } = useRequests(activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {user.role === 'developer' ? 'Investor Interests' : 'Developer Responses'}
        </h1>
      </div>

      {/* TABS */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "inbox"
            ? "border-orange-600 text-orange-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          <Inbox size={18} />
          Inbox
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "sent"
            ? "border-orange-600 text-orange-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          <Send size={18} />
          Sent
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingSpinner centered />
      ) : requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onViewed={markViewed}
              userRole={user.role}
              isSentBox={activeTab === "sent"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={activeTab === "inbox" ? Inbox : Send}
          title={activeTab === "inbox" ? "Inbox Empty" : "No Sent Requests"}
          message={
            activeTab === "inbox"
              ? "You haven't received any messages yet."
              : "You haven't sent any contact requests yet."
          }
          actionLabel={activeTab === "sent" ? "Go to Feed" : null}
          actionPath={activeTab === "sent" ? "/feed" : null}
        />
      )}
    </div>
  );
}
