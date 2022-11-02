const customErrorHandler = (error, req, res, next) => {

   if (res.headersSent) {
      next();
   } else if (error) {
      res.status(500).json({ error: error.message })
   } else {
      next();
   }
}

module.exports = customErrorHandler;