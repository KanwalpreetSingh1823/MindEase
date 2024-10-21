const BACKEND_URL = 'https://backend-login-form.onrender.com'; // Use Render backend URL

// Function to send OTP
async function submitLogin() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && email && password) {
    try {
      const response = await fetch(`${BACKEND_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.success) {
        alert(`OTP sent to ${email}`);
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('otp-form').classList.remove('hidden');
      } else {
        alert('Error sending OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  } else {
    alert('Please fill all fields!');
  }
}

// Function to verify OTP
async function verifyOTP() {
  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;

  try {
    const response = await fetch(`${BACKEND_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();
    if (result.success) {
      alert('OTP Verified! Redirecting to Home Page...');
      window.location.href = "https://mindeaseapp.vercel.app/"; // Replace with your home page URL
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
}