<div align="center">

# 🎲 VamoSortear

**A plataforma mais rápida, justa e intuitiva para sorteios online e organização de eventos.**

[![Acesse o site](https://img.shields.io/badge/Acessar_Site-vamosortear.com.br-00C853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://vamosortear.com.br/)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

<br />

👉 **[Clique aqui para acessar e realizar seu sorteio gratuitamente!](https://vamosortear.com.br/)** 👈

</div>

---

## 📌 Sobre o Projeto

O **VamoSortear** ([vamosortear.com.br](https://vamosortear.com.br)) é uma aplicação web moderna desenvolvida para simplificar e garantir transparência em sorteios de qualquer natureza. Seja para dividir times de futebol no final de semana, sortear números para rifas/bingos, organizar o Amigo Secreto da empresa ou sortear nomes no Instagram, a plataforma entrega resultados rápidos, auditáveis e sem necessidade de cadastro.

---

## ✨ Funcionalidades Principais

| Ferramenta | Descrição | Link Direto |
| :--- | :--- | :--- |
| ⚽ **Sorteador de Times e Equipes** | Divide participantes em grupos equilibrados e justos. Ideal para futebol, jogos e sala de aula. | [/Sortear-Equipes](https://vamosortear.com.br/Sortear-Equipes) |
| 🔢 **Sorteador de Números** | Sorteio de números aleatórios com intervalo customizável (ex: 1 a 100) e opção sem repetição. | [/Sortear-Numero](https://vamosortear.com.br/Sortear-Numero) |
| 📝 **Sorteador de Nomes & Palavras** | Sorteie um ou múltiplos ganhadores a partir de uma lista personalizada de participantes. | [/Sortear-Palavras](https://vamosortear.com.br/Sortear-Palavras) |
| 🔢 **Gerador de Sequência** | Gera sequências numéricas aleatórias e ordens de apresentação de forma imparcial. | [/Sortear-Sequencia](https://vamosortear.com.br/Sortear-Sequencia) |
| 🎁 **Amigo Secreto Online** | Organização completa de Amigo Secreto/Oculto com geração de links e envio fácil. | [/Amigo-Secreto](https://vamosortear.com.br/Amigo-Secreto) |
| 🎡 **Roleta Personalizada** | Gire uma roleta interativa e personalizável para tomar decisões e fazer sorteios visuais. | [/Roleta](https://vamosortear.com.br/Roleta) |
| 📰 **Blog & Dicas** | Artigos informativos sobre estratégias de engajamento, regras e novidades de sorteios. | [/blog](https://vamosortear.com.br/blog) |

---

## 🚀 Diferenciais & Arquitetura

- **⚡ 100% Gratuito & Sem Cadastro:** O usuário entra, configura e sorteia em segundos.
- **🛡️ Resultados Auditáveis:** Sorteios geram comprovantes e links únicos salvos no banco para validação pública.
- **📱 Totalmente Responsivo & Mobile First:** Interface adaptada para smartphones, tablets e desktop.
- **🔍 SEO Avançado & Rich Snippets:**
  - Dados estruturados JSON-LD (`WebApplication`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`).
  - Metatags dinâmicas otimizadas para alto CTR e compatibilidade OpenGraph.
  - Seção de FAQ interativa com sanfona (accordion) alimentando os resultados de busca.
- **📝 Gestão de Blog Integrada:** Suporte a criação de novos artigos via editor Rich Text (React Quill) persistidos diretamente no **Supabase**.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Server Actions, Turbopack)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Banco de Dados & Backend:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Editor Rich Text:** `react-quill-new`
- **Efeitos & Animações:** `canvas-confetti`, Tailwind Transitions

---

## 📂 Estrutura do Projeto

```bash
src/
├── app/
│   ├── layout.tsx                # Root layout com SEO, Preconnect e Google AdSense
│   ├── page.tsx                  # Página inicial com cards das ferramentas
│   ├── globals.css               # Estilos globais e regras de tipografia
│   ├── Amigo-Secreto/            # Ferramenta de Amigo Secreto
│   ├── Roleta/                   # Roleta interativa
│   ├── Sortear-Equipes/          # Sorteador de times e equipes
│   ├── Sortear-Numero/           # Sorteador de números
│   ├── Sortear-Palavras/         # Sorteador de nomes/palavras
│   ├── Sortear-Sequencia/        # Gerador de sequências
│   ├── blog/                     # Listagem, post individual e criação de posts (/blog/novo)
│   └── sitemap/                  # Mapa do site
├── components/                   # Componentes reutilizáveis (Header, Footer, FAQ, Forms)
└── lib/                          # Configurações de API (Supabase, Server Actions, Utilitários)
```

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos

- **Node.js** (versão 18.18+ ou 20+)
- **npm**, **yarn**, **pnpm** ou **bun**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/vamosortear.git
   cd vamosortear
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as chaves necessárias:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000)

---

## 🌐 Conheça o Projeto no Ar

Visite a versão oficial em produção:

🔗 **[https://vamosortear.com.br](https://vamosortear.com.br)**

---

<div align="center">
  <sub>Desenvolvido com ❤️ para simplificar sorteios em todo o Brasil.</sub>
</div>
