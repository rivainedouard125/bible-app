import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import type { Post, Comment } from '../types/community';
import { AuthorCard } from './AuthorCard';
import './Community.css';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profiles(id, username, religion, avatar_url)')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });

    if (!error && data) setComments(data as Comment[]);
    setLoading(false);
  }, [post.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody.trim() || !user) return;
    setSubmitting(true);
    setError('');

    const { error } = await supabase.from('comments').insert({
      post_id: post.id,
      user_id: user.id,
      body: commentBody.trim(),
    });

    if (error) {
      setError(error.message);
    } else {
      setCommentBody('');
      await fetchComments();
    }
    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    await supabase.from('comments').delete().eq('id', commentId);
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail-inner">
        <button
          className="glass-button"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '14px' }}
          onClick={onBack}
        >
          ← Back
        </button>

        {/* Post */}
        <div className="post-detail-card">
          <span className="post-category-tag" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {post.category}
          </span>
          <AuthorCard author={post.profiles} date={post.created_at} />
          <h1 className="post-detail-title">{post.title}</h1>
          <p className="post-detail-body">{post.body}</p>
        </div>

        {/* Comments */}
        <div className="comments-section">
          <div className="comments-title">
            {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>Loading replies…</p>
          ) : comments.length === 0 ? (
            <div className="community-empty">
              <div className="community-empty-icon">💬</div>
              <p>Be the first to reply!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                marginBottom: '0.75rem',
              }}>
                <AuthorCard author={comment.profiles} date={comment.created_at} size="sm" />
                <p style={{
                  margin: '0.5rem 0 0',
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                }}>
                  {comment.body}
                </p>
                {user?.id === comment.user_id && (
                  <button
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.78rem', cursor: 'pointer', padding: 0, marginTop: '0.5rem' }}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* New reply form */}
        {profile && (
          <form onSubmit={handleSubmitComment} style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '1.25rem',
            marginTop: '1.5rem',
          }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                Your Reply
              </span>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>}
            <textarea
              className="community-input"
              placeholder={`Share your thoughts, ${profile.username}…`}
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              rows={3}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
              <button className="community-btn" type="submit" disabled={submitting || !commentBody.trim()}>
                {submitting ? 'Posting…' : 'Post Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
