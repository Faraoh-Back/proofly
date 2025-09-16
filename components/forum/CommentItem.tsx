// components/forum/CommentItem.tsx
import { Comment } from '../../types/forum';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-6 transition-all duration-300">
      <div className="flex gap-4">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <img
            src={comment.author.avatarUrl}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-db-cyan/30"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Author and Date */}
          <div className="flex items-center space-x-2 mb-3">
            <h4 className="text-sm font-semibold text-white">
              {comment.author.name}
            </h4>
            <span className="text-xs text-gray-400">•</span>
            <time className="text-xs text-gray-400">
              {formatDate(comment.createdAt)}
            </time>
          </div>

          {/* Comment Content */}
          <div className="text-gray-300 text-sm leading-relaxed">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
};