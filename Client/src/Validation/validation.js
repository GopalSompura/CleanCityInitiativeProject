export const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
export const validPassword = new RegExp(
  "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
);
