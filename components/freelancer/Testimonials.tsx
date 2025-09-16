// components/freelancer/Testimonials.tsx

import React from 'react';
import { ClientTestimonial } from '../../types/freelancer';
import { TestimonialCard } from './';

interface TestimonialsProps {
  testimonials: ClientTestimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">
          O Que Dizem os Clientes
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Feedback real de clientes satisfeitos com os projetos desenvolvidos
        </p>
      </div>

      {/* Grid de Depoimentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Estatísticas de Satisfação */}
      <div className="bg-white/5 rounded-xl p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Avaliação Geral */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-2xl font-bold text-db-cyan">5.0</p>
            <p className="text-sm text-gray-400">Avaliação Média</p>
          </div>

          {/* Taxa de Satisfação */}
          <div className="text-center">
            <p className="text-2xl font-bold text-db-cyan mb-1">100%</p>
            <p className="text-sm text-gray-400">Clientes Satisfeitos</p>
          </div>

          {/* Projetos no Prazo */}
          <div className="text-center">
            <p className="text-2xl font-bold text-db-cyan mb-1">98%</p>
            <p className="text-sm text-gray-400">Entregues no Prazo</p>
          </div>

          {/* Taxa de Recontratação */}
          <div className="text-center">
            <p className="text-2xl font-bold text-db-cyan mb-1">85%</p>
            <p className="text-sm text-gray-400">Taxa de Recontratação</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm mb-4">
          Pronto para ser o próximo cliente satisfeito?
        </p>
        <button className="px-8 py-3 bg-db-cyan text-db-dark-blue font-semibold rounded-xl hover:bg-db-cyan/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
          Começar Projeto
        </button>
      </div>
    </div>
  );
};