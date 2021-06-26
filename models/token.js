const mongoose = require('mongoose');

const smtpTokenSchema = {
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now(),
  },
  domain: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
};

const SMTP_Token = mongoose.model('SMTP_Token', smtpTokenSchema);

module.exports = SMTP_Token;
