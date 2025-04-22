import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function PrivacyPolicy() {
  window.scrollTo(0, 0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Helmet> 
              <title>Política de Privacidade - Sorteios Online</title>
              <meta name="description" content="Explore nossa política de privacidade" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="http://vamosortear.com.br/privacidade" />
      </Helmet>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>
        
        <div className="prose prose-blue max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">1. Informações que coletamos</h2>
          <p>Coletamos as seguintes informações pessoais:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Endereço de e-mail</li>
            <li>Histórico de sorteios realizados</li>
            <li>Informações de uso do site</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Como usamos suas informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fornecer e manter nossos serviços</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Enviar comunicações importantes sobre o serviço</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Proteção de dados</h2>
          <p>Implementamos medidas de segurança para proteger suas informações pessoais, incluindo:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Criptografia de dados</li>
            <li>Acesso restrito a informações pessoais</li>
            <li>Monitoramento regular de segurança</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Seus direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou incorretos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar o consentimento de uso dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Contato</h2>
          <p>Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
}