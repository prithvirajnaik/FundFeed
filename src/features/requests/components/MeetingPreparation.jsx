import { Clock, User, FileText, Calendar, MapPin, Video } from "lucide-react";

export default function MeetingPreparation({ request, otherUser, onJoinMeeting, timeRemaining }) {
    const contextTitle = request.pitch?.title || request.investor_post?.title;
    const contextType = request.pitch ? "Pitch" : "Investor Post";

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'phone':
                return <span className="text-2xl">📞</span>;
            case 'in-person':
                return <MapPin size={24} />;
            default:
                return <Video size={24} />;
        }
    };

    const getPlatformLabel = (platform) => {
        const labels = {
            'google-meet': 'Google Meet',
            'zoom': 'Zoom',
            'microsoft-teams': 'Microsoft Teams',
            'phone': 'Phone Call',
            'in-person': 'In-Person Meeting',
            'other': 'Online Meeting'
        };
        return labels[platform] || 'Online Meeting';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {getPlatformIcon(request.meeting_platform)}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Ready to Join Your Meeting?
                </h1>
                <p className="text-gray-600">
                    {getPlatformLabel(request.meeting_platform)}
                </p>
            </div>

            {/* Time Remaining */}
            {timeRemaining && timeRemaining !== "Meeting time expired" && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-3">
                        <Clock className="text-blue-600" size={24} />
                        <div className="text-center">
                            <p className="text-sm text-blue-600 font-medium">Time Remaining</p>
                            <p className="text-2xl font-bold text-blue-900">{timeRemaining}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Meeting Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Participant */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <User className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Meeting With</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {otherUser?.first_name} {otherUser?.last_name}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">{otherUser?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Context */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <FileText className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">About</p>
                            <p className="text-lg font-semibold text-gray-900">{contextTitle}</p>
                            <p className="text-sm text-gray-500">{contextType}</p>
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                {request.scheduled_start_time && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <Calendar className="text-orange-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Scheduled Time</p>
                                <p className="text-base font-semibold text-gray-900">
                                    {new Date(request.scheduled_start_time).toLocaleString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        timeZoneName: 'short'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Duration: {request.scheduled_end_time ?
                                        Math.round((new Date(request.scheduled_end_time) - new Date(request.scheduled_start_time)) / 1000 / 60) + ' min' :
                                        'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Timezone */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <Clock className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Timezone</p>
                            <p className="text-base font-semibold text-gray-900">
                                {request.timezone || 'UTC'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Your local time: {new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agenda */}
            {request.agenda && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-2">📋 Meeting Agenda</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{request.agenda}</p>
                </div>
            )}

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">💡 Quick Tips for a Great Meeting</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Find a quiet location with good lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Test your microphone and camera before joining</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Have your pitch materials or questions ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Take notes during the discussion</span>
                    </li>
                </ul>
            </div>

            {/* Join Button */}
            <div className="text-center">
                <button
                    onClick={onJoinMeeting}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-12 py-4 rounded-lg text-xl font-bold hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Join Meeting Now →
                </button>

                <p className="text-sm text-gray-500 mt-4">
                    The meeting will open in a new window
                </p>
            </div>
        </div>
    );
}
