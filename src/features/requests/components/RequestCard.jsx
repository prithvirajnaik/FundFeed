import { Mail, Calendar, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function RequestCard({ request, onViewed }) {
  const {
    id,
    pitchTitle,
    investor,
    message,
    meetingLink,
    preference,
    createdAt,
    viewed,
  } = request;

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition space-y-3">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-primary text-xl">
            {investor.name}
          </h2>
          <p className="text-gray-600 text-sm">{investor.type}</p>
        </div>

        {!viewed ? (
          <button
            onClick={() => onViewed(id)}
            className="text-accent flex gap-1 items-center"
          >
            <Eye size={16} /> Mark viewed
          </button>
        ) : (
          <div className="text-gray-400 flex gap-1 items-center">
            <EyeOff size={16} /> Viewed
          </div>
        )}
      </div>

      {/* Pitch Reference */}
      <p className="text-sm">
        Regarding your pitch:{" "}
        <span className="font-semibold">{pitchTitle}</span>
      </p>

      {/* Message */}
      <div className="bg-gray-50 p-3 rounded-lg border">
        <p className="text-gray-800">{message}</p>
      </div>

      {/* Meeting Link */}
      {meetingLink && (
        <a
          href={meetingLink}
          target="_blank"
          className="flex items-center gap-2 text-accent hover:underline"
        >
          <Calendar size={16} />
          Meeting Link
        </a>
      )}

      {/* Contact Preference */}
      <p className="text-sm">Preferred contact: <b>{preference}</b></p>

      {/* Footer */}
      <div className="text-gray-500 text-xs">
        {new Date(createdAt).toLocaleString()}
      </div>

      {/* Reply button (MVP = open email client) */}
      <a
        href={`mailto:investor@example.com?subject=Regarding your interest in ${pitchTitle}`}
        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg mt-3 hover:bg-opacity-90"
      >
        <Mail size={16} />
        Reply via Email
      </a>

      {/* Investor profile link */}
      <Link
        to={`/investor/${investor.id}`}
        className="block text-accent underline text-sm"
      >
        View Investor Profile →
      </Link>

    </div>
  );
}
