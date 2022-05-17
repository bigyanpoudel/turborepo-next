import { API } from "ui";

export const getAllPost = async () => {
  return API.get("post/read");
};
