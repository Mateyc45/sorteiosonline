import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpenIcon, TagIcon, CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AdSpace } from '../AdSpace';
import {HomeIcon} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '30',
    slug: 'inteligencia-artificial-em-sorteios',
    title: 'Como a Inteligência Artificial Está Transformando Sorteios Online',
    excerpt: 'Descubra como ferramentas de IA estão otimizando a segurança, análise e personalização dos sorteios.',
    category: 'Tecnologia',
    tags: ['Inteligência Artificial', 'Automação', 'Sorteios Online', 'Inovação'],
    publishedAt: new Date('2024-04-25'),
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '29',
    slug: 'copywriting-para-sorteios',
    title: 'Copywriting de Impacto: Como Textos Convertem em Sorteios',
    excerpt: 'Entenda como o texto certo pode dobrar o engajamento e a taxa de participação nos seus sorteios.',
    category: 'Marketing',
    tags: ['Copywriting', 'Sorteios Online', 'Conversão', 'Comunicação'],
    publishedAt: new Date('2024-04-23'),
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '28',
    slug: 'sorteios-em-temas-sazonais',
    title: 'Sorteios Sazonais: Como Aproveitar Datas Comemorativas',
    excerpt: 'Veja como usar datas como Black Friday, Natal e Dia das Mães para impulsionar sorteios estratégicos.',
    category: 'Datas',
    tags: ['Sazonalidade', 'Datas Comemorativas', 'Marketing', 'Sorteios'],
    publishedAt: new Date('2024-04-20'),
    imageUrl: 'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '27',
    slug: 'gamificacao-sorteios',
    title: 'Gamificação em Sorteios: Transforme Participações em Diversão',
    excerpt: 'Saiba como aplicar mecânicas de jogos para aumentar o engajamento e tornar seu sorteio inesquecível.',
    category: 'Engajamento',
    tags: ['Gamificação', 'Engajamento', 'Sorteios Online', 'Experiência do Usuário'],
    publishedAt: new Date('2024-04-18'),
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '26',
    slug: 'email-marketing-para-sorteios',
    title: 'E-mail Marketing: O Aliado Esquecido dos Sorteios',
    excerpt: 'Descubra como criar campanhas de e-mail que aumentam o número de participantes em sorteios.',
    category: 'Marketing',
    tags: ['Email Marketing', 'Sorteios', 'Leads', 'Comunicação'],
    publishedAt: new Date('2024-04-16'),
    imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '25',
    slug: 'psicologia-da-urgencia-sorteios',
    title: 'Psicologia da Urgência: Como Prazos Curtos Movem Pessoas',
    excerpt: 'Aprenda a usar gatilhos mentais de urgência e escassez para turbinar seus sorteios.',
    category: 'Comportamento',
    tags: ['Psicologia', 'Urgência', 'Marketing', 'Sorteios'],
    publishedAt: new Date('2024-04-14'),
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '24',
    slug: 'sorteios-com-colaboracoes',
    title: 'Sorteios em Colaboração: Como Multiplicar Audiência com Parceiros',
    excerpt: 'Entenda como colaborações com marcas e criadores podem potencializar o alcance dos sorteios.',
    category: 'Parcerias',
    tags: ['Colaboração', 'Parcerias', 'Sorteios Online', 'Marketing'],
    publishedAt: new Date('2024-04-12'),
    imageUrl: 'https://cdn.pixabay.com/photo/2017/07/13/08/12/shaking-hands-2499629_1280.jpg'
  },
  {
    id: '23',
    slug: 'tendencias-sorteios-2024',
    title: 'Tendências de Sorteios Online para 2024',
    excerpt: 'Fique por dentro das estratégias e formatos de sorteios que vão dominar o mercado neste ano.',
    category: 'Tendências',
    tags: ['Tendências', 'Inovação', 'Sorteios', 'Marketing'],
    publishedAt: new Date('2024-04-10'),
    imageUrl: 'https://cdn.pixabay.com/photo/2019/02/16/09/33/hand-3999923_1280.jpg'
  },
  {
    id: '22',
    slug: 'aumentando-lista-leads-com-sorteios',
    title: 'Como Sorteios Aumentam sua Lista de Leads',
    excerpt: 'Descubra como capturar contatos qualificados através de sorteios bem estruturados.',
    category: 'Leads',
    tags: ['Leads', 'Crescimento', 'Sorteios', 'Marketing Digital'],
    publishedAt: new Date('2024-04-08'),
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '21',
    slug: 'sorteios-no-instagram-estrategia',
    title: 'Sorteios no Instagram: Estratégias que Funcionam',
    excerpt: 'Dicas práticas para criar sorteios eficientes no Instagram e aumentar o engajamento.',
    category: 'Redes Sociais',
    tags: ['Instagram', 'Sorteios', 'Engajamento', 'Marketing Digital'],
    publishedAt: new Date('2024-04-05'),
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '20',
    slug: 'plataformas-de-sorteios',
    title: 'Plataformas de Sorteios: Como Escolher a Ideal',
    excerpt: 'Conheça as melhores ferramentas para criar e gerenciar sorteios online com segurança.',
    category: 'Ferramentas',
    tags: ['Plataformas', 'Sorteios Online', 'Ferramentas', 'Tecnologia'],
    publishedAt: new Date('2024-04-03'),
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '19',
    slug: 'bio-link-sorteios',
    title: 'O Poder do Link na Bio: Como Redirecionar para Sorteios',
    excerpt: 'Saiba como usar o link da bio nas redes sociais de maneira estratégica para atrair participantes.',
    category: 'Redes Sociais',
    tags: ['Link na Bio', 'Sorteios', 'Marketing Digital', 'Conversão'],
    publishedAt: new Date('2024-04-01'),
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/21/08/22/media-998990_1280.jpg'
  },
  {
    id: '18',
    slug: 'sorteio-premios-certeiros',
    title: 'Escolhendo Prêmios que Atraem: O Segredo por Trás dos Sorteios Irresistíveis',
    excerpt: 'Aprenda como escolher prêmios que realmente despertam o interesse e aumentam as conversões.',
    category: 'Estratégia',
    tags: ['Prêmios', 'Atração', 'Conversão', 'Sorteios Online'],
    publishedAt: new Date('2024-03-30'),
    imageUrl: 'https://cdn.pixabay.com/photo/2020/05/11/04/28/couple-5156442_1280.jpg'
  },
  {
    id: '17',
    slug: 'regras-claras-sorteios',
    title: 'Regras Claras: Evitando Confusões nos Sorteios',
    excerpt: 'Saiba como criar regulamentos simples, transparentes e seguros para evitar problemas futuros.',
    category: 'Legal',
    tags: ['Regulamento', 'Regras', 'Sorteios Online', 'Segurança Jurídica'],
    publishedAt: new Date('2024-03-28'),
    imageUrl: 'https://cdn.pixabay.com/photo/2020/01/22/00/48/entrepreneur-4784289_1280.jpg'
  },
  {
    id: '16',
    slug: 'sorteio-feedback-clientes',
    title: 'Como Sorteios Podem Coletar Feedback Valioso dos Clientes',
    excerpt: 'Aprenda a usar sorteios como ferramenta para captar insights e melhorar produtos ou serviços.',
    category: 'Pesquisa',
    tags: ['Feedback', 'Clientes', 'Sorteios Online', 'Melhoria Contínua'],
    publishedAt: new Date('2024-03-26'),
    imageUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg'
  },  
  {
    id: '15',
    slug: 'influenciadores-sorteios',
    title: 'O Papel dos Influenciadores em Sorteios: Parceria que Funciona',
    excerpt: 'Saiba como parcerias com influenciadores podem ampliar o alcance dos seus sorteios e fortalecer sua marca.',
    category: 'Parcerias',
    tags: ['Influenciadores', 'Sorteios', 'Marketing Digital', 'Parcerias Estratégicas'],
    publishedAt: new Date('2024-03-25'),
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '14',
    slug: 'design-para-sorteios',
    title: 'Design para Sorteios: Como Imagens Aumentam o Engajamento',
    excerpt: 'Veja como o visual de um sorteio pode influenciar diretamente no número de participantes.',
    category: 'Design',
    tags: ['Design', 'Imagens', 'Sorteios Online', 'Engajamento'],
    publishedAt: new Date('2024-03-22'),
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '13',
    slug: 'legislacao-sorteios-brasil',
    title: 'Legislação de Sorteios no Brasil: O Que Você Precisa Saber',
    excerpt: 'Entenda as regras legais que cercam sorteios no Brasil para evitar problemas judiciais.',
    category: 'Legal',
    tags: ['Legislação', 'Sorteios', 'Brasil', 'Regras'],
    publishedAt: new Date('2024-03-20'),
    imageUrl: 'https://cdn.pixabay.com/photo/2020/06/25/04/51/legal-5338513_1280.jpg'
  },
  {
    id: '12',
    slug: 'sorteio-criativo',
    title: 'Sorteios Criativos: Surpreenda seu Público',
    excerpt: 'Dicas práticas para criar sorteios fora do comum e gerar burburinho nas redes sociais.',
    category: 'Inovação',
    tags: ['Criatividade', 'Sorteios', 'Marketing Inovador', 'Tendências'],
    publishedAt: new Date('2024-03-18'),
    imageUrl: 'https://cdn.pixabay.com/photo/2017/08/10/01/10/lights-2616730_1280.jpg'
  },
  {
    id: '11',
    slug: 'erro-comum-sorteios',
    title: '5 Erros Comuns em Sorteios e Como Evitá-los',
    excerpt: 'Conheça os deslizes mais frequentes ao criar sorteios e aprenda a evitá-los para garantir mais sucesso.',
    category: 'Boas Práticas',
    tags: ['Erros', 'Dicas', 'Sorteios Online', 'Melhoria'],
    publishedAt: new Date('2024-03-15'),
    imageUrl: 'https://cdn.pixabay.com/photo/2020/06/23/08/46/cat-5331883_1280.jpg'
  },
  {
    id: '10',
    slug: 'como-promover-sorteios',
    title: 'Como Promover Sorteios Sem Gastar Muito',
    excerpt: 'Aprenda técnicas de divulgação que aumentam o alcance dos seus sorteios sem comprometer o orçamento.',
    category: 'Marketing',
    tags: ['Divulgação', 'Sorteios', 'Crescimento', 'Estratégias'],
    publishedAt: new Date('2024-03-12'),
    imageUrl: 'https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    slug: 'analisando-sorteios-sucesso',
    title: 'Analisando Sorteios de Sucesso: O Que Podemos Aprender?',
    excerpt: 'Descubra os fatores que tornam um sorteio online um verdadeiro sucesso. Aprenda com exemplos práticos e implemente estratégias eficazes para maximizar engajamento e participação.',
    category: 'Estratégia',
    tags: ['Sorteios Online', 'Engajamento', 'Marketing Digital', 'Boas Práticas'],
    publishedAt: new Date('2024-03-10'),
    imageUrl: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    slug: 'sorteios-que-convertam',
    title: 'Sorteios que Convertem: Como Atrair Clientes Reais',
    excerpt: 'Saiba como criar sorteios que vão além do número de seguidores e realmente convertem em vendas.',
    category: 'Vendas',
    tags: ['Conversão', 'Leads', 'Sorteios', 'Marketing'],
    publishedAt: new Date('2024-03-08'),
    imageUrl: 'https://cdn.pixabay.com/photo/2016/07/15/23/36/kid-1520705_1280.jpg'
  },
  {
    id: '7',
    slug: 'planejamento-sorteio-perfeito',
    title: 'Planejamento de Sorteios: Guia Para Resultados Consistentes',
    excerpt: 'Descubra como planejar cada detalhe de um sorteio para gerar mais visibilidade e alcançar novos seguidores.',
    category: 'Estratégia',
    tags: ['Planejamento', 'Sorteios', 'Marketing Digital', 'Engajamento'],
    publishedAt: new Date('2024-03-05'),
    imageUrl: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    slug: 'psicologia-dos-sorteios',
    title: 'A Psicologia dos Sorteios: Por Que as Pessoas Participam?',
    excerpt: 'Entenda o que motiva as pessoas a participarem de sorteios e como usar isso a seu favor nas campanhas.',
    category: 'Comportamento',
    tags: ['Psicologia', 'Sorteios', 'Neuromarketing', 'Comportamento'],
    publishedAt: new Date('2024-02-20'),
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    slug: 'como-medir-resultado-sorteios',
    title: 'Como Medir os Resultados de um Sorteio: Métricas que Importam',
    excerpt: 'Descubra quais indicadores acompanhar após um sorteio e aprenda a medir o verdadeiro impacto da sua campanha.',
    category: 'Análise',
    tags: ['Métricas', 'Análise de Dados', 'Sorteios Online', 'Resultados'],
    publishedAt: new Date('2024-03-28'),
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    slug: 'estrategias-engajamento-sorteios',
    title: 'Estratégias de Engajamento para Sorteios Online Incríveis',
    excerpt: 'Saiba como criar sorteios que realmente engajam seu público e impulsionam o crescimento das suas redes sociais.',
    category: 'Marketing',
    tags: ['Engajamento', 'Redes Sociais', 'Sorteios', 'Marketing'],
    publishedAt: new Date('2024-01-15'),
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    slug: 'como-criar-sorteio-online',
    title: 'Como Criar um Sorteio Online Passo a Passo',
    excerpt: 'Aprenda o passo a passo para criar um sorteio online de forma segura, atrativa e com alta participação. Descubra as melhores plataformas, estratégias de divulgação e como garantir a transparência do sorteio.',
    category: 'Guias',
    tags: ['Sorteios Online', 'Passo a Passo', 'Dicas', 'Marketing Digital'],
    publishedAt: new Date('2024-02-22'),
    imageUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=80'
},
  {
    id: '2',
    slug: 'evitando-fraudes-sorteios-seguros',
    title: 'Evitando Fraudes: Dicas para Fazer Sorteios Justos e Seguros',
    excerpt: 'Descubra as melhores práticas para realizar sorteios online transparentes e confiáveis. Aprenda a prevenir fraudes, estabelecer regras claras e garantir a credibilidade do seu sorteio.',
    category: 'Segurança',
    tags: ['Segurança', 'Fraudes', 'Boas Práticas', 'Sorteios Online'],
    publishedAt: new Date('2024-02-21'),
    imageUrl: 'https://cdn.pixabay.com/photo/2017/09/16/17/41/man-2756206_1280.jpg'
  },
  {
    id: '1',
    slug: 'lgpd-sorteios-coleta-dados-segura',
    title: 'LGPD e Sorteios: Como Coletar Dados de Participantes com Segurança?',
    excerpt: 'Aprenda as melhores práticas para realizar sorteios online em conformidade com a Lei Geral de Proteção de Dados (LGPD). Descubra como coletar, armazenar e processar dados pessoais de forma segura e legal.',
    category: 'Segurança',
    tags: ['LGPD', 'Proteção de Dados', 'Sorteios Online', 'Compliance'],
    publishedAt: new Date('2024-02-20'),
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80'
  },
];

export function BlogList() {
  window.scrollTo(0, 0);
  
  const [SelecionarTag, setSelecionarTag] = useState('');
  const [Sugestoes, setSugestoes] = useState<string[]>([]);

  const todasAsTags = [...new Set(blogPosts.flatMap((post) => post.tags))];

  const MudancaImput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setSelecionarTag(valor);

    if (valor) {
      const tagsFiltradas = todasAsTags.filter((tag) =>
        tag.toLowerCase().includes(valor.toLowerCase())
      );
      setSugestoes(tagsFiltradas);
    } else {
      setSugestoes([]);
    }
  };

  const SugestoesLista = (tag: string) => {
    setSelecionarTag(tag);
    setSugestoes([]); // Limpar sugestões após selecionar
  };

  const PostsFiltrados = SelecionarTag
    ? blogPosts.filter((post) => post.tags.includes(SelecionarTag))
    : blogPosts;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>
      <Helmet>
        <title>Blog - Sorteios Online | Dicas, Tutoriais e Novidades sobre Sorteios</title>
        <meta
          name="description"
          content="Confira artigos, tutoriais e dicas sobre sorteios online, organização de amigo secreto, conformidade com LGPD e muito mais. Mantenha-se atualizado com as melhores práticas!"
        />
        <meta
          name="keywords"
          content="blog sorteios, dicas sorteios online, tutorial amigo secreto, LGPD sorteios, sorteios seguros"
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Blog Sorteios Online
        </h1>
        <p className="text-lg text-gray-600">
          Dicas, tutoriais e novidades sobre sorteios online e organização de eventos
        </p>
      </div>

      <AdSpace />
      <div className="mb-6 ml-0">
        <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-2 ml-2">
          Filtrar por Tag:
        </label>
        <div className="ml-0 relative">
          <input
            id="tag-filter"
            type="text"
            value={SelecionarTag}
            onChange={MudancaImput}
            className="w-auto max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite uma tag..."
          />
          {Sugestoes.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {Sugestoes.map((tag) => (
                <li
                  key={tag}
                  onClick={() => SugestoesLista(tag)}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="grid gap-8 mt-8">
        {PostsFiltrados.map((post) => (
          <article
            key={post.id}
            className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex gap-6">
              <div className="w-1/3">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="w-2/3">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpenIcon className="h-4 w-4" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {format(post.publishedAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-gray-400" />
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ler mais
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AdSpace />
    </div>
  );
}