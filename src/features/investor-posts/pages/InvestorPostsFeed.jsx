import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import InvestorPostCard from "../components/InvestorPostCard";
import { fetchInvestorPosts, saveInvestorPost, unsaveInvestorPost } from "../api/investorPostsApi";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/apiClient"; // Import api to fetch saved list directly if needed or add to api service

export default function InvestorPostsFeed() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [savedIds, setSavedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [postsData, savedData] = await Promise.all([
                fetchInvestorPosts({ search }),
                // Only fetch saved if user is developer (or authenticated)
                user ? api.get("/api/investor-posts/saved/").catch(() => ({ data: [] })) : Promise.resolve({ data: [] })
            ]);

            setPosts(postsData.results || postsData);

            // savedData.data is list of { developer, post: {...}, saved_at }
            // We just need post IDs
            const ids = savedData.data.map(item => item.post.id);
            setSavedIds(ids);

        } catch (err) {
            console.error("Failed to load investor posts", err);
            setError("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadData(); // Re-fetch with search param (need to pass search to fetchInvestorPosts inside loadData or update state before calling)
        // Actually loadData uses current 'search' state, but setState is async.
        // Better to pass search explicitly or rely on useEffect dependency if we added it.
        // For now let's just call fetchInvestorPosts directly here.
        fetchInvestorPosts({ search }).then(data => setPosts(data.results || data));
    };

    const handleSave = async (postId) => {
        try {
            if (savedIds.includes(postId)) {
                await unsaveInvestorPost(postId);
                setSavedIds(prev => prev.filter(id => id !== postId));
                // Update post saved_count locally
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved_count: p.saved_count - 1 } : p));
            } else {
                await saveInvestorPost(postId);
                setSavedIds(prev => [...prev, postId]);
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved_count: p.saved_count + 1 } : p));
            }
        } catch (err) {
            console.error("Failed to toggle save", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Investor Posts</h1>
                    <p className="text-gray-600 mt-1">Discover what investors are looking for.</p>
                </div>

                {/* Create Button (Only for Investors) */}
                {user?.role === "investor" && (
                    <Link
                        to="/investor-posts/create"
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-all w-fit"
                    >
                        <Plus size={20} />
                        Create Post
                    </Link>
                )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 relative max-w-lg">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by keywords, tags, or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                />
            </form>

            {/* Feed Grid */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading posts...</div>
            ) : error ? (
                <div className="text-center py-20 text-red-500">{error}</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-lg font-medium">No posts found.</p>
                    <p className="text-sm mt-1">Try adjusting your search or check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <InvestorPostCard
                            key={post.id}
                            post={post}
                            saved={savedIds.includes(post.id)}
                            onSave={handleSave}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
