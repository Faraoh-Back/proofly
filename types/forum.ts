// types/forum.ts

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string; // ISO 8601 format
}

export interface Post {
  id: string;
  title: string;
  author: User;
  content: string; // O conteúdo completo do post em markdown ou texto
  contentSnippet: string; // Um resumo curto para a lista
  tags: string[];
  upvotes: number;
  createdAt: string; // ISO 8601 format
  comments: Comment[];
}