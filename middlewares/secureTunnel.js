const crypto = require('crypto-js');

module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    if (req.headers.secure_hash && req.headers.requested_at) {
      try {
        const current_time = Date.now();
        const hash_time = req.headers.requested_at;
        const hash = req.headers.secure_hash;
        const key = process.env.SECURE_KEY + hash_time;
        const hash_pass = process.env.HASHPASS;
        const decrypted = crypto.AES.decrypt(hash, key).toString(
          crypto.enc.Utf8,
        );
        const decryption_valid = !(decrypted === '');
        const pre_validation_period = current_time - 30000;
        const validation_period = current_time + 30000;
        if (decryption_valid) {
          const [, valid_time] = decrypted.split(hash_pass);
          const [decoded_hash] = decrypted.split(valid_time);
          if (decoded_hash === hash_pass) {
            if (
              valid_time > pre_validation_period &&
              valid_time < validation_period
            ) {
              if (current_time < valid_time) {
                next();
              } else {
                res.status(401).json({
                  success: false,
                  message: 'Hash is Expired. Please Send New Token',
                });
              }
            } else {
              res.status(401).json({
                success: false,
                message: 'Validation Period is beyond the Limit',
              });
            }
          } else {
            res.status(401).json({
              success: false,
              message: 'Your Hash is Wrong, Forbidding your Access',
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: 'Hash is not Valid',
          });
        }
      } catch {
        res.status(401).json({
          success: false,
          message: 'Hash failed to decrypt',
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Hash is Required to Communicate with this Server',
      });
    }
  } else {
    next();
  }
};
