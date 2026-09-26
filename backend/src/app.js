import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import stockRoutes from "./modules/stock/stock.routes.js";
import receiptRoutes from "./modules/receipts/receipt.routes.js";
import deliveryRoutes from "./modules/deliveries/delivery.routes.js";
import transferRoutes from "./modules/transfers/transfer.routes.js";
import adjustmentRoutes
    from "./modules/adjustments/adjustment.routes.js";

import ledgerRoutes from "./modules/ledger/ledger.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "StockSense API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/transfers", transferRoutes);
app.use(
    "/api/adjustments",
    adjustmentRoutes
);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;