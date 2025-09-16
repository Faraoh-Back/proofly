// components/freelancer/TestimonialCard.tsx

import React from 'react';
import { ClientTestimonial } from '../../types/freelancer';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: ClientTestimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-db-cyan/30 transition-all duration-300 hover:transform hover:scale-105">
      {/* Ícone de Aspas */}
      <div className="mb-4">
        <svg
          className="w-8 h-8 text-db-cyan/60 group-hover:text-db-cyan transition-colors"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 10c0-2.828 0-4.243.879-5.121C4.757 4 6.172 4 9 4h2c2.828 0 4.243 0 5.121.879C17 5.757 17 7.172 17 10v1c0 2.828 0 4.243-.879 5.121C15.243 17 13.828 17 11 17H9c-2.828 0-4.243 0-5.121-.879C3 15.243 3 13.828 3 11v-1zm5.5-3a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2A.5.5 0 0 0 8.5 7zm0 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2A.5.5 0 0 0 8.5 7z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Texto do Depoimento */}
      <blockquote className="text-gray-200 leading-relaxed mb-6 italic text-base">
        "{testimonial.testimonial}"
      </blockquote>

      {/* Informações do Cliente */}
      <div className="flex items-center space-x-4">
        {/* Avatar do Cliente */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-db-cyan/30 group-hover:ring-db-cyan transition-colors">
          <Image
            src={testimonial.clientAvatarUrl}
            alt={testimonial.clientName}
            fill
            className="object-cover"
          />
        </div>

        {/* Detalhes do Cliente */}
        <div className="flex-1">
          <h4 className="font-semibold text-white group-hover:text-db-cyan transition-colors">
            {testimonial.clientName}
          </h4>
          <p className="text-gray-400 text-sm">
            {testimonial.clientCompany}
          </p>
        </div>

        {/* Avaliação com Estrelas */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Dados Adicionais do Projeto */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Projeto concluído</span>
          <span className="text-green-400">Sucesso ✓</span>
        </div>
      </div>
    </div>
  );
};