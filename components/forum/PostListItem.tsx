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
      className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-cyan-500 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
        <div className="flex gap-4">
          {/* Votes Section */}
          <div className="flex flex-col items-center min-w-[60px]">
            <div className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" 
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
              <span className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {formatUpvotes(post.upvotes)}
              </span>
              <span className="text-xs text-gray-400">votos</span>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-tight">
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
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/30 text-cyan-300 border border-cyan-700/50"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-400 border border-gray-600">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>

            {/* Footer with Author, Date, and Comments */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
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