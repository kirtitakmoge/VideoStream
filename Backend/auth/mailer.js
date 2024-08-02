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
const sendWelcomeEmail = async (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // replace with your email
    to: to,
    subject: 'Welcome to Surgi-Com',
    text: 'Welcome to SurgiCom!',
    html: '<h1>Welcome to SurgiCom!</h1>'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true; // Indicate that the email was sent successfully
  } catch (error) {
    console.error('Error sending email:', error);
    return false; // Indicate that there was an error sending the email
  }
};

// Function to send password reset email
const sendPasswordResetEmail = async (email, token, role) => {
  const resetLink = `${process.env.FRONTEND_URL}/${role}/reset-password/${token}`;
  console.log(resetLink, "link");

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    html: `<p>From <strong>Surgi-cloud</strong>,</p>
      <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: ' + email);
    return true; // Indicate that the email was sent successfully
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false; // Indicate that there was an error sending the email
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail
};
