const BACKEND_URL = 'https://mindease-j25b.onrender.com'; // Render backend URL
const submitButton = document.querySelector('.submit-button');
const otpVerifybutton = document.querySelector('.otp-verify-button'); 

// Function to send OTP
async function submitLogin() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && email && password) {
    try {
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
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    otpVerifybutton.disabled = true;
    otpVerifybutton.innerHTML = `<span class="loader"></span> Verifying...`;

    const response = await fetch(`${BACKEND_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();
    if (result.success) {
      alert('OTP Verified! Redirecting to Home Page...');
      window.location.href = "https://mindeaseapp.vercel.app/"; 
      localStorage.setItem('name',name);
      localStorage.setItem('email',email);
      localStorage.setItem('password',password);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
}