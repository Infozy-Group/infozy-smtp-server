module.exports = (req, res, next) => {
  const allowedOrigins = process.env.FRONT.split(',');
  if (req.method === 'POST') {
    if (req.headers.origin && allowedOrigins.indexOf(req.headers.origin) > -1) {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Forbidden, Wrong way to Communicate',
      });
    }
  } else {
    next();
  }
};
