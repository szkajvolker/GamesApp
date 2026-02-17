import express from "express";
import { sendFeedback } from "../controllers/feedback.controllers.js";

const router = express.Router();

router.post("/send", sendFeedback);

export default router;
