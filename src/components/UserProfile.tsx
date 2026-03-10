import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

interface UserProfileProps {
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [username, setUsername] = useState(profile?.username || '');
  const [religion, setReligion] = useState(profile?.religion || '');
  const [denomination, setDenomination] = useState(profile?.denomination || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  useEffect(() => {
    // Only populate fields once on mount — do not reset on profile refreshes
    if (profile) {
      setUsername(profile.username);
      setReligion(profile.religion);
      setDenomination(profile.denomination);
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from('profiles')
      .update({ username, religion, denomination, bio, avatar_url: avatarUrl })
      .eq('id', user.id);

    if (error) {
      setMessage({ text: error.message, error: true });
    } else {
      await refreshProfile();
      setMessage({ text: 'Profile saved!', error: false });
    }
    setLoading(false);
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Please select an image file.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      setMessage({ text: 'Photo selected! Click "Save Profile" to save all changes.', error: false });
    } catch (err: any) {
      setMessage({ text: err.message, error: true });
    } finally {
      setUploading(false);
    }
  };

  const religionSymbol: Record<string, string> = {
    Christianity: '✝',
    Islam: '☪',
    Judaism: '✡',
    Other: '☮',
  };

  return (
    <div className="auth-container" style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
      {/* Back button */}
      <button
        className="glass-button"
        style={{
          position: 'fixed',
          top: '20px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 50,
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
        }}
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="auth-card" style={{ maxWidth: '540px' }}>
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
            <div className="profile-avatar-ring">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Your avatar" />
              ) : (
                <span className="profile-avatar-placeholder">👤</span>
              )}
            </div>
            {/* Religion badge at bottom of avatar */}
            {religion && (
              <div style={{
                position: 'absolute',
                bottom: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(99, 102, 241, 0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: '20px',
                padding: '2px 10px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                letterSpacing: '0.02em',
              }}>
                {religionSymbol[religion] || '☮'}
              </div>
            )}
          </div>

          <label className="auth-button-secondary">
            {uploading ? 'Uploading...' : 'Change Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <h1 className="auth-title">Your Profile</h1>
        <p className="auth-subtitle">Manage your spiritual presence in the community</p>

        {message && (
          <div className={`auth-message ${message.error ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="auth-form">
          <div>
            <label className="auth-field-label">Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Your name in the community"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="auth-field-label">Faith</label>
              <select
                className="auth-input"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                required
              >
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Judaism">Judaism</option>
                <option value="Other">Other / Seeking</option>
              </select>
            </div>

            <div>
              <label className="auth-field-label">Denomination</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Optional"
                value={denomination}
                onChange={(e) => setDenomination(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="auth-field-label">Bio</label>
            <textarea
              className="auth-input"
              placeholder="Tell the community about your faith journey…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ minHeight: '96px', resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          <button className="auth-button" type="submit" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Saving…' : 'Save Profile'}
          </button>
        </form>

        <div style={{
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button className="auth-danger-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
