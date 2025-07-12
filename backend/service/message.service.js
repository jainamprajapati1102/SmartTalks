import messageModel from "../models/message.model";

export const messageCreateService = async ({
  receiver_id,
  sender_id,
  msg,
  media,
}) => {
  try {
    if (!receiver_id || !sender_id || !msg) {
      throw new Error("All Feilds are required");
    }

    const chat = await messageModel.create({
      receiver_id,
      sender_id,
      msg,
      media,
    });
    return chat;
  } catch (error) {
    console.log(error);
  }
};
