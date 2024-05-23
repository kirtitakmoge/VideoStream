// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // replace with your email
    pass: process.env.EMAIL_PASS   // replace with your email password or app password if 2FA is enabled
  }
});

// Function to send welcome email
const sendWelcomeEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // replace with your email
    to: to,
    subject: 'Welcome to Surgi-Com',
    text: 'Welcome to SurgiCom!',
    html: '<h1>Welcome to SurgiCom!</h1>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendWelcomeEmail;
