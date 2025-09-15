import React from 'react';
import Head from 'next/head';
// Usaremos os mesmos ícones da lucide-react, pois são modernos e compatíveis
// Linha corrigida
import ParticlesBackground from '../components/ui/ParticlesBackground/ParticlesBackground'; // NOVO: Importe o componente
import { ArrowRight, Trophy, ShieldCheck, Briefcase, User, Building2, Code } from 'lucide-react';
import dynamic from 'next/dynamic';

const StellarLogo = dynamic(() => import('@/components/ui/threedmodel'), {
    ssr: false
})


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-6 text-left transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-db-blue-dark/20 text-db-cyan w-14 h-14 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);


export default function Home() {
  return (
    <>
      
       <div className="relative min-h-screen text-white font-sans overflow-x-hidden"> {/* ALTERADO: font-sans para Inter */}
        <div className="fixed top-0 left-0 w-full h-full z-0">
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
                // style={{ backgroundImage: "url('https://www.databahn.ai/wp-content/uploads/2023/11/bg-e1700813337946.png')" }}
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
                      <a href="/developer?tab=profile" className="inline-flex items-center bg-db-cyan hover:bg-db-blue-light text-db-dark-blue font-bold py-3 px-8 rounded-lg transition-colors duration-300 group">
                        <User className="mr-2 h-5 w-5" /> Build Your Profile (User)
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="/company?tab=forum" className="inline-flex items-center bg-transparent border border-gray-500 hover:bg-db-blue-dark hover:border-db-blue-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 group">
                        <Building2 className="mr-2 h-5 w-5" /> Hire Talent (Company)
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* ALTERADO: Lado Direito agora com o AnimatedLogoPlaceholder */}
                  <div className="relative flex items-center justify-center h-full">
                      {/* <AnimatedLogoPlaceholder 
                          label="Proofly" 
                          description="Your On-Chain Identity" 
                      /> */}

                    <StellarLogo url={'/model-white.gltf'} />
                  </div>
                </div>
              </div>
            </section>

            {/* Seção "The Proofly Ecosystem" (cores e ícones atualizados) */}
            <section className="bg-db-dark-blue text-center">
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


                        {/* remover depois */}
           <div className='flex justify-center items-center mt-8'>
           <h2 className="text-gray-400 text-sm font-bold tracking-wider">
                PARTNERS AND COMPANIES BUILDING THE FUTURE WITH US
            </h2>
           </div>

          </main>
        </div>
      </div>
    </>
  );
}

// Exporta o PricingPage caso seja necessário em outro lugar
// // export { PricingPage };