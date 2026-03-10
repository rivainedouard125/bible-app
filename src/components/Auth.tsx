import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate PIN
    if (!/^\d{4}$/.test(password)) {
      setMessage({ text: 'Please enter exactly a 4-digit PIN (numbers only).', error: true });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Supabase requires 6 chars by default, so we pad the 4 digit pin slightly behind the scenes
    const paddedPin = `${password}00`;

    const { error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password: paddedPin })
      : await supabase.auth.signUp({ email, password: paddedPin });

    if (error) {
      // If the error mentions the padded password, clean it up for the user
      const cleanErrorMsg = error.message.replace('Password should be at least 6 characters', 'Invalid PIN format');
      setMessage({ text: cleanErrorMsg, error: true });
    } else if (!isLogin) {
      setMessage({ text: 'Success! (If Supabase requires email confirmation, check your inbox).', error: false });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">The Holy Bible App</h1>
        <p className="auth-subtitle">{isLogin ? 'Welcome back, faithful' : 'Join the global spiritual hub'}</p>
        
        {message && (
          <div className={`auth-message ${message.error ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="text"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            placeholder="4-Digit PIN"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))} // only allow numbers
          />
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <p className="auth-footer">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up here' : 'Log in here'}
          </button>
        </p>
      </div>
    </div>
  );
};
