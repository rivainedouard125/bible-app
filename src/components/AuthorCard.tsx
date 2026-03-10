import React from 'react';
import type { PostAuthor } from '../types/community';
import { RELIGION_SYMBOL } from '../types/community';

interface AuthorCardProps {
  author: PostAuthor;
  date: string;
  size?: 'sm' | 'md';
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, date, size = 'md' }) => {
  const avatarSize = size === 'sm' ? 28 : 38;
  const fontSize = size === 'sm' ? 14 : 18;

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="author-card">
      <div className="author-avatar" style={{ width: avatarSize, height: avatarSize }}>
        <div className="author-avatar-inner" style={{ width: avatarSize, height: avatarSize }}>
          {author.avatar_url ? (
            <img src={author.avatar_url} alt={author.username} />
          ) : (
            <span style={{ fontSize }}>👤</span>
          )}
        </div>
        {author.religion && (
          <div className="author-religion-badge">
            {RELIGION_SYMBOL[author.religion] || '☮'}
          </div>
        )}
      </div>
      <div>
        <div className="author-name">{author.username}</div>
        <div className="author-meta">{author.religion} · {formattedDate}</div>
      </div>
    </div>
  );
};
