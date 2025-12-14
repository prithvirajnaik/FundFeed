import { useState } from "react";
import { Plus, X, CheckCircle, Calendar, FileText, Trash2 } from "lucide-react";

export default function MeetingSummaryForm({ onSubmit, loading, initialData = null }) {
    const [discussionPoints, setDiscussionPoints] = useState(initialData?.discussion_points || []);
    const [newPoint, setNewPoint] = useState("");

    const [actionItems, setActionItems] = useState(initialData?.action_items || []);
    const [newAction, setNewAction] = useState({ task: "", assignee: "", due_date: "" });

    const [decisionsMade, setDecisionsMade] = useState(initialData?.decisions_made || []);
    const [newDecision, setNewDecision] = useState("");

    const [nextSteps, setNextSteps] = useState(initialData?.next_steps || "");
    const [needsFollowup, setNeedsFollowup] = useState(initialData?.needs_followup || false);
    const [followupDate, setFollowupDate] = useState(initialData?.followup_date || "");
    const [additionalNotes, setAdditionalNotes] = useState(initialData?.additional_notes || "");

    // Discussion Points Handlers
    const addDiscussionPoint = () => {
        if (newPoint.trim()) {
            setDiscussionPoints([...discussionPoints, newPoint.trim()]);
            setNewPoint("");
        }
    };

    const removeDiscussionPoint = (index) => {
        setDiscussionPoints(discussionPoints.filter((_, i) => i !== index));
    };

    // Action Items Handlers
    const addActionItem = () => {
        if (newAction.task.trim()) {
            setActionItems([...actionItems, { ...newAction }]);
            setNewAction({ task: "", assignee: "", due_date: "" });
        }
    };

    const removeActionItem = (index) => {
        setActionItems(actionItems.filter((_, i) => i !== index));
    };

    // Decisions Handlers
    const addDecision = () => {
        if (newDecision.trim()) {
            setDecisionsMade([...decisionsMade, newDecision.trim()]);
            setNewDecision("");
        }
    };

    const removeDecision = (index) => {
        setDecisionsMade(decisionsMade.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const summaryData = {
            discussion_points: discussionPoints,
            action_items: actionItems,
            decisions_made: decisionsMade,
            next_steps: nextSteps,
            needs_followup: needsFollowup,
            followup_date: needsFollowup && followupDate ? followupDate : null,
            additional_notes: additionalNotes,
        };

        onSubmit(summaryData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="text-orange-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Meeting Summary</h2>
            </div>

            {/* Discussion Points */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Discussion Points</h3>

                {/* List of existing points */}
                {discussionPoints.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {discussionPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                                <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="flex-1 text-gray-700">{point}</p>
                                <button
                                    type="button"
                                    onClick={() => removeDiscussionPoint(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new point */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newPoint}
                        onChange={(e) => setNewPoint(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDiscussionPoint())}
                        placeholder="Add a discussion point..."
                        className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        type="button"
                        onClick={addDiscussionPoint}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Action Items */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Action Items</h3>

                {/* List of existing action items */}
                {actionItems.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {actionItems.map((item, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.task}</p>
                                        <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <strong>Assignee:</strong> {item.assignee || "Unassigned"}
                                            </span>
                                            {item.due_date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(item.due_date).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeActionItem(index)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new action item */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    <input
                        type="text"
                        value={newAction.task}
                        onChange={(e) => setNewAction({ ...newAction, task: e.target.value })}
                        placeholder="Task description..."
                        className="md:col-span-5 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <select
                        value={newAction.assignee}
                        onChange={(e) => setNewAction({ ...newAction, assignee: e.target.value })}
                        className="md:col-span-3 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">Select assignee...</option>
                        <option value="Me">Me</option>
                        <option value="Them">Them</option>
                        <option value="Both">Both</option>
                    </select>
                    <input
                        type="date"
                        value={newAction.due_date}
                        onChange={(e) => setNewAction({ ...newAction, due_date: e.target.value })}
                        className="md:col-span-2 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        type="button"
                        onClick={addActionItem}
                        disabled={!newAction.task.trim()}
                        className="md:col-span-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Decisions Made */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Decisions Made</h3>

                {/* List of existing decisions */}
                {decisionsMade.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {decisionsMade.map((decision, index) => (
                            <div key={index} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
                                <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="flex-1 text-gray-700">{decision}</p>
                                <button
                                    type="button"
                                    onClick={() => removeDecision(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new decision */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newDecision}
                        onChange={(e) => setNewDecision(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDecision())}
                        placeholder="Add a decision..."
                        className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        type="button"
                        onClick={addDecision}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-800">Next Steps</label>
                <textarea
                    value={nextSteps}
                    onChange={(e) => setNextSteps(e.target.value)}
                    placeholder="What are the overall next steps and follow-up plans?"
                    className="w-full h-24 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Follow-up Meeting */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="needsFollowup"
                        checked={needsFollowup}
                        onChange={(e) => setNeedsFollowup(e.target.checked)}
                        className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                    />
                    <label htmlFor="needsFollowup" className="text-lg font-semibold text-gray-800 cursor-pointer">
                        Schedule Follow-up Meeting?
                    </label>
                </div>

                {needsFollowup && (
                    <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proposed Follow-up Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={followupDate}
                            onChange={(e) => setFollowupDate(e.target.value)}
                            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                )}
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-800">Additional Notes</label>
                <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any other observations or notes from the meeting..."
                    className="w-full h-24 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || (discussionPoints.length === 0 && actionItems.length === 0 && decisionsMade.length === 0)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating Summary...
                    </>
                ) : (
                    <>
                        <CheckCircle size={20} />
                        Generate Summary
                    </>
                )}
            </button>
        </form>
    );
}
