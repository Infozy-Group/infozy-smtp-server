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
  website: {
    type: String,
    required: true,
    unique: false,
  },
  expires_in: {
    type: Date,
    required: true,
    unique: false,
  },
  scope: {
    type: String,
    required: true,
    unique: false,
  },
  additional_tokens: {
    type: Array,
    required: false,
    unique: false,
  },
};

const SMTP_Token = mongoose.model('SMTP_Token', smtpTokenSchema);

module.exports = SMTP_Token;
