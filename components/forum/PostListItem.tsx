// components/forum/PostListItem.tsx
'use client';

import { Post } from '../../types/forum';

interface PostListItemProps {
  post: Post;
  onPostClick?: (postId: string) => void;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post, onPostClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatUpvotes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(post.id);
    }
  };

  return (
    <article 
      className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-6">
        {/* Votes Section */}
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-db-blue-dark/30 border border-db-blue-light/10">
            <svg 
              className="w-6 h-6 text-db-cyan" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 15l7-7 7 7" 
              />
            </svg>
            <span className="text-xl font-bold text-white">
              {formatUpvotes(post.upvotes)}
            </span>
            <span className="text-xs text-gray-400">votos</span>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h2 className="text-xl font-semibold text-white mb-3 hover:text-db-cyan transition-colors leading-tight">
            {post.title}
          </h2>

          {/* Content Snippet */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
            {post.contentSnippet}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-db-blue-dark/40 text-db-cyan border border-db-blue-light/20"
              >
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-db-blue-light/10">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>

            {/* Footer with Author, Date, and Comments */}
            <div className="flex items-center justify-between pt-4 border-t border-db-blue-light/10">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-db-cyan/30"
                />
                <div>
                  <p className="text-sm font-medium text-white">{post.author.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-gray-400">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
                <span className="text-sm">
                  {post.comments.length} {post.comments.length === 1 ? 'comentário' : 'comentários'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
  );
};