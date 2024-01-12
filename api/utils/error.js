export const createError = (status, message) => {
  return {
    success: false,
    status: status,
    message: message,
  };
};
