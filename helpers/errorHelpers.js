let errorHelpers = {
  logtoConsole: function (err, req, res, next) {
    console.error("Error:" + JSON.stringify(errorHelpers.errorBuilder(err)));
    next(error);
  },

  clientReqError: function (err, req, res, next) {
    if (req.xhr) {
      res.status(500).json({
        status: 500,
        message: "XMLHTTPREQUEST ERROR",
      });
    } else {
      next(err);
    }
  },
  handleAllErrors: function (err, req, res, next) {
    res.status(500).json(errorHelpers.errorBuilder(err));
  },
  errorBuilder: function (err) {
    return {
      status: 500,
      message: err.message,
    };
  },
};

module.exports = errorHelpers;
