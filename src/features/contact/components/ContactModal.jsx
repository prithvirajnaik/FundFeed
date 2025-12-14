import { X, Video, Phone, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { createRequest } from "../../requests/api/requestsApi";
import toast from 'react-hot-toast';
import LoadingButton from "../../../components/LoadingButton";
import FormField from "../../../components/FormField";

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'UTC', label: 'UTC' },
];

export default function ContactModal({ open, onClose, context, recipientName }) {
  // context: { type: 'pitch' | 'post', id: string }

  if (!open) return null;

  const [message, setMessage] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("google-meet");
  const [meetingLink, setMeetingLink] = useState("");
  const [preference, setPreference] = useState("email");
  const [scheduledStartTime, setScheduledStartTime] = useState("");
  const [scheduledEndTime, setScheduledEndTime] = useState("");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
  const [agenda, setAgenda] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      toast.error("Please enter a message");
      return;
    }

    // Validate scheduled times if provided
    if (meetingLink.trim() && scheduledStartTime && scheduledEndTime) {
      const start = new Date(scheduledStartTime);
      const end = new Date(scheduledEndTime);
      if (end <= start) {
        toast.error("End time must be after start time");
        return;
      }
    }

    setSending(true);
    try {
      const payload = {
        message,
        meeting_link: meetingLink.trim() || null,
        meeting_platform: meetingPlatform,
        preference,
        timezone,
        agenda: agenda.trim() || null,
        // Dynamically set the ID based on context
        [context.type === 'pitch' ? 'pitch' : 'investor_post']: context.id
      };

      // Add scheduled times if meeting link is provided
      if (meetingLink.trim()) {
        if (scheduledStartTime) {
          payload.scheduled_start_time = new Date(scheduledStartTime).toISOString();
        }
        if (scheduledEndTime) {
          payload.scheduled_end_time = new Date(scheduledEndTime).toISOString();
        }
      }

      await createRequest(payload);
      toast.success("Request sent successfully!");

      // Reset form
      setMessage("");
      setMeetingLink("");
      setScheduledStartTime("");
      setScheduledEndTime("");
      setAgenda("");
      setMeetingPlatform("google-meet");

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to send request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg animate-fadeIn max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">
            Contact {recipientName}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Message */}
          <FormField
            as="textarea"
            label="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce yourself and explain your interest…"
            rows={5}
            maxLength={1000}
            helpText={`${message.length}/1000 characters`}
          />

          {/* Meeting Platform Selector */}
          <div>
            <label className="font-semibold text-gray-800 block mb-2">
              Meeting Platform (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setMeetingPlatform("google-meet")}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition ${meetingPlatform === "google-meet"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Video size={24} className={meetingPlatform === "google-meet" ? "text-orange-600" : "text-gray-600"} />
                <span className="text-sm font-medium">Google Meet</span>
              </button>

              <button
                type="button"
                onClick={() => setMeetingPlatform("zoom")}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition ${meetingPlatform === "zoom"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Video size={24} className={meetingPlatform === "zoom" ? "text-orange-600" : "text-gray-600"} />
                <span className="text-sm font-medium">Zoom</span>
              </button>

              <button
                type="button"
                onClick={() => setMeetingPlatform("phone")}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition ${meetingPlatform === "phone"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Phone size={24} className={meetingPlatform === "phone" ? "text-orange-600" : "text-gray-600"} />
                <span className="text-sm font-medium">Phone</span>
              </button>

              <button
                type="button"
                onClick={() => setMeetingPlatform("in-person")}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition ${meetingPlatform === "in-person"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <MapPin size={24} className={meetingPlatform === "in-person" ? "text-orange-600" : "text-gray-600"} />
                <span className="text-sm font-medium">In-Person</span>
              </button>
            </div>
          </div>

          {/* Meeting Link */}
          <FormField
            label={
              meetingPlatform === "phone" ? "Phone Number" :
                meetingPlatform === "in-person" ? "Meeting Location" :
                  "Meeting Link"
            }
            type={meetingPlatform === "phone" ? "tel" : "text"}
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder={
              meetingPlatform === "phone" ? "+1 (555) 123-4567" :
                meetingPlatform === "in-person" ? "123 Main St, City" :
                  "https://meet.google.com/xxx-xxxx-xxx"
            }
          />

          {/* Scheduled Meeting Times (shown only if meeting link/location is provided) */}
          {meetingLink.trim() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 text-blue-800 font-semibold mb-3">
                <Calendar size={20} />
                <span>Schedule Meeting Time</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Start Time"
                  type="datetime-local"
                  value={scheduledStartTime}
                  onChange={(e) => setScheduledStartTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />

                <FormField
                  label="End Time"
                  type="datetime-local"
                  value={scheduledEndTime}
                  onChange={(e) => setScheduledEndTime(e.target.value)}
                  min={scheduledStartTime || new Date().toISOString().slice(0, 16)}
                />
              </div>

              <FormField
                as="select"
                label="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </FormField>

              <FormField
                as="textarea"
                label="Meeting Agenda (Optional)"
                rows={2}
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="What would you like to discuss?"
              />
            </div>
          )}

          {/* Preference */}
          <FormField
            as="select"
            label="Contact Preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="dm">In-app Message</option>
          </FormField>

          {/* Submit */}
          <LoadingButton
            type="submit"
            loading={sending}
            className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
          >
            Send Message
          </LoadingButton>

        </form>

      </div>
    </div>
  );
}
