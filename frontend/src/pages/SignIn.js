import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically


  async function handleSignIn(e) {
    e.preventDefault();
    
    const data = {
      email: email,
      password: password,
      role: "USER"
    }

    setError(''); // Clear error message if passwords match
    console.log("User signed up with:", data);

    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const json = await res.text();
        console.log(json)
        localStorage.setItem("token", json)
        // Redirect to /sign-in page after successful sign-up
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
    // Here you can add logic for signing up the user
  };

  return (
    <div className="sign-container">
      <h2 className="sign-title">Prihlásenie</h2>
      <form onSubmit={handleSignIn} className="sign-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-form-input"
          required
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-form-input"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if passwords don't match */}
        <button type="submit" className="sign-button">Prihlásiť sa</button>
        <button type="button" className="sign-button petrzalka">
          <img className="sign-form-petrzalka-logo" alt="petrzalka logo" src="data:image/png;base64,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" />
          Petrzalka Konto
        </button>
        <a href="/" className="sign-form-forgot">Zabudli ste heslo?</a>
      </form>
      {/* <div className="footer">
        <p><a href="/">Политика конфиденциальности</a> | <a href="/">О нас</a></p>
      </div> */}
    </div>
  );
};

export default SignIn ;
