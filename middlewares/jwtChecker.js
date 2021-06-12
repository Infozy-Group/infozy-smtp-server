const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.auth_token;
  if (token) {
    return jwt.verify(token, process.env.HASHPASS, (error, decoded) => {
      if (!error && decoded) {
        next();
      } else {
        res.status(401).json({
          success: false,
          message: 'Forbidden, Token is Wrong',
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'Token is Missing, Authorised Route Not Allowed',
    });
  }
  return false;
};
