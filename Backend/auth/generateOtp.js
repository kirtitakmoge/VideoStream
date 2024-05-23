const twilio = require('twilio');
const dotenv = require('dotenv');
const result = dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const ph="+91 99529 92987"
exports.generateOTP=()=> {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

exports.sendOTPSMS=(phone, otp)=>{
    return client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to:ph
    });
}
