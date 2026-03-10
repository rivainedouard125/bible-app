import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import type { Post, Category } from '../types/community';
import { CATEGORIES, RELIGION_SYMBOL } from '../types/community';
import { PostDetail } from './PostDetail';
import { NewPostModal } from './NewPostModal';
import './Community.css';

interface CommunityPageProps {
  onBack: () => void;
}

const PostCard: React.FC<{ post: Post; onClick: () => void }> = ({ post, onClick }) => {
  const author = post.profiles;
  const excerpt = post.body.length > 160 ? post.body.slice(0, 160) + '…' : post.body;
  const date = new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-card-header">
        <span className="post-category-tag">{post.category}</span>
      </div>
      <h3 className="post-card-title">{post.title}</h3>
      <p className="post-card-excerpt">{excerpt}</p>
      <div className="post-card-footer">
        <div className="post-author-mini">
          <div className="post-avatar-mini">
            {author.avatar_url ? (
              <img src={author.avatar_url} alt={author.username} />
            ) : (
              <span>👤</span>
            )}
          </div>
          <span>
            <strong>{author.username}</strong>
            {author.religion && (
              <span style={{ marginLeft: 4, opacity: 0.7 }}>
                {RELIGION_SYMBOL[author.religion] || '☮'}
              </span>
            )}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>💬 {post.comment_count ?? 0}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export const CommunityPage: React.FC<CommunityPageProps> = ({ onBack }) => {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles(id, username, religion, avatar_url),
        comment_count:comments(count)
      `)
      .order('created_at', { ascending: false });

    if (activeCategory !== 'All') {
      query = query.eq('category', activeCategory);
    }

    const { data, error } = await query;

    if (!error && data) {
      // Normalize the comment_count from Supabase aggregate
      const normalized = data.map((p: any) => ({
        ...p,
        comment_count: p.comment_count?.[0]?.count ?? 0,
      }));
      setPosts(normalized as Post[]);
    }
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Show individual post detail
  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => {
          setSelectedPost(null);
          fetchPosts(); // refresh comment counts on return
        }}
      />
    );
  }

  return (
    <div className="community-page">
      {/* Shared navbar placeholder */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 2rem',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--surface-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <button
          className="glass-button"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}
          onClick={onBack}
        >
          ← Bible
        </button>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Community</h2>
      </div>

      <div className="community-inner">
        {/* Header */}
        <div className="community-header">
          <div>
            <h1 className="community-title">Faith Forum</h1>
            <p className="community-subtitle">A place for brothers and sisters of all faiths</p>
          </div>
          {profile && (
            <button
              className="community-btn"
              onClick={() => setShowNewPost(true)}
            >
              + New Post
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="community-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`community-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat as Category)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts List */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
            Loading posts…
          </p>
        ) : posts.length === 0 ? (
          <div className="community-empty">
            <div className="community-empty-icon">✨</div>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No posts yet in this category</p>
            <p>Be the first to start a conversation!</p>
            {profile && (
              <button
                className="community-btn"
                style={{ marginTop: '1rem' }}
                onClick={() => setShowNewPost(true)}
              >
                + New Post
              </button>
            )}
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))
        )}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <NewPostModal
          onClose={() => setShowNewPost(false)}
          onCreated={() => {
            setShowNewPost(false);
            fetchPosts();
          }}
        />
      )}
    </div>
  );
};
