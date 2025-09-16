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
  <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 text-left transform hover:-translate-y-3 transition-all duration-500 shadow-lg hover:shadow-blue-500/25">
    {/* Subtle glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
    
    {/* Decorative corner gradient */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);


export default function Home() {
  return (
    <>
      
       <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <ParticlesBackground />
        </div>
        {/* Overlay gradient similar to Events */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-5"></div>
        <div className="relative z-10"> 
          <main>
            {/* Hero Section Repaginada */}
            <section className="relative min-h-screen flex items-center pt-16">
              {/* Decorative elements similar to Events */}
              <div className="absolute top-32 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="container mx-auto px-6 z-10 relative text-center md:text-left">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Lado Esquerdo: A NOVA MENSAGEM */}
                  <div className="max-w-xl md:ml-16 md:-mt-20">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-10 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 text-sm font-bold tracking-widest text-blue-400 uppercase mb-6">
                      The Future of Web3 Careers
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold my-4 leading-tight">
                      Forge Your 
                      <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        On-Chain Reputation
                      </span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                      Build a verifiable professional identity with Soulbound NFTs earned in hackathons. Connect with top-tier companies looking for proven talent. The proof is on-chain.
                    </p>
                    {/* Enhanced CTAs with Events styling */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="/developer?tab=profile" className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-1">
                        <User className="mr-2 h-5 w-5" /> 
                        Build Your Profile
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                      </a>
                      <a href="/company?tab=forum" className="group relative inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-blue-500/50 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-white/25 transform hover:scale-105 hover:-translate-y-1">
                        <Building2 className="mr-2 h-5 w-5" /> 
                        Hire Talent
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

            {/* Seção "The Proofly Ecosystem" com design aprimorado */}
            <section className="relative py-20 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
              {/* Background decorative elements */}
              <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
              
              <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 text-sm font-bold tracking-wider text-blue-400 uppercase mb-4">
                    Ecosystem Overview
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    The Proofly Ecosystem
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                    An integrated platform designed to validate skills, foster growth, and connect talent with opportunity through verifiable on-chain credentials.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <FeatureCard 
                    icon={<Trophy size={32} />}
                    title="Prove Your Skills in Hackathons"
                    description="Compete in challenges hosted by leading Web3 companies. Win prizes and earn non-transferable NFT badges that verify your achievements forever."
                  />
                  <FeatureCard 
                    icon={<ShieldCheck size={32} />}
                    title="Build Verifiable Reputation"
                    description="Your profile aggregates all your on-chain credentials. Showcase a portable, tamper-proof history of your skills and contributions."
                  />
                  <FeatureCard 
                    icon={<Briefcase size={32} />}
                    title="Access Exclusive Opportunities"
                    description="Get noticed by companies that value proven talent. Our marketplace connects you directly with roles that match your verified skill set."
                  />
                </div>
              </div>
            </section>


            {/* Partners Section */}
            <section className="py-16 bg-gradient-to-t from-slate-900 to-slate-800/50">
              <div className="container mx-auto px-6">
                <div className="flex justify-center items-center">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-gray-400 text-sm font-bold tracking-wider text-center bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                      PARTNERS AND COMPANIES BUILDING THE FUTURE WITH US
                    </h2>
                  </div>
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