import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, DollarSign, MapPin, Tag } from "lucide-react";
import { createInvestorPost } from "../api/investorPostsApi";

export default function CreateInvestorPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount_range: "",
        location: "",
        contact_preference: "email",
        tags: "",
        stages: "",
    });

    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("amount_range", formData.amount_range);
            data.append("location", formData.location);
            data.append("contact_preference", formData.contact_preference);

            // Handle arrays (comma separated strings -> JSON list)
            const tagsList = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
            const stagesList = formData.stages.split(",").map(s => s.trim()).filter(Boolean);

            // We need to send these as JSON strings if using FormData with some backends, 
            // but DRF JSONField usually expects just multiple values or a JSON string.
            // Let's try appending multiple times for list or sending as JSON string.
            // Safest for DRF multipart is usually sending a JSON string if the field expects JSON.
            data.append("tags", JSON.stringify(tagsList));
            data.append("stages", JSON.stringify(stagesList));

            if (logo) {
                data.append("logo", logo);
            }

            await createInvestorPost(data);
            navigate("/investor-posts"); // Redirect to feed
        } catch (err) {
            console.error("Failed to create post", err);
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Investor Post</h1>
            <p className="text-gray-600 mb-8">Share your investment criteria to attract the right startups.</p>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">

                {/* Logo Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firm Logo (Optional)</label>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Upload className="text-gray-400" />
                            )}
                        </div>
                        <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                            Upload Logo
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="e.g. Looking for Seed Stage Fintech"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        required
                        rows={5}
                        placeholder="Describe your investment thesis, what you are looking for, and what you offer..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Amount Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check Size Range</label>
                        <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="amount_range"
                                placeholder="e.g. $50k - $200k"
                                value={formData.amount_range}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location Preference</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. US, Remote, India"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Tags & Stages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <div className="relative">
                            <Tag size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="tags"
                                placeholder="e.g. AI, SaaS, B2B"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stages (comma separated)</label>
                        <input
                            type="text"
                            name="stages"
                            placeholder="e.g. Pre-Seed, Seed, Series A"
                            value={formData.stages}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Contact Preference */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Preference</label>
                    <select
                        name="contact_preference"
                        value={formData.contact_preference}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                    >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="dm">Direct Message</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Post"}
                    </button>
                </div>

            </form>
        </div>
    );
}
