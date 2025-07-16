import messageModel from "../models/message.model.js";

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

export const selected_user_msg_service = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Selected user id is required");
    }

    const result = await messageModel.find({ receiver_id: id });
    return result;
  } catch (error) {
    console.log("err frm selected user msg fwetch -->", error);
  }
};
