import instance from ".";

export const loginUser = (user) => instance.post("/login", user);

export const registerUser = (user) => instance.post("/register", user);
