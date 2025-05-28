import axios from 'axios';

const Otp = async () => {
    try {
        // Make sure the API endpoint and your parameters are correct.
        const response = await axios.post(
            'https://www.fast2sms.com/dev/bulkV2', // Confirm if this is the correct API endpoint
            {
                route: 'q', // Ensure 'q' is the correct route type for your use case
                message: 'Hello Sahista',
                schedule_time: '', // Provide a valid timestamp if you're scheduling the SMS
                flash: 0, // Flash messages are generally 1 or 0. If you don't need it, set it to 0
                numbers: '919409205913' // Ensure that the phone number is in the correct format
            },
            {
                headers: {
                    Authorization: 'PAe3JTpSWwDcXb4NAqJ2kNs9XRYgfDXM2ut0YsYkPyk6XEFVfPdf1GvM8ImU', // Your actual API key
                    'Content-Type': 'application/json' // Ensure that content type is correctly set to JSON
                }
            }
        );

        // Log the response from the API to understand the result.
        console.log('SMS Sent:', response.data);
    } catch (error) {
        // If an error occurs, log it for debugging.
        console.error('Error sending SMS:', error);
    }
};
export default Otp;