import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export const ProfileSetup: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [religion, setReligion] = useState('');
  const [denomination, setDenomination] = useState('');
  const [error, setError] = useState('');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: user.id, 
          username, 
          religion, 
          denomination 
        }
      ]);

    if (submitError) {
      console.error(submitError);
      setError(submitError.message);
      setLoading(false);
    } else {
      await refreshProfile();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Complete Your Profile</h1>
        <p className="auth-subtitle">Join the community to share and grow in faith</p>

        {error && (
          <div className="auth-message error">
            {error}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Username (e.g., Brother John)"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <select 
            className="auth-input"
            value={religion} 
            onChange={(e) => setReligion(e.target.value)}
            required
          >
            <option value="" disabled>Select your faith</option>
            <option value="Christianity">Christianity</option>
            <option value="Islam">Islam</option>
            <option value="Judaism">Judaism</option>
            <option value="Other">Other / Seeking</option>
          </select>

          <input
            className="auth-input"
            type="text"
            placeholder="Denomination (e.g., Catholic, Sunni, Optional)"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Enter Community'}
          </button>
        </form>
      </div>
    </div>
  );
};
