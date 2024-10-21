const BACKEND_URL = 'https://backend-login-form.onrender.com'; // Use Render backend URL
const submitButton = document.querySelector('.submit-button'); // Button element

// Function to send OTP
async function submitLogin() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && email && password) {
    try {
       // Disable the button and show a loader
       submitButton.disabled = true;
       submitButton.innerHTML = `<span class="loader"></span> Sending...`;

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
    finally {
      // Re-enable the button and restore text
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit';
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
    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="loader"></span> Verifying...`;

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