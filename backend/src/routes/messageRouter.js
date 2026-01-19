import express from "express";

import { createMessage, getAllMessages } from "../controller/messageController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/messages" , requireAuth ,getAllMessages);

router.post("/messages", requireAuth, createMessage);


export default router;