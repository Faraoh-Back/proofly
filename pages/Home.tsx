import React from 'react';
import Head from 'next/head';
// Usaremos os mesmos ícones da lucide-react, pois são modernos e compatíveis
// Linha corrigida
import ParticlesBackground from './ParticlesBackground'; // NOVO: Importe o componente
import { ArrowRight, Trophy, ShieldCheck, Briefcase, User, Building2, Code } from 'lucide-react';

// Seus imports de Supabase e Pricing (mantidos)
import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import { getProducts, getSubscription, getUser } from '@/utils/supabase/queries';

// // A lógica da página de preços foi mantida conforme o original
// async function PricingPage() {
//   const supabase = createClient();
//   const [user, products, subscription] = await Promise.all([
//     getUser(supabase),
//     getProducts(supabase),
//     getSubscription(supabase)
//   ]);

//   return (
//     <Pricing
//       user={user}
//       products={products ?? []}
//       subscription={subscription}
//     />
//   );
// }


const partners = [
  { name: 'Baerfa', logo: '/path-to-your-logos/baerfa.png' },
  { name: 'Optiv', logo: '/path-to-your-logos/optiv.png' },
  { name: 'Mobia', logo: '/path-to-your-logos/mobia.png' },
  { name: 'Evansion', logo: '/path-to-your-logos/evansion.png' },
  { name: 'Inspira', logo: '/path-to-your-logos/inspira.png' },
  { name: 'KPMG', logo: '/path-to-your-logos/kpmg.png' },
  { name: 'EY', logo: '/path-to-your-logos/ey.png' },
  { name: 'Surepoint', logo: '/path-to-your-logos/surepoint.png' },
];

// Componente reutilizável para a seção de features (cores atualizadas)
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-6 text-left transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-db-blue-dark/20 text-db-cyan w-14 h-14 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// NOVO: Componente para o placeholder animado (replicando o estilo dos StatCards originais)
const AnimatedLogoPlaceholder = ({ label, description }: { label: string; description: string }) => (
  <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-db-cyan/30 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300 animate-pulse-slow">
    <div className="w-24 h-24 bg-gradient-to-br from-db-cyan to-db-blue-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        {/* Placeholder para a logo real, ou um ícone animado */}
        <Code size={48} className="text-db-dark-blue" /> 
    </div>
    <p className="text-2xl lg:text-3xl font-bold text-db-cyan">{label}</p>
    <p className="text-sm text-gray-300 mt-1">{description}</p>
  </div>
);


export default function Home() {
  return (
    <>
      

      {/* ALTERADO: Fundo principal para azul escuro do databahn.ai */}
       <div className="relative min-h-screen text-white font-sans overflow-x-hidden"> {/* ALTERADO: font-sans para Inter */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <ParticlesBackground />
        </div>
        <div className="relative z-10"> 
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 z-10">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
              <div className="text-2xl font-bold tracking-wider">PROOFLY</div>
              <div className="hidden md:flex items-center space-x-8">
                {/* ALTERADO: Cor do hover dos links para ciano */}
                <a href="#" className="hover:text-db-cyan transition-colors">Hackathons</a>
                <a href="#" className="hover:text-db-cyan transition-colors">Talent</a>
                <a href="#" className="hover:text-db-cyan transition-colors">Community</a>
              </div>
              {/* ALTERADO: Botão "Launch App" com cores do databahn.ai */}
              <a href="#" className="bg-db-blue-dark hover:bg-db-blue-light text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Launch App
              </a>
            </nav>
          </header>

          <main>
            {/* Hero Section Repaginada */}
            <section className="relative min-h-screen flex items-center">
              {/* Efeito de fundo sutil */}
              <div 
                className="absolute inset-0 bg-no-repeat bg-cover bg-right opacity-40" 
                style={{ backgroundImage: "url('https://www.databahn.ai/wp-content/uploads/2023/11/bg-e1700813337946.png')" }}
              ></div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-db-dark-blue to-transparent z-0"></div>
              <div className="absolute inset-0 bg-db-dark-blue/50 z-0"></div> {/* ALTERADO: overlay para a cor de fundo */}

              <div className="container mx-auto px-6 z-10 relative text-center md:text-left">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Lado Esquerdo: A NOVA MENSAGEM */}
                  <div className="max-w-xl md:ml-16 md:-mt-20">
                    {/* ALTERADO: Cor da tag para ciano */}
                    <span className="text-sm font-bold tracking-widest text-db-cyan uppercase">
                      The Future of Web3 Careers
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold my-4 leading-tight">
                      Forge Your 
                      <br />
                      {/* ALTERADO: Gradiente de texto para ciano/azul claro */}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-db-cyan to-db-blue-light">
                        On-Chain Reputation
                      </span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                      Build a verifiable professional identity with Soulbound NFTs earned in hackathons. Connect with top-tier companies looking for proven talent. The proof is on-chain.
                    </p>
                    {/* ALTERADO: Dois botões de CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#" className="inline-flex items-center bg-db-cyan hover:bg-db-blue-light text-db-dark-blue font-bold py-3 px-8 rounded-lg transition-colors duration-300 group">
                        <User className="mr-2 h-5 w-5" /> Build Your Profile (User)
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="#" className="inline-flex items-center bg-transparent border border-gray-500 hover:bg-db-blue-dark hover:border-db-blue-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 group">
                        <Building2 className="mr-2 h-5 w-5" /> Hire Talent (Company)
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* ALTERADO: Lado Direito agora com o AnimatedLogoPlaceholder */}
                  <div className="relative flex items-center justify-center h-full">
                      <AnimatedLogoPlaceholder 
                          label="Proofly" 
                          description="Your On-Chain Identity" 
                      />
                  </div>
                </div>
              </div>
            </section>

            {/* Seção "The Proofly Ecosystem" (cores e ícones atualizados) */}
            <section className="py-24 bg-db-dark-blue text-center">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Proofly Ecosystem</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                  An integrated platform designed to validate skills, foster growth, and connect talent with opportunity.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon={<Trophy size={28} />}
                    title="Prove Your Skills in Hackathons"
                    description="Compete in challenges hosted by leading Web3 companies. Win prizes and earn non-transferable NFT badges that verify your achievements forever."
                  />
                  <FeatureCard 
                    icon={<ShieldCheck size={28} />}
                    title="Build Verifiable Reputation"
                    description="Your profile aggregates all your on-chain credentials. Showcase a portable, tamper-proof history of your skills and contributions."
                  />
                  <FeatureCard 
                    icon={<Briefcase size={28} />}
                    title="Access Exclusive Opportunities"
                    description="Get noticed by companies that value proven talent. Our marketplace connects you directly with roles that match your verified skill set."
                  />
                </div>
              </div>
            </section>

            {/* Seção "Trusted By" Mantida (cor de fundo atualizada) */}
            <section className="py-16 bg-db-dark-blue">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-gray-400 text-sm font-bold tracking-wider">
                  PARTNERS AND COMPANIES BUILDING THE FUTURE WITH US
                </h2>
                <div className="mt-12 grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-center">
                  {partners.map((partner) => (
                    <div key={partner.name} className="flex justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                      <img src={`https://via.placeholder.com/120x40?text=${partner.name}`} alt={partner.name} className="h-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}

// Exporta o PricingPage caso seja necessário em outro lugar
// // export { PricingPage };