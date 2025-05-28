import axios from 'axios';

const SMSDemo = async () => {
  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: 'Hello, this is a test message',
        schedule_time: '', // Add a valid timestamp if needed
        flash: 0,
        numbers: '919409205913' // Replace with the recipient's number
      },
      {
        headers: {
          Authorization: 'Your_API_Key_Here', // Replace with your actual Fast2SMS API key
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('SMS Sent:', response.data);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export default SMSDemo;
