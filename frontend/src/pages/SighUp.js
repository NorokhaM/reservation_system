import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("User signed in with:", { name, email, password, repeatPass });
    
    // Здесь можно добавить логику для авторизации
  };
  
  return (
    <div className='sign-container'>
      <h1 className='sign-title'>Registrácia</h1>
      <form onSubmit={handleSignUp} className="sign-form">
      <input
          type="text"
          placeholder="Meno Priezvesko"
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
        <button className="sign-button">Zaregistrovať sa</button>
      </form>
      <div className="sign-footer">
        <p><a href="/">Zásady ochrany osobných údajov</a> | <a href="/">O nás</a></p>
      </div>
    </div>
  );
};

export default SignUp;
