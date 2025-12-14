import { useState } from "react";
import { X } from "lucide-react";
import api from "../../../api/apiClient";
import toast from 'react-hot-toast';
import FormField from "../../../components/FormField";
import LoadingButton from "../../../components/LoadingButton";

export default function EditDeveloperProfileModal({ profile, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: profile?.title || "",
        bio: profile?.bio || "",
        skills: profile?.skills || [],
        github: profile?.links?.github || "",
        linkedin: profile?.links?.linkedin || "",
        portfolio: profile?.links?.portfolio || "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(profile?.avatar || "");
    const [newSkill, setNewSkill] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            // Append all text fields
            Object.keys(formData).forEach(key => {
                if (key === 'skills') {
                    data.append(key, JSON.stringify(formData[key]));
                } else if (key === 'links') {
                    // Verify if backend expects nested links or flat. Original code used flat keys from formData state?
                    // State structure: github, linkedin...
                    // Original code: 
                    // Object.keys(formData).forEach... if key is github/linkedin/portfolio... 
                    // Wait, in previous code formData keys were title, bio, skills, github, linkedin, portfolio.
                    // So this loop works fine.
                    data.append(key, formData[key]);
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
            toast.success("Profile updated successfully!");
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to update profile:", err);
            toast.error("Failed to update profile. Please try again.");
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Avatar Upload */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                                src={previewUrl || "/avatar1.png"}
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

                    {/* Title */}
                    <FormField
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Full Stack Developer"
                    />

                    {/* Bio */}
                    <FormField
                        as="textarea"
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        maxLength={300}
                        rows={4}
                        helpText={`${formData.bio.length}/300 characters`}
                    />

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Skills
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                placeholder="Add a skill..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="hover:text-orange-900"
                                        aria-label={`Remove skill ${skill}`}
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* GitHub */}
                    <FormField
                        label="GitHub URL"
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                        placeholder="https://github.com/username"
                    />

                    {/* LinkedIn */}
                    <FormField
                        label="LinkedIn URL"
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="https://linkedin.com/in/username"
                    />

                    {/* Portfolio */}
                    <FormField
                        label="Portfolio URL"
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                        placeholder="https://yourportfolio.com"
                    />

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 bg-white"
                        >
                            Cancel
                        </button>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                            Save Changes
                        </LoadingButton>
                    </div>
                </form>

            </div>
        </div>
    );
}
