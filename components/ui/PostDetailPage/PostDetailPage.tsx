// components/ui/PostDetailPage/PostDetailPage.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CommentItem } from '../../forum/CommentItem';
import { getPostById } from '../../../app/mocks/forumMocks';
import { Comment, Post } from '../../../types/forum';

interface PostDetailPageProps {
  postId: string;
  backUrl?: string;
  onBack?: () => void;
}

export const PostDetailPage: React.FC<PostDetailPageProps> = ({ 
  postId, 
  backUrl = '/forum',
  onBack
}) => {
  const post = getPostById(postId);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post não encontrado</h1>
          {onBack ? (
            <button
              onClick={onBack}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Voltar para a comunidade
            </button>
          ) : (
            <Link 
              href={backUrl}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Voltar para a comunidade
            </Link>
          )}
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
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

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-white">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-gray-100">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-200">{line.slice(4)}</h3>;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-4 text-gray-300 leading-relaxed">{line}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Voltar para a comunidade
            </button>
          ) : (
            <Link 
              href={backUrl}
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Voltar para a comunidade
            </Link>
          )}
        </div>

        {/* Post Section */}
        <article className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
              />
              <div>
                <h3 className="font-semibold text-white">{post.author.name}</h3>
                <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            
            {/* Upvotes */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors">
                <svg 
                  className="w-5 h-5" 
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
                <span className="font-medium">{formatUpvotes(post.upvotes)}</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-900/30 text-cyan-300 border border-cyan-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Comentários ({post.comments.length})
          </h2>

          {/* Add Comment Form */}
          <div className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">Adicionar um comentário</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
              rows={4}
            />
            <button
              className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              disabled={!newComment.trim()}
            >
              Comentar
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment: Comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="text-center py-12">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-600" 
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
                <h3 className="mt-2 text-lg font-medium text-white">
                  Ainda não há comentários
                </h3>
                <p className="mt-1 text-gray-400">
                  Seja o primeiro a comentar neste post!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};