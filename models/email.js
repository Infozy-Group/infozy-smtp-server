const mongoose = require('mongoose');

const smtpEmailSchema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  domains: {
    type: String,
    required: true,
    unique: false,
  },
};

const SMTP_Token = mongoose.model('SMTP_Token', smtpTokenSchema);

module.exports = SMTP_Token;
