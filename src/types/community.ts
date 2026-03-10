// Shared types for the Community Forum feature

export type PostAuthor = {
  id: string;
  username: string;
  religion: string;
  avatar_url?: string;
};

export type Post = {
  id: string;
  user_id: string;
  category: string;
  title: string;
  body: string;
  flagged: boolean;
  created_at: string;
  profiles: PostAuthor; // joined from profiles table
  comment_count?: number;
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
  profiles: PostAuthor; // joined from profiles table
};

export const CATEGORIES = [
  'All',
  'General',
  'Prayer Requests',
  'Bible Study',
  'Questions',
  'Testimonies',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const RELIGION_SYMBOL: Record<string, string> = {
  Christianity: '✝',
  Islam: '☪',
  Judaism: '✡',
  Other: '☮',
};
