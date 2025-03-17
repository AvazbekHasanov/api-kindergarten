import { Router } from "express";
import { verifyBarerToken } from "../middleware/authMiddleware.js";
import { NewMessage, MarkAsRead } from "../controllers/Message.js";

const router = Router();

router.post("/api/message/new/message", verifyBarerToken, async (req, res) => {
  try {
    const result = await NewMessage(req);
    res.status(200).send({ message: "Message succes sent", data: result });
  } catch (e) {
    res.status(500).send({ message: "Error", error: e.message });
  }
});

router.post("/api/messages/mark-as-read",verifyBarerToken,async (req, res) => {
    try {
      const result = await MarkAsRead(req);
      res.status(200).send({ message: "Messages marked as read" });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  }
);

export default router;
