import {
    getTotalProducts,
    getTotalStock,
    getLowStockCount,
    getOutOfStockCount,
    getPendingReceipts,
    getPendingDeliveries,
    getScheduledTransfers,
    getRecentMovements,
} from "./dashboard.repository.js";


export const getDashboardData = async () => {
    const [
        totalProducts,
        totalStock,
        lowStock,
        outOfStock,
        pendingReceipts,
        pendingDeliveries,
        scheduledTransfers,
        recentMovements,
    ] = await Promise.all([
        getTotalProducts(),
        getTotalStock(),
        getLowStockCount(),
        getOutOfStockCount(),
        getPendingReceipts(),
        getPendingDeliveries(),
        getScheduledTransfers(),
        getRecentMovements(10),
    ]);

    return {
        metrics: {
            totalProducts,
            totalStock,
            lowStock,
            outOfStock,
            pendingReceipts,
            pendingDeliveries,
            scheduledTransfers,
        },

        recentMovements,
    };
};