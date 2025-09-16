// components/ui/ForumPage/ForumPage.tsx
'use client';

import { useState } from 'react';
import { PostListItem } from '../../forum/PostListItem';
import { PostDetailPage } from '../PostDetailPage';
import { getPosts } from '../../../app/mocks/forumMocks';
import { Post } from '../../../types/forum';

export const ForumPage: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const posts = getPosts();

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
  };

  // If a post is selected, show the detail page
  if (selectedPostId) {
    return (
      <PostDetailPage 
        postId={selectedPostId} 
        backUrl="#" 
        onBack={handleBackToList}
      />
    );
  }

  // Otherwise, show the forum list
  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-db-dark-blue">
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-wider mb-2">COMUNIDADE</h1>
          <p className="text-gray-300">
            Compartilhe conhecimento e tire suas dúvidas com a comunidade de desenvolvedores
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <PostListItem 
              key={post.id} 
              post={post} 
              onPostClick={handlePostClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};