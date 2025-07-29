const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your gmail address from .env
      pass: process.env.EMAIL_PASS  // your gmail app password from .env
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
