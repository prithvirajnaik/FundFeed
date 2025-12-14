import { Mail, Calendar, Eye, EyeOff, CheckCircle, Video, Download, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { downloadSummaryPDF } from "../api/requestsApi";

export default function RequestCard({ request, onViewed, userRole, isSentBox }) {
  const navigate = useNavigate();
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const {
    id,
    developer,
    investor,
    pitch,
    investor_post,
    message,
    meeting_link,
    preference,
    created_at,
    viewed,
    scheduled_start_time,
    scheduled_end_time,
    meeting_status,
    meeting_summary,
  } = request;

  // Determine who is the "other person" and what is the context
  const isDeveloper = userRole === "developer";
  const otherUser = isDeveloper ? investor : developer;
  const contextTitle = isDeveloper ? pitch?.title : investor_post?.title;
  const contextLabel = isDeveloper ? "Regarding your pitch:" : "Regarding your post:";

  // If in Sent box, context label should be reversed?
  // "Regarding THEIR post" or "Regarding THEIR pitch"
  // Actually, if I am Developer sending to Investor, it's about THEIR Post.
  // If I am Investor sending to Developer, it's about THEIR Pitch.
  // So the contextTitle is correct (it's the object of discussion).
  // But the label "Regarding YOUR pitch" is wrong if I sent it.

  let displayLabel = contextLabel;
  if (isSentBox) {
    if (isDeveloper) displayLabel = "Regarding their post:"; // Dev sent to Inv (about Post)
    else displayLabel = "Regarding their pitch:"; // Inv sent to Dev (about Pitch)
  }

  const profileLink = isDeveloper ? `/investor/${investor.id}` : `/developer/${developer.id}`;
  const profileLabel = isDeveloper ? "View Investor Profile" : "View Developer Profile";

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition space-y-3 border border-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-900 text-xl">
            {otherUser?.first_name} {otherUser?.last_name}
          </h2>
          <p className="text-gray-600 text-sm capitalize">{otherUser?.role}</p>
        </div>

        {/* Status Badge */}
        {isSentBox ? (
          <div className={`flex items-center gap-1 text-sm font-medium ${viewed ? "text-green-600" : "text-gray-400"}`}>
            {viewed ? <><CheckCircle size={16} /> Seen</> : "Sent"}
          </div>
        ) : (
          !viewed ? (
            <button
              onClick={() => onViewed(id)}
              className="text-orange-600 flex gap-1 items-center text-sm font-medium hover:text-orange-700"
            >
              <Eye size={16} /> Mark viewed
            </button>
          ) : (
            <div className="text-gray-400 flex gap-1 items-center text-sm">
              <EyeOff size={16} /> Viewed
            </div>
          )
        )}
      </div>

      {/* Context Reference */}
      <p className="text-sm text-gray-700">
        {displayLabel}{" "}
        <span className="font-semibold">{contextTitle}</span>
      </p>

      {/* Message */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <p className="text-gray-800 whitespace-pre-wrap">{message}</p>
      </div>

      {/* Meeting Link & Status */}
      {meeting_link && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <a
              href={meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange-600 hover:underline font-medium"
            >
              <Calendar size={16} />
              Meeting Link
            </a>
            {meeting_status && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                meeting_status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                meeting_status === 'in_progress' ? 'bg-green-100 text-green-700' :
                meeting_status === 'completed' ? 'bg-gray-100 text-gray-700' :
                'bg-red-100 text-red-700'
              }`}>
                {meeting_status === 'scheduled' ? 'Scheduled' :
                 meeting_status === 'in_progress' ? 'In Progress' :
                 meeting_status === 'completed' ? 'Completed' : 'Cancelled'}
              </span>
            )}
          </div>
          
          {scheduled_start_time && scheduled_end_time && (
            <p className="text-xs text-gray-600">
              Scheduled: {new Date(scheduled_start_time).toLocaleString()} - {new Date(scheduled_end_time).toLocaleString()}
            </p>
          )}
          
          {/* Join Meeting Button */}
          {meeting_status === 'scheduled' && (
            <button
              onClick={() => navigate(`/meeting/${id}`)}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium w-full justify-center"
            >
              <Video size={16} />
              Join Meeting
            </button>
          )}
          
          {meeting_status === 'in_progress' && (
            <button
              onClick={() => navigate(`/meeting/${id}`)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium w-full justify-center"
            >
              <Video size={16} />
              Continue Meeting
            </button>
          )}
          
          {meeting_status === 'completed' && meeting_summary && (
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-semibold mb-1">Meeting Summary:</p>
                <p className="text-xs text-gray-600 line-clamp-3">{meeting_summary}</p>
              </div>
              <button
                onClick={async () => {
                  setDownloadingPDF(true);
                  try {
                    const blob = await downloadSummaryPDF(id);
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `meeting_summary_${id}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (error) {
                    console.error("Failed to download PDF", error);
                    alert("Failed to download PDF. Please try again.");
                  } finally {
                    setDownloadingPDF(false);
                  }
                }}
                disabled={downloadingPDF}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium w-full justify-center disabled:bg-gray-400"
              >
                <Download size={16} />
                {downloadingPDF ? "Downloading..." : "Download PDF Summary"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Contact Preference */}
      <p className="text-sm text-gray-600">Preferred contact: <b className="capitalize">{preference}</b></p>

      {/* Footer */}
      <div className="text-gray-400 text-xs flex justify-between items-center">
        <span>{new Date(created_at).toLocaleString()}</span>
        {isSentBox && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Outgoing</span>}
      </div>

      <div className="flex flex-wrap gap-3 mt-3">
        {/* Reply button (Only for Inbox) */}
        {!isSentBox && (
          <a
            href={`mailto:${otherUser?.email}?subject=Re: ${contextTitle}`}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium"
          >
            <Mail size={16} />
            Reply via Email
          </a>
        )}

        {/* Profile link */}
        <Link
          to={profileLink}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
        >
          {profileLabel} →
        </Link>
      </div>

    </div>
  );
}
