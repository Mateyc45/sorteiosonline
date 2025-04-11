import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

export function TermsOfUse() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Termos de Uso</h1>
        
        <div className="prose prose-blue max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">1. Aceitação dos Termos</h2>
          <p>Ao acessar e usar este site, você aceita e concorda em cumprir estes termos e condições de uso.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Uso do Serviço</h2>
          <p>Nosso serviço de sorteios online deve ser usado apenas para fins legais e de acordo com estes termos.</p>
          <p>Você concorda em não:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Usar o serviço para fins ilegais</li>
            <li>Tentar acessar áreas restritas do site</li>
            <li>Interferir no funcionamento do serviço</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Conta de Usuário</h2>
          <p>Para algumas funcionalidades, é necessário criar uma conta. Você é responsável por:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Manter a confidencialidade de sua senha</li>
            <li>Todas as atividades realizadas em sua conta</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitação de Responsabilidade</h2>
          <p>Não nos responsabilizamos por:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Uso indevido do serviço</li>
            <li>Problemas técnicos temporários</li>
            <li>Decisões tomadas com base nos resultados dos sorteios</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Modificações dos Termos</h2>
          <p>Reservamos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas aos usuários.</p>
        </div>
      </div>
    </div>
  );
}