// app/mocks/forumMocks.ts
import { Post, User, Comment } from '../../types/forum';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=150'
  },
  {
    id: '2',
    name: 'João Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: '5',
    name: 'Carla Ferreira',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  }
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: 'c1',
    author: mockUsers[1],
    content: 'Excelente post! Muito esclarecedor sobre as melhores práticas de React.',
    createdAt: '2025-09-14T14:30:00Z'
  },
  {
    id: 'c2',
    author: mockUsers[2],
    content: 'Concordo com os pontos levantados. Implementei algumas dessas técnicas no meu projeto e funcionaram muito bem.',
    createdAt: '2025-09-14T15:15:00Z'
  },
  {
    id: 'c3',
    author: mockUsers[3],
    content: 'Poderia dar mais exemplos práticos de como implementar o useCallback?',
    createdAt: '2025-09-14T16:00:00Z'
  },
  {
    id: 'c4',
    author: mockUsers[4],
    content: 'Next.js 13 realmente trouxe muitas melhorias! O App Router é incrível.',
    createdAt: '2025-09-13T10:20:00Z'
  },
  {
    id: 'c5',
    author: mockUsers[0],
    content: 'Obrigada pelo feedback! Vou preparar um post focado no useCallback em breve.',
    createdAt: '2025-09-14T18:45:00Z'
  },
  {
    id: 'c6',
    author: mockUsers[2],
    content: 'TypeScript definitivamente vale a pena o investimento de tempo para aprender.',
    createdAt: '2025-09-12T09:30:00Z'
  }
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'Como otimizar performance em React: Técnicas avançadas',
    author: mockUsers[0],
    content: `# Como otimizar performance em React: Técnicas avançadas

## Introdução

A performance é um aspecto crucial no desenvolvimento de aplicações React, especialmente quando lidamos com aplicações complexas e com grande volume de dados. Neste post, vou compartilhar algumas técnicas avançadas que podem fazer uma diferença significativa na performance da sua aplicação.

## 1. React.memo e useCallback

O React.memo é uma técnica de otimização que evita re-renderizações desnecessárias de componentes. Funciona de forma similar ao PureComponent para componentes funcionais.

\`\`\`javascript
const MyComponent = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>;
});
\`\`\`

Já o useCallback é usado para memoizar funções:

\`\`\`javascript
const handleClick = useCallback(() => {
  // lógica do click
}, [dependency]);
\`\`\`

## 2. useMemo para cálculos custosos

O useMemo é ideal para evitar recálculos desnecessários:

\`\`\`javascript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
\`\`\`

## 3. Lazy Loading e Code Splitting

Utilize React.lazy para carregar componentes sob demanda:

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

## Conclusão

Essas técnicas, quando aplicadas corretamente, podem melhorar significativamente a performance da sua aplicação React. Lembre-se de sempre medir antes de otimizar!`,
    contentSnippet: 'Aprenda técnicas avançadas para otimizar a performance de aplicações React, incluindo React.memo, useCallback, useMemo e lazy loading.',
    tags: ['React', 'Performance', 'JavaScript', 'Otimização'],
    upvotes: 42,
    createdAt: '2025-09-14T09:00:00Z',
    comments: [mockComments[0], mockComments[1], mockComments[2], mockComments[4]]
  },
  {
    id: 'p2',
    title: 'Next.js 13: Novidades e migração do Pages Router para App Router',
    author: mockUsers[1],
    content: `# Next.js 13: Novidades e migração do Pages Router para App Router

## O que mudou no Next.js 13?

O Next.js 13 trouxe uma das maiores atualizações da história do framework, introduzindo o novo App Router que oferece uma abordagem mais moderna para roteamento e layouts.

## Principais novidades:

### 1. App Router
- Nova estrutura de pastas baseada em convenções
- Layouts aninhados
- Server Components por padrão
- Streaming e loading states

### 2. Server Components
\`\`\`javascript
// Este componente roda no servidor por padrão
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}
\`\`\`

### 3. Turbopack (Alpha)
O novo bundler da Vercel promete ser muito mais rápido que o Webpack.

## Como migrar?

1. Crie a pasta \`app/\` na raiz do projeto
2. Mova suas páginas gradualmente
3. Adapte layouts e componentes
4. Teste thoroughly

## Conclusão

O App Router representa o futuro do Next.js e vale a pena começar a migração gradualmente.`,
    contentSnippet: 'Explore as principais novidades do Next.js 13, incluindo o App Router, Server Components e dicas de migração.',
    tags: ['Next.js', 'React', 'App Router', 'Migration'],
    upvotes: 38,
    createdAt: '2025-09-13T08:15:00Z',
    comments: [mockComments[3]]
  },
  {
    id: 'p3',
    title: 'TypeScript no frontend: Vale a pena?',
    author: mockUsers[2],
    content: `# TypeScript no frontend: Vale a pena?

## Minha experiência

Depois de 2 anos usando TypeScript em projetos frontend, posso dizer com certeza: **vale muito a pena!**

## Vantagens do TypeScript

### 1. Detecção precoce de erros
O TypeScript detecta erros em tempo de compilação, evitando bugs em produção.

### 2. Melhor experiência de desenvolvimento
- Autocomplete inteligente
- Navegação de código
- Refactoring seguro

### 3. Documentação viva
Os tipos servem como documentação do código:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}
\`\`\`

## Desvantagens

- Curva de aprendizado inicial
- Overhead de configuração
- Tipos complexos podem ser confusos

## Conclusão

Para projetos médios e grandes, TypeScript é quase obrigatório. A produtividade ganha supera os custos iniciais.`,
    contentSnippet: 'Reflexões sobre usar TypeScript em projetos frontend, vantagens, desvantagens e experiências práticas.',
    tags: ['TypeScript', 'Frontend', 'JavaScript', 'Produtividade'],
    upvotes: 29,
    createdAt: '2025-09-12T14:45:00Z',
    comments: [mockComments[5]]
  },
  {
    id: 'p4',
    title: 'Gerenciamento de estado: Redux vs Zustand vs Context API',
    author: mockUsers[3],
    content: `# Gerenciamento de estado: Redux vs Zustand vs Context API

## A eterna questão

Qual ferramenta de gerenciamento de estado escolher para seu projeto React? Vamos comparar as três opções mais populares.

## Redux
**Prós:**
- Ecossistema maduro
- DevTools excelentes
- Padrões bem estabelecidos

**Contras:**
- Boilerplate excessivo
- Curva de aprendizado íngreme

## Zustand
**Prós:**
- API simples e intuitiva
- Sem boilerplate
- TypeScript-first

**Contras:**
- Ecossistema menor
- Menos recursos avançados

## Context API
**Prós:**
- Nativo do React
- Sem dependências externas

**Contras:**
- Performance pode ser problemática
- Limitado para casos complexos

## Minha recomendação

- **Projetos pequenos:** Context API
- **Projetos médios:** Zustand
- **Projetos grandes/complexos:** Redux Toolkit`,
    contentSnippet: 'Comparação detalhada entre Redux, Zustand e Context API para gerenciamento de estado em React.',
    tags: ['React', 'Redux', 'Zustand', 'Estado', 'Context API'],
    upvotes: 51,
    createdAt: '2025-09-11T16:20:00Z',
    comments: []
  },
  {
    id: 'p5',
    title: 'CSS-in-JS vs Tailwind CSS: Minha experiência prática',
    author: mockUsers[4],
    content: `# CSS-in-JS vs Tailwind CSS: Minha experiência prática

## O contexto

Nos últimos 3 anos, trabalhei com diferentes abordagens de estilização: Styled Components, Emotion e Tailwind CSS. Aqui está minha experiência.

## CSS-in-JS (Styled Components)

### Vantagens:
- Escopo automático
- Props dinâmicas
- Temas consistentes

### Desvantagens:
- Runtime overhead
- Bundle size maior
- Debugging mais complexo

## Tailwind CSS

### Vantagens:
- Performance excelente
- Design system consistente
- Produtividade alta após dominar

### Desvantagens:
- HTML "poluído"
- Curva de aprendizado inicial
- Customizações complexas podem ser trabalhosas

## Minha escolha atual

Hoje prefiro **Tailwind CSS** para a maioria dos projetos. A produtividade e performance superam os pontos negativos.

Para casos específicos onde preciso de lógica CSS complexa, uso CSS Modules.`,
    contentSnippet: 'Comparação prática entre CSS-in-JS e Tailwind CSS com base em experiência real de desenvolvimento.',
    tags: ['CSS', 'Tailwind', 'Styled Components', 'Performance'],
    upvotes: 33,
    createdAt: '2025-09-10T11:30:00Z',
    comments: []
  }
];

// Função para buscar posts (simula API)
export const getPosts = (): Post[] => {
  return mockPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Função para buscar um post específico
export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

// Função para buscar posts por tag
export const getPostsByTag = (tag: string): Post[] => {
  return mockPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
  );
};