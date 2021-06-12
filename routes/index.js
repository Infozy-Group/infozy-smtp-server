const express = require('express');
const transporter = require('../helpers/transporter');
const template = require('../templates/feedback/sendtouser');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is Infozy SMTP Server');
});

router.get('/sendmail', (req, res) => {
  transporterDetails = transporter('shaaan');
  const { transporter: mailTransporter, senderEmail } = transporterDetails;
  mailTransporter.sendMail(
    {
      from: senderEmail,
      to: 'tksudharshan@gmail.com',
      subject: 'This is a test email',
      html: template,
    },
    (error) => {
      if (!error) {
        console.log('sent');
      } else {
        console.log(error);
      }
    },
  );
});

module.exports = router;
