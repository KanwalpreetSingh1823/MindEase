const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Allow requests from specific origins
const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:5501',
  'https://mind-ease-react-app.vercel.app/',
  'https://mind-ease-react-app.vercel.app/login',
  'https://mindeaseapp.vercel.app',
  'https://frontend-login-form-13rkjh9z0-kanwalpreets17-gmailcoms-projects.vercel.app'
];

// Set up CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      console.error('CORS error: Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTPs temporarily
const otps = {};

// Send OTP API
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = generateOTP();
  otps[email] = { otp, timestamp: Date.now() };

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for the sender's email
    to: email,
    subject: 'Welcome to MindEase. Your OTP for Login',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    }
  });
});

// Verify OTP API
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  const storedData = otps[email];

  if (!storedData) {
    return res.status(400).json({ success: false, message: 'OTP not found or expired' });
  }

  const { otp: storedOtp, timestamp } = storedData;
  const currentTime = Date.now();

  // Check if OTP has expired (set to 5 minutes)
  if (currentTime > timestamp + 5 * 60 * 1000) {
    delete otps[email]; // OTP expired, delete it
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  // Verify the OTP
  if (storedOtp === otp) {
    delete otps[email]; // OTP is valid, delete it
    res.status(200).json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
