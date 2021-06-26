const nodemailer = require('nodemailer');

const INFOZY_RSA = process.env.RSA_INFOZY;
const SHAAAN_RSA = process.env.RSA_SHAAAN;

module.exports = (domain) => {
  let senderEmail;
  let dkimSignature;
  let domainName;
  let senderString;
  if (domain) {
    if (domain === 'infozy.tk') {
      senderEmail = 'support@infozy.tk';
      senderString = `Infozy - Support<${senderEmail}>`;
      dkimSignature = INFOZY_RSA;
      domainName = domain;
    } else if (domain === 'shaaan.tk') {
      senderEmail = 'support@shaaan.tk';
      senderString = `Shan.tk - Support<${senderEmail}>`;
      dkimSignature = SHAAAN_RSA;
      domainName = domain;
    } else {
      senderEmail = 'support@infozy.tk';
      senderString = `Infozy - Support<${senderEmail}>`;
      dkimSignature = INFOZY_RSA;
      domainName = 'infozy.tk';
    }
  } else {
    senderEmail = 'support@infozy.tk';
    senderString = `Infozy - Support<${senderEmail}>`;
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
  return { senderEmail, senderString, transporter, domainName };
};
