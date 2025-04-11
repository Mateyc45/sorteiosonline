import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HomeIcon, BookOpenIcon, TagIcon, CalendarIcon, ShareIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AdSpace } from '../AdSpace';

const blogPosts = {
  'evitando-fraudes-sorteios-seguros': {
    slug: 'evitando-fraudes-sorteios-seguros',
    title: 'Evitando Fraudes: Dicas para Fazer Sorteios Justos e Seguros',
    excerpt: 'Descubra as melhores práticas para realizar sorteios online transparentes e confiáveis. Aprenda a prevenir fraudes, estabelecer regras claras e garantir a credibilidade do seu sorteio.',
    content: `
      <h2>🔍 1. Escolha uma Plataforma Confiável</h2>
      <p>A melhor forma de evitar fraudes em sorteios é utilizar <strong>ferramentas confiáveis e imparciais</strong>. Aqui no Sorteios online você tem a total segurança para isso.</p>
      <ul>
        <li><strong>Sorteios Online</strong> (<a href="https://sorteiosonline.netlify.app">sorteiosonline.netlify.app</a>)</li>
      </ul>
      <p>Plataformas seguras garantem que o sorteio ocorra de forma justa, sem manipulações ou favoritismos.</p>

      <h2>📜 2. Estabeleça Regras Claras</h2>
      <p>Ter <strong>regras bem definidas</strong> ajuda a evitar problemas e dá credibilidade ao sorteio. Algumas informações essenciais:</p>
      <ul>
        <li>✅ Quem pode participar (restrições de idade, país, etc.)</li>
        <li>✅ Data e horário do sorteio</li>
        <li>✅ Critérios de participação (seguir, curtir, comentar, etc.)</li>
        <li>✅ Como será feita a escolha do vencedor</li>
        <li>✅ Como será feita a entrega do prêmio</li>
        <li>✅ Prazo para o ganhador reclamar o prêmio</li>
      </ul>

      <h2>🛑 3. Cuidado com Contas Falsas e Bots</h2>
      <p>Sorteios podem atrair <strong>contas falsas</strong> criadas apenas para ganhar prêmios. Para evitar isso:</p>
      <ul>
        <li>Peça ações que dificultem bots, como marcar amigos reais ou responder uma pergunta.</li>
        <li>Use ferramentas que verificam a autenticidade dos perfis.</li>
        <li>Analise manualmente os perfis dos finalistas antes de anunciar o vencedor.</li>
      </ul>

      <h2>🎥 4. Realize o Sorteio de Forma Transparente</h2>
      <p>Para garantir credibilidade, o sorteio deve ser <strong>feito de forma pública e verificável</strong>. Algumas formas de fazer isso:</p>
      <ul>
        <li>📌 <strong>Grave a tela</strong> ao realizar o sorteio e publique o vídeo.</li>
        <li>📌 <strong>Faça uma live</strong> no Instagram, YouTube ou TikTok para mostrar o sorteio ao vivo.</li>
        <li>📌 <strong>Salve e compartilhe</strong> o resultado na descrição do post.</li>
      </ul>
      <p>Isso evita dúvidas e suspeitas de manipulação.</p>

      <h2>📨 5. Cuidado com Golpes de Perfis Falsos</h2>
      <p>Uma fraude comum são <strong>perfis falsos se passando pela página oficial</strong> e entrando em contato com os participantes para pedir informações pessoais ou pagamentos. Para evitar isso:</p>
      <ul>
        <li><strong>Deixe claro que você NUNCA pedirá dinheiro</strong> para liberar o prêmio.</li>
        <li><strong>Avise os participantes sobre perfis falsos.</strong></li>
        <li><strong>Use selos de verificação</strong> (se disponível na sua plataforma).</li>
      </ul>

      <h2>📢 6. Divulgue o Vencedor Corretamente</h2>
      <p>Ao divulgar o vencedor, siga boas práticas como:</p>
      <ul>
        <li><strong>Marcar o perfil do ganhador</strong> (se possível)</li>
        <li><strong>Anunciar na bio, stories e feed</strong></li>
        <li><strong>Pedir que o ganhador entre em contato</strong> diretamente</li>
      </ul>
      <p>Evite divulgar dados sensíveis do vencedor, como e-mail ou telefone, para proteger a privacidade.</p>

      <h2>🛠️ 7. Utilize um Regulamento Oficial</h2>
      <p>Se o sorteio for de grande porte, o ideal é ter um <strong>regulamento oficial</strong>, publicado em um site ou link externo. Isso evita problemas legais e dá mais confiança aos participantes.</p>
      <p>Você pode criar um regulamento simples ou consultar um advogado para sorteios maiores.</p>

      <h2>🚀 Conclusão</h2>
      <p>Fazer um <strong>sorteio seguro e confiável</strong> não é difícil, basta seguir boas práticas. Utilize plataformas confiáveis, crie regras claras, previna fraudes e seja transparente com os participantes.</p>
      <p>Agora que você já sabe como evitar fraudes, que tal <strong>criar seu sorteio online de forma segura?</strong> Acesse <a href="https://sorteiosonline.netlify.app">sorteiosonline.netlify.app</a> e comece agora mesmo! 🎉</p>
    `,
    category: 'Segurança',
    tags: ['Segurança', 'Fraudes', 'Boas Práticas', 'Sorteios Online'],
    publishedAt: new Date('2024-02-21'),
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Equipe Sorteios Online',
      role: 'Especialistas em Sorteios e Segurança Digital',
    },
  },
  'lgpd-sorteios-coleta-dados-segura': {
    slug: 'lgpd-sorteios-coleta-dados-segura',
    title: 'LGPD e Sorteios: Como Coletar Dados de Participantes com Segurança?',
    excerpt: 'Aprenda as melhores práticas para realizar sorteios online em conformidade com a Lei Geral de Proteção de Dados (LGPD). Descubra como coletar, armazenar e processar dados pessoais de forma segura e legal.',
    content: `
      <h2>Introdução à LGPD nos Sorteios Online</h2>
      <p>A Lei Geral de Proteção de Dados (LGPD) trouxe importantes mudanças para a realização de sorteios online no Brasil. Compreender e aplicar corretamente suas diretrizes é fundamental para garantir a conformidade legal e a segurança dos participantes.</p>

      <h2>Por que a LGPD é Importante para Sorteios?</h2>
      <p>Sorteios online frequentemente envolvem a coleta de dados pessoais como nome, email e telefone. A LGPD estabelece regras claras sobre como esses dados devem ser:</p>
      <ul>
        <li>Coletados com consentimento explícito</li>
        <li>Armazenados com segurança</li>
        <li>Utilizados apenas para as finalidades informadas</li>
        <li>Eliminados após o período necessário</li>
      </ul>

      <h2>Boas Práticas para Conformidade</h2>
      <h3>1. Consentimento Transparente</h3>
      <p>Obtenha autorização explícita dos participantes através de:</p>
      <ul>
        <li>Checkbox de opt-in claro e específico</li>
        <li>Termos de uso e política de privacidade acessíveis</li>
        <li>Linguagem simples e direta sobre o uso dos dados</li>
      </ul>

      <h3>2. Segurança dos Dados</h3>
      <p>Implemente medidas técnicas de proteção como:</p>
      <ul>
        <li>Criptografia de dados sensíveis</li>
        <li>Controle de acesso rigoroso</li>
        <li>Backup seguro das informações</li>
      </ul>

      <h3>3. Ciclo de Vida dos Dados</h3>
      <p>Defina claramente:</p>
      <ul>
        <li>Período de retenção dos dados</li>
        <li>Processo de eliminação segura</li>
        <li>Documentação das práticas adotadas</li>
      </ul>

      <h2>Implementando a LGPD em Seu Sorteio</h2>
      <p>Siga este checklist para garantir a conformidade:</p>
      <ol>
        <li>Revise seus formulários de coleta de dados</li>
        <li>Atualize seus termos de uso e política de privacidade</li>
        <li>Implemente medidas de segurança técnicas</li>
        <li>Treine sua equipe sobre as práticas de proteção de dados</li>
        <li>Estabeleça um canal para exercício dos direitos dos titulares</li>
      </ol>

      <h2>Conclusão</h2>
      <p>A conformidade com a LGPD não é apenas uma obrigação legal, mas uma oportunidade de construir confiança com seus participantes. Ao seguir as práticas recomendadas, você garante a proteção dos dados pessoais e o sucesso do seu sorteio.</p>
    `,
    category: 'Segurança',
    tags: ['LGPD', 'Proteção de Dados', 'Sorteios Online', 'Compliance'],
    publishedAt: new Date('2024-02-20'),
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Equipe Sorteios Online',
      role: 'Especialistas em Sorteios e Compliance',
    },
  },
  'como-criar-sorteio-online': {
    slug: 'como-criar-sorteio-online',
    title: 'Como Criar um Sorteio Online Passo a Passo',
    excerpt: 'Aprenda a criar um sorteio online do zero, desde a escolha da plataforma até a divulgação e regras para garantir um evento seguro e transparente.',
    content: `
      <h2>Introdução</h2>
      <p>Realizar um sorteio online pode ser uma excelente estratégia para engajamento, geração de leads e fortalecimento de marca. No entanto, é essencial seguir um processo bem estruturado para garantir que tudo ocorra de forma justa e segura.</p>
      
      <h2>Passo 1: Defina o Objetivo do Sorteio</h2>
      <p>Antes de iniciar, tenha claro qual é o propósito do sorteio. Alguns objetivos comuns incluem:</p>
      <ul>
        <li>Aumentar o número de seguidores em redes sociais</li>
        <li>Gerar leads para sua empresa</li>
        <li>Promover um novo produto ou serviço</li>
        <li>Engajar sua audiência</li>
      </ul>
      
      <h2>Passo 2: Escolha a Plataforma Correta</h2>
      <p>Há diversas ferramentas online para realizar sorteios de maneira automatizada. Algumas opções populares incluem:</p>
      <ul>
        <li>Google Forms (para inscrições manuais)</li>
        <li>Instagram e Facebook (sorteios via comentários e curtidas)</li>
        <li>Sorteios Online (plataformas especializadas para sorteios automatizados)</li>
      </ul>
      
      <h2>Passo 3: Defina as Regras do Sorteio</h2>
      <p>Para evitar problemas, estabeleça regras claras. Algumas diretrizes importantes são:</p>
      <ul>
        <li>Quem pode participar? (restrição por idade, localização, etc.)</li>
        <li>Data de início e término do sorteio</li>
        <li>Critérios para participação (curtir, comentar, preencher formulário, etc.)</li>
        <li>Como o ganhador será escolhido e anunciado</li>
      </ul>
      
      <h2>Passo 4: Crie uma Página Atraente para o Sorteio</h2>
      <p>Uma landing page bem estruturada pode aumentar a conversão. Inclua:</p>
      <ul>
        <li>Título chamativo</li>
        <li>Descrição detalhada do prêmio</li>
        <li>Botões de participação visíveis</li>
        <li>Depoimentos ou prova social para credibilidade</li>
      </ul>
      
      <h2>Passo 5: Divulgue o Sorteio</h2>
      <p>Para alcançar mais pessoas, utilize estratégias de divulgação como:</p>
      <ul>
        <li>Postagens nas redes sociais</li>
        <li>Anúncios pagos (Facebook Ads, Google Ads)</li>
        <li>Marketing de influência (parcerias com influenciadores)</li>
        <li>Email marketing para sua base de contatos</li>
      </ul>
      
      <h2>Passo 6: Realize o Sorteio e Anuncie o Vencedor</h2>
      <p>Use uma ferramenta confiável para realizar o sorteio e garanta transparência no processo. Após definir o ganhador:</p>
      <ul>
        <li>Entre em contato com o vencedor e valide as informações</li>
        <li>Anuncie o resultado publicamente</li>
        <li>Entregue o prêmio conforme as regras estabelecidas</li>
      </ul>
      
      <h2>Passo 7: Analise os Resultados</h2>
      <p>Após a conclusão do sorteio, avalie os principais indicadores:</p>
      <ul>
        <li>Número de participantes</li>
        <li>Alcance e engajamento nas redes sociais</li>
        <li>Leads gerados e conversão</li>
      </ul>
      <p>Use esses dados para aprimorar suas próximas campanhas.</p>
      
      <h2>Conclusão</h2>
      <p>Realizar um sorteio online eficaz exige planejamento e boas práticas. Ao seguir esse passo a passo, você garante um evento bem-sucedido, aumentando seu alcance e fortalecendo sua marca.</p>
    `,
    category: 'Dicas de Sorteios',
    tags: ['Sorteios Online', 'Engajamento', 'Marketing Digital', 'Conversão'],
    publishedAt: new Date('2024-03-10'),
    imageUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Equipe Sorteios Online',
      role: 'Especialistas em Sorteios e Marketing Digital',
    }
},
  'analisando-sorteios-sucesso': {
    slug: 'analisando-sorteios-sucesso',
    title: 'Analisando Sorteios de Sucesso: O Que Podemos Aprender?',
    excerpt: 'Descubra os fatores que tornam um sorteio online um verdadeiro sucesso. Aprenda com exemplos práticos e implemente estratégias eficazes para maximizar engajamento e participação.',
    content: `
      <h2>O que faz um sorteio online ser bem-sucedido?</h2>
      <p>Realizar um sorteio online pode ser uma estratégia poderosa para atrair novos seguidores, engajar sua audiência e até gerar vendas. No entanto, nem todos os sorteios têm o mesmo impacto. Vamos analisar alguns fatores-chave que contribuem para o sucesso de sorteios online e como você pode aplicá-los.</p>

      <h2>1. Prêmio Relevante e Atraente</h2>
      <p>O primeiro passo para um sorteio de sucesso é escolher um prêmio que seja realmente desejado pelo seu público-alvo. Alguns dos prêmios mais eficazes incluem:</p>
      <ul>
        <li>Produtos ou serviços da própria marca</li>
        <li>Vouchers de compras</li>
        <li>Experiências exclusivas (eventos, viagens, cursos)</li>
        <li>Dinheiro ou cartões-presente</li>
      </ul>

      <h2>2. Regras Claras e Simples</h2>
      <p>Um erro comum em sorteios online é complicar demais as regras de participação. Um sorteio eficiente precisa de um regulamento bem definido, mas acessível. Algumas boas práticas incluem:</p>
      <ul>
        <li>Exigir apenas ações simples, como curtir, comentar e compartilhar</li>
        <li>Evitar muitas etapas, pois isso pode reduzir a taxa de participação</li>
        <li>Explicar como será feita a escolha do vencedor</li>
      </ul>

      <h2>3. Divulgação Estratégica</h2>
      <p>Mesmo um sorteio bem planejado pode fracassar se não houver divulgação eficiente. Algumas formas eficazes de promoção incluem:</p>
      <ul>
        <li>Publicação em redes sociais com imagens e vídeos chamativos</li>
        <li>Parcerias com influenciadores para ampliar o alcance</li>
        <li>Uso de anúncios pagos para atingir o público certo</li>
        <li>Envio de e-mails para sua base de contatos</li>
      </ul>

      <h2>4. Engajamento Durante o Sorteio</h2>
      <p>Os sorteios de maior sucesso mantêm o público engajado ao longo de toda a campanha. Algumas estratégias incluem:</p>
      <ul>
        <li>Publicações frequentes lembrando os participantes da promoção</li>
        <li>Interação nos comentários para aumentar o alcance orgânico</li>
        <li>Contagem regressiva nos últimos dias para incentivar mais participações</li>
      </ul>

      <h2>5. Transparência e Credibilidade</h2>
      <p>Para garantir a confiança do público, é essencial ser transparente no sorteio. Algumas boas práticas incluem:</p>
      <ul>
        <li>Realizar o sorteio ao vivo para evitar suspeitas</li>
        <li>Utilizar ferramentas confiáveis para a escolha do vencedor</li>
        <li>Divulgar o resultado de forma clara e acessível</li>
      </ul>

      <h2>Exemplos de Sorteios de Sucesso</h2>
      <p>Vamos analisar dois casos reais de sorteios que foram amplamente bem-sucedidos e entender o que eles fizeram de certo:</p>
      <h3>🔹 Caso 1: Sorteio de um iPhone</h3>
      <p>Uma loja de eletrônicos fez um sorteio de um iPhone 15 e obteve mais de 100 mil participantes. Os principais fatores de sucesso foram:</p>
      <ul>
        <li>Parceria com influenciadores para aumentar a divulgação</li>
        <li>Regras simples (seguir a página e marcar dois amigos)</li>
        <li>Uso de anúncios pagos para impulsionar o alcance</li>
      </ul>

      <h3>🔹 Caso 2: Sorteio de um Curso Online</h3>
      <p>Uma plataforma educacional ofereceu um curso gratuito como prêmio. O sorteio teve grande sucesso devido a:</p>
      <ul>
        <li>Foco em um público-alvo específico e interessado</li>
        <li>Engajamento da comunidade durante a promoção</li>
        <li>Divulgação segmentada para potenciais alunos</li>
      </ul>

      <h2>Conclusão</h2>
      <p>Analisar sorteios de sucesso nos dá insights valiosos sobre o que realmente funciona. Para garantir que seu sorteio seja um sucesso, concentre-se em escolher prêmios atraentes, criar regras simples, promover de forma estratégica e manter um alto nível de transparência.</p>
      <p>Agora que você já sabe como estruturar um sorteio vencedor, que tal começar a planejar o seu? 🚀</p>
    `,
    category: 'Estratégia',
    tags: ['Sorteios Online', 'Engajamento', 'Marketing Digital', 'Boas Práticas'],
    publishedAt: new Date('2024-03-10'),
    imageUrl: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Equipe Sorteios Online',
      role: 'Especialistas em Estratégias de Sorteios',
    }
  }
}


export function BlogPost() {
  const { slug } = useParams();
  
  if (!slug || !blogPosts[slug]) {
    return <div>Post não encontrado</div>;
  }

  const post = blogPosts[slug];
  const shareUrl = window.location.href;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Helmet>
        <title>{post.title} - Sorteios Online Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={shareUrl} />
      </Helmet>

      <div className="mb-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para o Blog
        </Link>
      </div>

      <article className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <BookOpenIcon className="h-4 w-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {format(post.publishedAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="rounded-xl w-full h-[400px] object-cover mb-6"
          />

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-2">
                <BookOpenIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-600">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Compartilhar:</span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <FacebookIcon className="h-4 w-4 text-gray-600" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <TwitterIcon className="h-4 w-4 text-gray-600" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <AdSpace />

        <div
          className="prose prose-lg prose-blue max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSpace />

        <footer className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2">
            <TagIcon className="h-4 w-4 text-gray-400" />
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </article>

      <AdSpace />
    </div>
  );
}