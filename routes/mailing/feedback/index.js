const express = require('express');
const transporter = require('../../../helpers/transporter');
const sendtouser = require('../../../templates/feedback/sendtouser');

const router = express.Router();

router.post('/send', (req, res) => {
  const { mailDetails } = req.body;
  const { domain } = req.body;
  if (mailDetails && domain) {
    transporterDetails = transporter(domain);
    const { transporter: mailTransporter, senderString } = transporterDetails;
    const message = {
      from: senderString,
      to: `${mailDetails.name}<${mailDetails.to}>`,
      subject: mailDetails.subject,
      html: sendtouser(mailDetails),
    };
    mailTransporter.sendMail(message, (error) => {
      if (!error) {
        res.send('sent');
      } else {
        res.send(error);
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Mail Details or Domain Details Not given',
    });
  }
});

module.exports = router;
