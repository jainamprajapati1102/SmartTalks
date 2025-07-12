import { messageCreateService } from "../service/message.service";

export const message_create = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Body is empty");
    }
    const { receiver_id, sender_id, msg, media } = req.body;

    const chat = await messageCreateService({
      receiver_id,
      sender_id,
      msg,
      media,
    });
    res.status(201).send({ msg: "msg send", chat });
  } catch (error) {
    console.log(error);
  }
};
