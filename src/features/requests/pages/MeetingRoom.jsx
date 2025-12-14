import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Clock, ExternalLink, Calendar, Copy, CheckCircle } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { getRequest, startMeeting, endMeeting, generateStructuredSummary, downloadSummaryPDF } from "../api/requestsApi";
import { showSuccess, showError, showLoading, dismissToast } from "../../../utils/toast";
import MeetingPreparation from "../components/MeetingPreparation";
import MeetingSummaryForm from "../components/MeetingSummaryForm";

export default function MeetingRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [showPreparation, setShowPreparation] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    loadRequest();
  }, [id]);

  useEffect(() => {
    if (request && request.scheduled_end_time && !meetingEnded) {
      const interval = setInterval(() => {
        const now = new Date();
        const endTime = new Date(request.scheduled_end_time);
        const diff = endTime - now;

        if (diff <= 0) {
          setTimeRemaining("Meeting time expired");
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [request, meetingEnded]);

  const loadRequest = async () => {
    try {
      const foundRequest = await getRequest(id);

      setRequest(foundRequest);
      setMeetingStarted(foundRequest.meeting_status === 'in_progress');
      setMeetingEnded(foundRequest.meeting_status === 'completed');
      setLoading(false);

      // Auto-hide preparation if meeting already in progress
      if (foundRequest.meeting_status === 'in_progress') {
        setShowPreparation(false);
      }
    } catch (error) {
      console.error("Failed to load request", error);
      showError(error.response?.data?.detail || "Failed to load meeting");
      navigate("/requests");
    }
  };

  const handleStartMeeting = async () => {
    const loadingToast = showLoading("Starting meeting...");
    try {
      await startMeeting(id);
      setMeetingStarted(true);
      await loadRequest();
      dismissToast(loadingToast);
      showSuccess("Meeting started!");
    } catch (error) {
      console.error("Failed to start meeting", error);
      dismissToast(loadingToast);
      showError(error.response?.data?.error || "Failed to start meeting");
    }
  };

  const handleEndMeeting = async () => {
    if (!window.confirm("Are you sure you want to end this meeting?")) {
      return;
    }

    const loadingToast = showLoading("Ending meeting...");
    try {
      await endMeeting(id);
      setMeetingEnded(true);
      setMeetingStarted(false);
      await loadRequest();
      dismissToast(loadingToast);
      showSuccess("Meeting ended! Please add a summary.");
    } catch (error) {
      console.error("Failed to end meeting", error);
      dismissToast(loadingToast);
      showError(error.response?.data?.error || "Failed to end meeting");
    }
  };

  const handleGenerateStructuredSummary = async (summaryData) => {
    setGeneratingSummary(true);
    const loadingToast = showLoading("Generating summary...");
    try {
      await generateStructuredSummary(id, summaryData);
      dismissToast(loadingToast);
      showSuccess("Summary generated successfully!");
      await loadRequest();
    } catch (error) {
      console.error("Failed to generate summary", error);
      dismissToast(loadingToast);
      showError(error.response?.data?.error || "Failed to generate summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    const loadingToast = showLoading("Preparing PDF...");
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
      dismissToast(loadingToast);
      showSuccess("PDF downloaded!");
    } catch (error) {
      console.error("Failed to download PDF", error);
      dismissToast(loadingToast);
      showError("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handleJoinMeeting = () => {
    setShowPreparation(false);
    if (!meetingStarted) {
      handleStartMeeting();
    }
    // Open meeting in new window
    if (request.meeting_link) {
      window.open(request.meeting_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    if (request.meeting_link) {
      navigator.clipboard.writeText(request.meeting_link);
      setLinkCopied(true);
      showSuccess("Meeting link copied!");
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  const canJoinMeeting = () => {
    if (!request) return false;
    if (meetingEnded) return false;
    if (request.meeting_status === 'cancelled') return false;

    const now = new Date();
    if (request.scheduled_start_time && new Date(request.scheduled_start_time) > now) {
      return false;
    }
    if (request.scheduled_end_time && new Date(request.scheduled_end_time) < now) {
      return false;
    }
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading meeting...</div>
      </div>
    );
  }

  if (!request || !request.meeting_link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No meeting link found</p>
          <button
            onClick={() => navigate("/requests")}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const otherUser = user.role === 'developer' ? request.investor : request.developer;

  // Show preparation lobby if not started and user wants to see it
  if (showPreparation && !meetingStarted && !meetingEnded && canJoinMeeting()) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate("/requests")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Requests
          </button>

          <MeetingPreparation
            request={request}
            otherUser={otherUser}
            onJoinMeeting={handleJoinMeeting}
            timeRemaining={timeRemaining}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/requests")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Meeting Room</h1>
              <p className="text-sm text-gray-600">
                with {otherUser?.first_name} {otherUser?.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {timeRemaining && !meetingEnded && (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <Clock size={20} />
                <span className="font-semibold">{timeRemaining}</span>
              </div>
            )}

            {!meetingEnded && (
              <div>
                {!meetingStarted && canJoinMeeting() && (
                  <button
                    onClick={handleStartMeeting}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                  >
                    <Video size={18} />
                    Start Meeting
                  </button>
                )}
                {meetingStarted && (
                  <button
                    onClick={handleEndMeeting}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    End Meeting
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Meeting Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Link Card */}
            {canJoinMeeting() && !meetingEnded && (
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Join Your Meeting</h2>
                    <p className="text-orange-100">
                      {request.meeting_platform === 'phone' ? 'Call the number below' :
                        request.meeting_platform === 'in-person' ? 'Meet at the location below' :
                          'Click the button to open the meeting in a new window'}
                    </p>
                  </div>
                  {meetingStarted && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-orange-100 mb-1">
                        {request.meeting_platform === 'phone' ? 'Phone Number' :
                          request.meeting_platform === 'in-person' ? 'Location' :
                            'Meeting Link'}
                      </p>
                      <p className="font-mono text-sm truncate">{request.meeting_link}</p>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="ml-4 bg-white/30 hover:bg-white/40 p-2 rounded-lg transition"
                    >
                      {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <a
                  href={request.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-orange-600 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition flex items-center justify-center gap-2"
                >
                  <ExternalLink size={24} />
                  Open Meeting in New Window
                </a>
              </div>
            )}

            {!canJoinMeeting() && !meetingEnded && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Clock size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {request.scheduled_start_time && new Date(request.scheduled_start_time) > new Date()
                    ? "Meeting Hasn't Started Yet"
                    : "Meeting Time Window Has Expired"}
                </h3>
                {request.scheduled_start_time && (
                  <p className="text-gray-500">
                    Scheduled: {new Date(request.scheduled_start_time).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {/* Meeting Summary Section (shown after meeting ends) */}
            {meetingEnded && (
              <div>
                {request.structured_summary ? (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Meeting Summary</h2>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={downloadingPDF}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-medium flex items-center gap-2 disabled:bg-gray-400"
                      >
                        {downloadingPDF ? "Downloading..." : "Download PDF"}
                      </button>
                    </div>

                    {/* Display structured summary */}
                    <div className="space-y-6">
                      {request.structured_summary.discussion_points?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Discussion Points</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {request.structured_summary.discussion_points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {request.structured_summary.decisions_made?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Decisions Made</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {request.structured_summary.decisions_made.map((decision, i) => (
                              <li key={i}>{decision}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {request.structured_summary.action_items?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Action Items</h3>
                          <div className="space-y-2">
                            {request.structured_summary.action_items.map((item, i) => (
                              <div key={i} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <p className="font-medium text-gray-900">{item.task}</p>
                                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                  <span><strong>Assignee:</strong> {item.assignee || "Unassigned"}</span>
                                  {item.due_date && (
                                    <span className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      {new Date(item.due_date).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {request.structured_summary.next_steps && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Next Steps</h3>
                          <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                            {request.structured_summary.next_steps}
                          </p>
                        </div>
                      )}

                      {request.structured_summary.additional_notes && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Additional Notes</h3>
                          <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                            {request.structured_summary.additional_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <MeetingSummaryForm
                    onSubmit={handleGenerateStructuredSummary}
                    loading={generatingSummary}
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Meeting Details */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Meeting Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Participant:</span>
                  <p className="font-medium text-gray-900">{otherUser?.first_name} {otherUser?.last_name}</p>
                  <p className="text-gray-500">{otherUser?.email}</p>
                </div>

                {request.meeting_platform && (
                  <div>
                    <span className="text-gray-600">Platform:</span>
                    <p className="font-medium text-gray-900 capitalize">{request.meeting_platform.replace('-', ' ')}</p>
                  </div>
                )}

                {request.timezone && (
                  <div>
                    <span className="text-gray-600">Timezone:</span>
                    <p className="font-medium text-gray-900">{request.timezone}</p>
                  </div>
                )}

                {request.scheduled_start_time && (
                  <div>
                    <span className="text-gray-600">Start Time:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.scheduled_start_time).toLocaleString()}
                    </p>
                  </div>
                )}

                {request.scheduled_end_time && (
                  <div>
                    <span className="text-gray-600">End Time:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.scheduled_end_time).toLocaleString()}
                    </p>
                  </div>
                )}

                {request.meeting_started_at && (
                  <div>
                    <span className="text-gray-600">Started At:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.meeting_started_at).toLocaleString()}
                    </p>
                  </div>
                )}

                {request.meeting_ended_at && (
                  <div>
                    <span className="text-gray-600">Ended At:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.meeting_ended_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Agenda */}
            {request.agenda && (
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Agenda</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{request.agenda}</p>
              </div>
            )}

            {/* Context Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Context</h3>
              <p className="text-sm text-gray-600">
                {request.pitch ? `Pitch: ${request.pitch.title}` : `Post: ${request.investor_post?.title}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
