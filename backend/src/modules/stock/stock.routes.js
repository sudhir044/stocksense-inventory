import express from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { getStock } from "./stock.controller.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getStock);

export default router;