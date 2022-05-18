import { API } from "ui";

export const getAllPost = async () => {
  return API.get("post/read");
};

export const getAllUserPost = async () => {
  return API.get("post/user-post");
};

export const createProduct = async (data: any) => {
  return API.post("post/create", data);
};
