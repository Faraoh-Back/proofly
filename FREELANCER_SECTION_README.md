# Seção de Freelancer - Proofly

Esta documentação descreve a implementação da Seção de Freelancer para o perfil de desenvolvedor na plataforma Proofly.

## Estrutura de Arquivos

```
types/
├── freelancer.ts           # Interfaces TypeScript

mocks/
├── freelanceData.ts        # Dados mocados para demonstração

components/
├── profile/
│   ├── FreelancerSection.tsx     # Componente principal
│   └── DeveloperProfilePage.tsx  # Exemplo de uso
└── freelancer/
    ├── AvailabilityCard.tsx      # Card de disponibilidade
    ├── ServicesOffered.tsx       # Lista de serviços
    ├── Portfolio.tsx             # Grid de projetos
    ├── ProjectCard.tsx           # Card individual de projeto
    ├── Testimonials.tsx          # Grid de depoimentos
    ├── TestimonialCard.tsx       # Card individual de depoimento
    └── index.ts                  # Exportações organizadas
```

## Tipos Implementados

### `FreelanceProfile`
Interface principal que define todo o perfil de freelancer:
- `availabilityStatus`: Status de disponibilidade ('Open to Work' | 'Booked' | 'Not Available')
- `hourlyRate`: Taxa por hora (opcional)
- `services`: Array de serviços oferecidos
- `portfolio`: Array de projetos em destaque
- `testimonials`: Array de depoimentos de clientes

### `FreelanceService`
Define um serviço oferecido pelo freelancer:
- `id`: Identificador único
- `title`: Nome do serviço
- `description`: Descrição detalhada

### `PortfolioProject`
Define um projeto do portfólio:
- `id`: Identificador único
- `title`: Nome do projeto
- `description`: Descrição do projeto
- `imageUrl`: URL da imagem de capa
- `projectUrl`: Link para o projeto
- `relatedBadges`: Array de badges relacionados ao projeto

### `ClientTestimonial`
Define um depoimento de cliente:
- `id`: Identificador único
- `clientName`: Nome do cliente
- `clientAvatarUrl`: URL do avatar do cliente
- `clientCompany`: Empresa do cliente
- `testimonial`: Texto do depoimento

## Componentes

### `FreelancerSection`
Componente principal que organiza toda a seção em um layout responsivo:
- Grid de 2 colunas no topo (Disponibilidade + Serviços)
- Portfólio em largura total
- Depoimentos em largura total

### `AvailabilityCard`
Card de destaque mostrando:
- Status visual com indicador colorido
- Taxa por hora (se disponível)
- Botão de ação contextual
- Estatísticas de resposta e projetos

### `ServicesOffered`
Lista os serviços com:
- Ícones contextuais automáticos
- Hover effects
- Contador de serviços

### `Portfolio`
Grid responsivo de projetos com:
- Cards de projeto individuais
- Estatísticas consolidadas
- Botão para ver todos os projetos

### `ProjectCard`
Card individual de projeto com:
- Imagem de capa com overlay hover
- Badges relacionados com tooltip
- Links para o projeto
- Indicador de status

### `Testimonials`
Grid de depoimentos com:
- Cards de depoimentos individuais
- Estatísticas de satisfação
- Call-to-action

### `TestimonialCard`
Card individual de depoimento com:
- Avatar do cliente
- Texto do depoimento formatado
- Informações da empresa
- Avaliação com estrelas

## Design System

### Cores
- Background: `bg-db-dark-blue`
- Cards: `bg-white/5` com `backdrop-blur-md`
- Bordas: `border-db-cyan/20`
- Accent: `text-db-cyan`
- Text: `text-white` e `text-gray-400`

### Efeitos
- Glassmorphism nos cards
- Hover effects com scale e cores
- Animações suaves de transição
- Indicadores visuais de status

### Responsividade
- Grid adaptativo (1 coluna em mobile, 2+ em desktop)
- Imagens responsivas com Next.js Image
- Texto truncado onde necessário

## Como Usar

```tsx
import { FreelancerSection } from '../components/profile/FreelancerSection';
import { mockFreelanceProfile } from '../mocks/freelanceData';

function DeveloperProfile() {
  return (
    <div className="min-h-screen bg-db-dark-blue">
      <FreelancerSection profile={mockFreelanceProfile} />
    </div>
  );
}
```

## Dados Mocados

O arquivo `freelanceData.ts` contém dados realistas incluindo:
- 4 serviços de Web3/blockchain
- 3 projetos de portfólio com badges reais
- 2 depoimentos de clientes fictícios
- Imagens do Unsplash para projetos
- SVGs reais para badges

## Recursos Especiais

1. **Badges 3D**: Integração com o sistema de badges existente da plataforma
2. **Tooltips**: Descrições detalhadas nos badges
3. **Links Externos**: Projetos linkam para repositórios/demos
4. **Estatísticas**: Métricas de performance agregadas
5. **Estados Visuais**: Indicadores de status dinâmicos

## Próximos Passos

1. Integração com dados reais da API
2. Formulários de edição do perfil
3. Sistema de avaliações dinâmico
4. Chat/mensagens diretas
5. Filtros de busca por serviços