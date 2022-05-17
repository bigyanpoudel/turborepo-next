import { API } from "ui";

export const register = async (data: any) => {
  return API.post("user/register", data);
};

export const loginUser = async (data: any) => {
  return API.post("user/login", data);
};
export const userProfile = async () => {
  return API.get("user/profile");
};
export const userVerify = async (data: any) => {
  return API.post("user/verify", data);
};
export const verifyEmail = async (data: any) => {
  return API.post("user/verify-email", data);
};
