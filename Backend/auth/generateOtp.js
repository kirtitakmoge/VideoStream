const twilio = require('twilio');
const dotenv = require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.generateOTP=()=> {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

exports.sendOTPSMS=(phone, otp)=>{
const ph="+91"+phone;
    return client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to:ph
    });
}
