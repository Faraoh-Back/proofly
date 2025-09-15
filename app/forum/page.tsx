// app/forum/page.tsx
import { PostListItem } from '../../components/forum/PostListItem';
import { getPosts } from '../mocks/forumMocks';
import { Post } from '../../types/forum';

export default function ForumPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Comunidade</h1>
          <p className="text-gray-400 text-lg">
            Compartilhe conhecimento e tire suas dúvidas com a comunidade de desenvolvedores
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Fórum | Proofly',
  description: 'Compartilhe conhecimento e tire suas dúvidas com a comunidade de desenvolvedores.',
};