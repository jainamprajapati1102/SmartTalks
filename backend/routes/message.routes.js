import e from "express";
import { body } from "express-validator";
import { message_create } from "../controller/messageController";
const router = e.Router();

router.post(
  "/create_chat",
  [
    body("receiver_id").notEmpty().withMessage("receiver is always defined"),
    body("sender_id").notEmpty().withMessage("sender is always defined"),
  ],
  message_create
);
export default router;
