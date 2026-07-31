export const validateEmail = (email) => {
  const re = /^[^s@]+@[^s@]+\.[^s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (number) => {
  const re = /^\+[1-9]\d{1,14}$/;
  return re.test(String(number));
};

export const validateLoginForm = ({ username, password }) => {
  const error = {};
  if (!username?.trim()) error.username = "Username not required";
  if (!password?.trim()) error.password = "Password not required";
  else if (password.length < 4) error.password = "Password is too small";

  return error;
};
