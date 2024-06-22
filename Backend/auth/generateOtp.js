const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_MESSAGING_SERVICE_SID; // Ensure this matches the .env key

const client = twilio(accountSid, authToken);

// Generate a 6-digit OTP
exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS
exports.sendOTPSMS = async (phone, otp) => {
    const ph = "+91" + phone;
    console.log(`Sending OTP to ${ph} from ${serviceID}`);
    try {
        const verification = await client.verify.v2.services(serviceID)
            .verifications
            .create({
                to: ph,
                channel: 'sms'
            });
        console.log(`OTP sent successfully: ${serviceID}`);
    } catch (error) {
        console.error('Failed to send OTP:', error);
    }
}

// Example usage
if (require.main === module) {
    const phone = '9876543210'; // Replace with the recipient's phone number
    const otp = exports.generateOTP();
    exports.sendOTPSMS(phone, otp)
        .then(() => console.log('OTP sending initiated'))
        .catch(error => console.error('Error in OTP sending process:', error));
}
