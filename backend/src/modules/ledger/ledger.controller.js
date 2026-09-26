import {
    getLedgerEntries,
    getLedgerEntry,
} from "./ledger.service.js";


export const getLedger = async (req, res) => {
    try {
        const {
            productId,
            locationId,
            warehouseId,
            movementType,
            referenceType,
            fromDate,
            toDate,
            search,
        } = req.query;

        const entries = await getLedgerEntries({
            productId,
            locationId,
            warehouseId,
            movementType,
            referenceType,
            fromDate,
            toDate,
            search,
        });

        res.status(200).json({
            success: true,
            count: entries.length,
            data: entries,
        });

    } catch (error) {
        console.error("Get ledger error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch stock movement history",
        });
    }
};


export const getLedgerById = async (req, res) => {
    try {
        const { id } = req.params;

        const entry = await getLedgerEntry(id);

        res.status(200).json({
            success: true,
            data: entry,
        });

    } catch (error) {
        console.error("Get ledger entry error:", error);

        if (error.message === "Ledger entry not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to fetch ledger entry",
        });
    }
};