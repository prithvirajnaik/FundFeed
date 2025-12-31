import { useNavigate } from "react-router-dom";
import { ArrowRight, Code, TrendingUp, ShieldCheck } from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white/50 z-0" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-8 animate-fadeIn">
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium text-gray-600">Now Live in Beta</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 animate-[fadeIn_0.5s_ease-out]">
                        Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Code</span> Matches <br className="hidden md:block" /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Capital</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed animate-[fadeIn_0.7s_ease-out]">
                        The premier marketplace connecting innovative developers with visionary investors.
                        Pitch your project or find the next unicorn.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_0.9s_ease-out]">
                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            Get Started <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why FundFeed?</h2>
                        <p className="text-gray-500">Built for the modern startup ecosystem</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Code size={32} className="text-orange-600" />}
                            title="For Developers"
                            desc="Showcase your MVPs, technical architecture, and roadmap to a curated network of investors."
                        />
                        <FeatureCard
                            icon={<TrendingUp size={32} className="text-blue-600" />}
                            title="For Investors"
                            desc="Discover high-potential projects across various stages. Filter by stack, stage, and ask."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={32} className="text-green-600" />}
                            title="Secure & Direct"
                            desc="Verified profiles and direct messaging. No middlemen, just pure connection."
                        />
                    </div>
                </div>
            </section>

            {/* STATISTICS (Simple Bar) */}
            {/* <section className="py-16 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-8 text-center">
                    <Stat number="50+" label="Active Investors" />
                    <Stat number="200+" label="Innovative Pitches" />
                    <Stat number="$5M+" label="Potential Funding" />
                </div>
            </section> */}

            {/* FOOTER */}
            <footer className="py-10 bg-white border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">© 2024 FundFeed. All rights reserved.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-6 w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function Stat({ number, label }) {
    return (
        <div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">{number}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
}
