import { X, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export default function RescheduleModal({ open, onClose, request, onReschedule, loading }) {
    const [newStartTime, setNewStartTime] = useState("");
    const [newEndTime, setNewEndTime] = useState("");
    const [reason, setReason] = useState("");

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newStartTime || !newEndTime) {
            alert("Please select both start and end times");
            return;
        }

        const start = new Date(newStartTime);
        const end = new Date(newEndTime);

        if (end <= start) {
            alert("End time must be after start time");
            return;
        }

        onReschedule({
            scheduled_start_time: new Date(newStartTime).toISOString(),
            scheduled_end_time: new Date(newEndTime).toISOString(),
            reason: reason.trim()
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl animate-fadeIn m-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-orange-600" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Reschedule Meeting
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-600 hover:text-black transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Current Schedule Info */}
                {request?.scheduled_start_time && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Current Schedule:</p>
                        <div className="flex items-center gap-2 text-gray-900">
                            <Clock size={16} />
                            <p className="font-medium">
                                {new Date(request.scheduled_start_time).toLocaleString()}
                                {request.scheduled_end_time && (
                                    <> - {new Date(request.scheduled_end_time).toLocaleTimeString()}</>
                                )}
                            </p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* New Start Time */}
                    <div>
                        <label className="block font-semibold text-gray-800 mb-2">
                            New Start Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={newStartTime}
                            onChange={(e) => setNewStartTime(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                            required
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* New End Time */}
                    <div>
                        <label className="block font-semibold text-gray-800 mb-2">
                            New End Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={newEndTime}
                            onChange={(e) => setNewEndTime(e.target.value)}
                            min={newStartTime || new Date().toISOString().slice(0, 16)}
                            required
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block font-semibold text-gray-800 mb-2">
                            Reason for Rescheduling (Optional)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Let them know why you need to reschedule..."
                            className="w-full h-24 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            The other participant will be notified of the change
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Rescheduling...
                                </span>
                            ) : (
                                "Reschedule Meeting"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
