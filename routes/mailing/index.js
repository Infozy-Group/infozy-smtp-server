const express = require('express');
const transporter = require('../../helpers/transporter');

const router = express.Router();

router.post('/send', (req, res) => {
  transporterDetails = transporter('shaaan');
  const { transporter: mailTransporter, senderEmail } = transporterDetails;
  mailTransporter.sendMail(
    {
      from: senderEmail,
      to: 'tksudharshan@gmail.com',
      subject: 'This is a test email',
      html: '<b>Super cool this is balu</b>',
    },
    (error) => {
      if (!error) {
        res.send(sent);
      } else {
        res.send(error);
      }
    },
  );
});

module.exports = router;
