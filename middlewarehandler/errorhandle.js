const { cosntant } = require("../constants");

const errorhandle = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case cosntant.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case cosntant.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case cosntant.UNANTHORIZED_ERROR:
      res.json({
        title: "unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case cosntant.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case cosntant.FORBIDDEN:
      res.json({
        title: "forbeddin",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
        console.log("No working Good to go");
      break;
  }
};
module.exports = { errorhandle };
