import useAuth from "../../../hooks/useAuth";
import DeveloperDashboard from "./DeveloperDashboard";
import InvestorDashboard from "./InvestorDashboard";

export default function DashboardRouter() {
    const { user } = useAuth();

    if (!user) return null;

    if (user.role === "investor") {
        return <InvestorDashboard />;
    }

    return <DeveloperDashboard />;
}
