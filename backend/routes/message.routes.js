import e from "express";
import { body } from "express-validator";
import {
  message_create,
  selectedUser_msg,
} from "../controller/messageController.js";
const router = e.Router();

router.post(
  "/create_chat",
  [
    body("receiver_id").notEmpty().withMessage("receiver is always defined"),
    body("sender_id").notEmpty().withMessage("sender is always defined"),
  ],
  message_create
);
router.post("/selectedUser_msg", selectedUser_msg);
export default router;
