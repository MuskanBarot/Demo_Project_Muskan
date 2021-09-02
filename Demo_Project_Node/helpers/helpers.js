const {
  SOMETHING_WENT_WRONG,
  OPERATION_COMPLETED,
} = require('./messages');

exports.successResponse = (req, res, data, message = OPERATION_COMPLETED, code = 200) => {
  res.status(code);
  res.send({
    code,
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (req, res, message = SOMETHING_WENT_WRONG, code = 500) => {
  res.status(code);
  res.send({
    code,
    success: false,
    message,
    data: null,
  });
};