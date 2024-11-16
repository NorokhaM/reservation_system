import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [error, setError] = useState(''); // State to hold error message
  const navigate = useNavigate(); // Hook to navigate programmatically


  async function handleSignUp(e) {
    e.preventDefault();

    if (password !== repeatPass) {
      setError('Passwords do not match');
      return; // Prevent form submission if passwords don't match
    }
    
    
    const data = {
      username: name,
      email: email,
      password: password,
      role: "USER"
    }

    setError(''); // Clear error message if passwords match
    console.log("User signed up with:", data);

    try {
      const res = await fetch(`http://localhost:8080/registration`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        // Redirect to /sign-in page after successful sign-up
        navigate('/sign-in');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
    // Here you can add logic for signing up the user
  };

  return (
    <div className='sign-container'>
      <h1 className='sign-title'>Registrácia</h1>
      <form onSubmit={handleSignUp} className="sign-form">
        <input
          type="text"
          placeholder="Meno Priezvisko"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="sign-form-input"
          required
        />
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
        <input 
          type="password"
          placeholder="Zopakujte heslo"
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
          className="sign-form-input"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if passwords don't match */}
        <button 
          type="submit" 
          className="sign-button" 
          //disabled={password !== repeatPass} // Disable the button if passwords don't match
        >
          Zaregistrovať sa
        </button>
      </form>
      <div className="sign-footer">
        <p><a href="/">Zásady ochrany osobných údajov</a> | <a href="/">O nás</a></p>
      </div>
    </div>
  );
};

export default SignUp;
