import { useState } from "react";
import { X } from "lucide-react";
import api from "../../../api/apiClient";

export default function EditInvestorProfileModal({ profile, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        firm: profile?.firm || "",
        investor_type: profile?.type || "",
        contact_preference: profile?.contactPreference || "email",
        stages: profile?.stages || [],
        sectors: profile?.sectors || [],
        linkedin: profile?.links?.linkedin || "",
        website: profile?.links?.website || "",
        bio: profile?.bio || "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(profile?.avatar || "");
    const [newStage, setNewStage] = useState("");
    const [newSector, setNewSector] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAddStage = () => {
        if (newStage.trim() && !formData.stages.includes(newStage.trim())) {
            setFormData(prev => ({
                ...prev,
                stages: [...prev.stages, newStage.trim()]
            }));
            setNewStage("");
        }
    };

    const handleRemoveStage = (stageToRemove) => {
        setFormData(prev => ({
            ...prev,
            stages: prev.stages.filter(s => s !== stageToRemove)
        }));
    };

    const handleAddSector = () => {
        if (newSector.trim() && !formData.sectors.includes(newSector.trim())) {
            setFormData(prev => ({
                ...prev,
                sectors: [...prev.sectors, newSector.trim()]
            }));
            setNewSector("");
        }
    };

    const handleRemoveSector = (sectorToRemove) => {
        setFormData(prev => ({
            ...prev,
            sectors: prev.sectors.filter(s => s !== sectorToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            // Append all text fields
            Object.keys(formData).forEach(key => {
                if (key === 'stages' || key === 'sectors') {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            });

            if (avatarFile) {
                data.append("avatar", avatarFile);
            }

            await api.patch("/direct-profile-update/", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Avatar Upload */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                                src={previewUrl || "/investorAvatar.png"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            />
                        </div>
                    </div>

                    {/* Firm */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Firm Name
                        </label>
                        <input
                            type="text"
                            value={formData.firm}
                            onChange={(e) => setFormData(prev => ({ ...prev, firm: e.target.value }))}
                            placeholder="e.g., ABC Ventures"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Investor Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Investor Type
                        </label>
                        <input
                            type="text"
                            value={formData.investor_type}
                            onChange={(e) => setFormData(prev => ({ ...prev, investor_type: e.target.value }))}
                            placeholder="e.g., Angel Investor, VC, etc."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Tell us about your investment focus..."
                            maxLength={300}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.bio.length}/300 characters
                        </p>
                    </div>

                    {/* Investment Stages */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Investment Stages
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newStage}
                                onChange={(e) => setNewStage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStage())}
                                placeholder="e.g., Seed, Pre-seed..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handleAddStage}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.stages.map((stage, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2"
                                >
                                    {stage}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStage(stage)}
                                        className="hover:text-orange-900"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sectors */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Sectors of Interest
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newSector}
                                onChange={(e) => setNewSector(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSector())}
                                placeholder="e.g., AI, Fintech..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handleAddSector}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.sectors.map((sector, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2"
                                >
                                    {sector}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSector(sector)}
                                        className="hover:text-orange-900"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Preference */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Contact Preference
                        </label>
                        <select
                            value={formData.contact_preference}
                            onChange={(e) => setFormData(prev => ({ ...prev, contact_preference: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="dm">In-app Message</option>
                        </select>
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Website URL
                        </label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            placeholder="https://yourfirm.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
