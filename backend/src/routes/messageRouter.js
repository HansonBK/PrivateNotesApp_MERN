import express from "express";

import { createMessage, deleteMessage, getAllMessages, updateMessage } from "../controller/messageController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/messages" , requireAuth ,getAllMessages);

router.post("/messages", requireAuth, createMessage);

router.put("/messages/:id", requireAuth, updateMessage);

router.delete("/messages/:id", requireAuth, deleteMessage);

export default router;