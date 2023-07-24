export const CheckExisting = (data, CustomError, message) => {

  if (!data) throw new CustomError(message);
  else return data;
};
