import instance from ".";

export const getUserDetails = (userPhone) =>
  instance.get(`/user/details/${userPhone}`);

export const getExistUserPhone = (userPhone) =>
  instance.get(`user/${userPhone}`);

export const getUserOnline = () => instance.get("user/users-online");

export const editUser = (detail) =>
  instance.post("user/details-update", detail);
