import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { fetchMyInvestorPosts, deleteInvestorPost } from "../../investor-posts/api/investorPostsApi";
import { Trash2, Edit, Eye } from "lucide-react";

export default function InvestorDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        loadPosts();
    }, [user]);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await fetchMyInvestorPosts();
            setPosts(data);
        } catch (err) {
            console.error("Failed to load posts", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await deleteInvestorPost(id);
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete post", err);
            alert("Failed to delete post");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#f9f9f9] min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">
                    My Investor Posts
                </h1>

                <Link
                    to="/investor-posts/create"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700"
                >
                    + Create New Post
                </Link>
            </div>

            {/* CONTENT */}
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading posts...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
                    <Link
                        to="/investor-posts/create"
                        className="text-orange-600 font-medium hover:underline"
                    >
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid grid-cols-12 font-semibold p-4 border-b text-gray-600 text-sm bg-gray-50">
                        <div className="col-span-5">Title</div>
                        <div className="col-span-3">Amount Range</div>
                        <div className="col-span-2">Saved By</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    {posts.map(post => (
                        <div key={post.id} className="border-b last:border-0 hover:bg-gray-50 transition">

                            {/* Desktop Row */}
                            <div className="hidden md:grid grid-cols-12 items-center p-4 text-sm">
                                <div className="col-span-5 font-medium text-gray-900">
                                    {post.title}
                                    <div className="text-xs text-gray-500 mt-1 truncate">{post.description}</div>
                                </div>
                                <div className="col-span-3 text-gray-600">{post.amount_range}</div>
                                <div className="col-span-2 text-gray-600">{post.saved_count || 0} devs</div>
                                <div className="col-span-2 flex justify-end gap-3">
                                    <Link to={`/investor-post/${post.id}`} className="text-gray-400 hover:text-gray-600" title="View">
                                        <Eye size={18} />
                                    </Link>
                                    {/* Edit functionality to be added later */}
                                    {/* <button className="text-blue-400 hover:text-blue-600" title="Edit">
                    <Edit size={18} />
                  </button> */}
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-400 hover:text-red-600"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Card */}
                            <div className="md:hidden p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{post.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>{post.amount_range}</span>
                                    <span>{post.saved_count || 0} saves</span>
                                </div>
                                <div className="flex justify-end gap-4 pt-2 border-t border-gray-100">
                                    <Link to={`/investor-posts/${post.id}`} className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                        <Eye size={16} /> View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
