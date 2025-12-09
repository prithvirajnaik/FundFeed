import { X } from "lucide-react";
import { useState } from "react";
import { createRequest } from "../../requests/api/requestsApi";

export default function ContactModal({ open, onClose, context, recipientName }) {
  // context: { type: 'pitch' | 'post', id: string }

  if (!open) return null;

  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [preference, setPreference] = useState("email");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim().length === 0)
      return alert("Please enter a message.");

    setSending(true);
    try {
      const payload = {
        message,
        meeting_link: meetingLink,
        preference,
        // Dynamically set the ID based on context
        [context.type === 'pitch' ? 'pitch' : 'investor_post']: context.id
      };

      await createRequest(payload);
      alert("Request sent successfully!");
      onClose();
      setMessage("");
      setMeetingLink("");
    } catch (err) {
      console.error("Failed to send request", err);
      alert("Failed to send request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">
            Contact {recipientName}
          </h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Message */}
          <div>
            <label className="font-semibold">Message</label>
            <textarea
              value={message}
              maxLength={1000}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain your interest…"
              className="w-full h-32 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Meeting Link */}
          <div>
            <label className="font-semibold">Optional Meeting Link</label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="Google Meet / Calendly / Zoom URL"
              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Preference */}
          <div>
            <label className="font-semibold">Contact Preference</label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="dm">In-app Message</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 disabled:bg-gray-400 transition"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </div>
  );
}
