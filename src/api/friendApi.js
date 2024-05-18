import instance from ".";

export const getFriends = (userPhone) =>
  instance.get(`/user/friends/${userPhone}`);

export const getFriendRequest = (userPhone) =>
  instance.get(`/user/friend-request/${userPhone}`);
