import express from "express";

import {
    getLedger,
    getLedgerById,
} from "./ledger.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getLedger);

router.get("/:id", authenticate, getLedgerById);

export default router;