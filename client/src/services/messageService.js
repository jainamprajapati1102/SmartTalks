import api from "./api";

export const create_chat_service = async (formdata) => {
  try {
    const response = await api.post("chat/create_chat", formdata);
    return response;
  } catch (error) {
    throw error.message || { msg: "Error In Sending message" };
  }
};

export const get_Message_SelectedUser_services = async (formdata) => {
  try {
    const response = await api.post("chat/selectedUser_msg", formdata);
    return response;
  } catch (error) {
    throw error.message || { msg: "Error In fetch select user message" };
  }
};
