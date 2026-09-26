import { getDashboardData } from "./dashboard.service.js";


export const getDashboard = async (req, res) => {
    try {
        const dashboard = await getDashboardData();

        res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data",
        });
    }
};