import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, DollarSign, MapPin, Tag } from "lucide-react";
import { createInvestorPost } from "../api/investorPostsApi";
import FormField from "../../../components/FormField";
import LoadingButton from "../../../components/LoadingButton";
import toast from 'react-hot-toast';

export default function CreateInvestorPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (formData.amount_range && !/^[\d\w\s$€£.,-]+$/.test(formData.amount_range)) {
            newErrors.amount_range = "Invalid format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        setLoading(true);

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

            data.append("tags", JSON.stringify(tagsList));
            data.append("stages", JSON.stringify(stagesList));

            if (logo) {
                data.append("logo", logo);
            }

            await createInvestorPost(data);
            toast.success("Investor post created successfully!");
            navigate("/investor-posts");
        } catch (err) {
            toast.error("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Investor Post</h1>
            <p className="text-gray-600 mb-8">Share your investment criteria to attract the right startups.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100" noValidate>

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
                <FormField
                    label="Post Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Looking for Seed Stage Fintech"
                    error={errors.title}
                    required
                />

                {/* Description */}
                <FormField
                    as="textarea"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your investment thesis, what you are looking for, and what you offer..."
                    error={errors.description}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Amount Range */}
                    <div className="relative">
                        <FormField
                            label="Check Size Range"
                            name="amount_range"
                            value={formData.amount_range}
                            onChange={handleChange}
                            placeholder="e.g. $50k - $200k"
                            error={errors.amount_range}
                            helpText="Optional"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <FormField
                            label="Location Preference"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. US, Remote, India"
                            helpText="Optional"
                        />
                    </div>
                </div>

                {/* Tags & Stages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Tags (comma separated)"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g. AI, SaaS, B2B"
                    />

                    <FormField
                        label="Stages (comma separated)"
                        name="stages"
                        value={formData.stages}
                        onChange={handleChange}
                        placeholder="e.g. Pre-Seed, Seed, Series A"
                    />
                </div>

                {/* Contact Preference */}
                <FormField
                    as="select"
                    label="Contact Preference"
                    name="contact_preference"
                    value={formData.contact_preference}
                    onChange={handleChange}
                >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="dm">Direct Message</option>
                </FormField>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Create Post
                    </LoadingButton>
                </div>

            </form>
        </div>
    );
}
