const nodemailer = require('nodemailer');

const INFOZY_RSA = process.env.RSA_INFOZY;
const SHAAAN_RSA = process.env.RSA_SHAAAN;

module.exports = (smtp_mail) => {
  let senderEmail;
  let dkimSignature;
  let domainName;
  if (smtp_mail) {
    if (smtp_mail === 'infozy') {
      senderEmail = 'support@infozy.tk';
      dkimSignature = INFOZY_RSA;
      domainName = 'infozy.tk';
    } else if (smtp_mail === 'shaaan') {
      senderEmail = 'support@shaaan.tk';
      dkimSignature = SHAAAN_RSA;
      domainName = 'shaaan.tk';
    } else {
      senderEmail = 'support@infozy.tk';
      dkimSignature = INFOZY_RSA;
      domainName = 'infozy.tk';
    }
  } else {
    senderEmail = 'support@infozy.tk';
    dkimSignature = INFOZY_RSA;
    domainName = 'infozy.tk';
  }
  const pass = process.env.APP_PASS;
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: pass,
    },
    dkim: {
      domainName,
      keySelector: 'mail',
      privateKey: dkimSignature,
    },
  });
  return { senderEmail, transporter, domainName };
};
