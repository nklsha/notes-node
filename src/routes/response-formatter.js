function formResponse(res, data, err) {
    if (data) {
      res.status(200).send({
        data: data
      });
    } else {
      res.status(err.status || 500).send({
        error: err.message || "Server error"
      });
    }
  }

  module.exports = {
    formResponse
  }