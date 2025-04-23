// utils/validations.js

const isValidEmail = (email) =>
  String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const validate = (group, name, value) => {
  if (!value?.toString().trim()) return "This field is required";

  switch (group) {
    case "signup":
      switch (name) {
        case "name":
          return null;
        case "email":
          return !isValidEmail(value) ? "Please enter a valid email address" : null;
        case "password":
          return value.length < 4 ? "Password should be at least 4 characters" : null;
        default:
          return null;
      }

    case "login":
      switch (name) {
        case "email":
          return !isValidEmail(value) ? "Please enter a valid email address" : null;
        case "password":
          return null;
        default:
          return null;
      }

    case "task":
      switch (name) {
        case "description":
          if (value.length > 100) return "Max. limit is 100 characters.";
          return null;
        default:
          return null;
      }

    default:
      return null;
  }
};

const validateManyFields = (group, fields) => {
  const errors = [];

  for (const field in fields) {
    const err = validate(group, field, fields[field]);
    if (err) errors.push({ field, err });
  }

  return errors;
};

export default validateManyFields;
