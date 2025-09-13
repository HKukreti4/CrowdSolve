class ErrorHandler extends Error {
constructor(message = `Something Went Wrong`, statusCode) {
super(message);
this.statusCode = statusCode;
Error.captureStackTrace(this, this.constructor);
}
}
const errorHandler = ErrorHandler;
module.exports= errorHandler;