import jwt from "jsonwebtoken";
import {
  messageCreateService,
  selected_user_msg_service,
} from "../service/message.service.js";
export const message_create = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Body is empty");
    }
    const { receiver_id, sender_id, msg, media } = req.body;
    // console.log(req.body);
    const sender = jwt.verify(sender_id, "sm?>{}+arttal!_&&*k?@s");
    // console.log(receiver._id);

    const chat = await messageCreateService({
      receiver_id,
      sender_id: sender,
      msg,
      media,
    });
    res.status(200).send({ msg: "msg send", chat });
  } catch (error) {
    console.log(error);
  }
};

export const selectedUser_msg = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("selected msg user-->>", req.body);

    const response = await selected_user_msg_service({ id });
    res.status(200).send({ messages: response });
  } catch (error) {
    console.log("err frm selected user msg controller-->", error);
  }
};
