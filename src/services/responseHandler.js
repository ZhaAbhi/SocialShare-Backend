function sendError(res, statusCode, errorMessage) {
  return res.status(statusCode).json({ error: errorMessage });
}

function sendSuccess(res, statusCode, successMessage) {
  return res.status(statusCode).json(successMessage);
}

module.exports = {
  sendError,
  sendSuccess,
};
