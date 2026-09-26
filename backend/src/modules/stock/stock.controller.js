import { findStock } from "./stock.repository.js";

export const getStock = async (req, res) => {
    try {
        const { productId, locationId } = req.query;

        const stock = await findStock({
            productId,
            locationId,
        });

        res.status(200).json({
            success: true,
            data: stock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};