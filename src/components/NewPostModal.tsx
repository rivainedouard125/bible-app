import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES } from '../types/community';
import './Community.css';

interface NewPostModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({ onClose, onCreated }) => {
  const { user } = useAuth();
  const [category, setCategory] = useState('General');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !user) return;
    setSubmitting(true);
    setError('');

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      category,
      title: title.trim(),
      body: body.trim(),
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
    } else {
      onCreated();
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        <h2 className="modal-title">New Post</h2>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <select
            className="modal-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            className="community-input"
            type="text"
            placeholder="Post title…"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={120}
            required
          />

          <textarea
            className="community-input"
            placeholder="Share your thoughts, reflections, or questions…"
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={6}
            required
          />

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" className="community-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="community-btn"
              disabled={submitting || !title.trim() || !body.trim()}
            >
              {submitting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
