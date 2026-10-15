# 🏷️ Portfólio Profissional — Eli Dias 👨‍💻

> [!NOTE]
> Site de portfólio pessoal com trajetória, projetos, experiências e contato, em português e inglês.
> Laboratório 01 da disciplina **Desenvolvimento e Integração de Aplicações Web (DIAW)** — Engenharia de Software, PUC Minas.

![Versão](https://img.shields.io/badge/Versão-v0.1.0-blue?style=for-the-badge) ![React](https://img.shields.io/badge/React-19-007ec6?style=for-the-badge&logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-8-007ec6?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-007ec6?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Protótipos](#-protótipos)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Autor](#-autor)

---

## 🔗 Links Úteis
* 🌐 **Demo Online:** _em breve (Vercel)_ <!-- TODO: colar link da Vercel -->

---

## 📝 Sobre o Projeto
Website de portfólio profissional para apresentar minha formação, projetos e experiências de forma moderna e acessível, e permitir que recrutadores e colegas entrem em contato direto pelo site.

---

## ✨ Funcionalidades Principais
- 👤 **Sobre Mim:** apresentação com formação, área de atuação, interesses e objetivos.
- 🌐 **Internacionalização (i18n):** botão PT/EN, com o idioma salvo no navegador.
- 🧭 **Especialidades:** abas de Salesforce e Java + Spring Boot com o que eu faço, diagrama de arquitetura, trilha de certificações e a stack completa com logos.
- 🗂️ **Projetos:** linha do tempo do mais antigo ao mais recente, com descrição, tecnologias, link do GitHub e uma capa animada em SVG feita para cada projeto (e link para o print real, quando existe).
- 💼 **Experiências:** estágios, freelas e eventos com empresa, cargo, período e descrição.
- 📨 **Contato:** ícones de e-mail, WhatsApp, LinkedIn e GitHub + formulário com validação e envio por e-mail (EmailJS).
- 💻 **Terminal interativo:** comandos como `ajuda`, `projetos`, `wakatime`, `github` e `bomberman`, com histórico (↑/↓) e autocompletar (Tab).
- ⏱️ **WakaTime:** tempo programando, linguagens e editores, buscados por uma função serverless.
- 💣 **Bomberman:** jogo em canvas com bombas, reação em cadeia, power-ups e controles de toque no celular.
- 📄 **Currículo:** versões em português e inglês, visualizadas no site e disponíveis para download em PDF. Geradas pelos mesmos dados do portfólio.
- 🎨 **Temas:** escuro, claro e Cruzeiro (azul `#2F529E` do escudo oficial e branco, com o escudo do clube). Escolha salva no navegador; também dá para trocar pelo terminal com `tema claro | escuro | cruzeiro`.
- 📱 **Responsivo:** layout adaptado para celular, tablet e desktop, com menu hambúrguer no mobile.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Biblioteca:** React 19
* **Linguagem:** JavaScript (ES2022+)
* **Estilização:** Tailwind CSS 4
* **Gerenciamento de Estado:** Context API (idioma)
* **Build Tool:** Vite 8

### 🖥️ Back-end
* **Função serverless (Vercel):** `api/wakatime.js` em Node.js. Guarda a chave do WakaTime no servidor e devolve só os dados públicos, com cache de 1 h na CDN.

### 📦 Dependências
| Pacote | Uso |
| :--- | :--- |
| `react`, `react-dom` | Interface |
| `tailwindcss`, `@tailwindcss/vite` | Estilização |
| `react-icons` | Ícones (redes sociais, menu) |
| `@emailjs/browser` | Envio de e-mail do formulário sem back-end próprio |

### ⚙️ Infraestrutura
* **Cloud:** Vercel (hospedagem gratuita do site estático)
* **E-mail:** EmailJS (serviço externo que faz o papel do back-end de envio)

---

## 🏗 Arquitetura
SPA (Single Page Application) estática, página única com rolagem e navegação por âncoras.

```
Navegador ──► Vercel (HTML/CSS/JS estáticos)
    │
    ├── formulário de contato ──► API EmailJS ──► Gmail
    ├── /api/wakatime (função serverless) ──► API WakaTime   (chave secreta fica no servidor)
    └── comando github ──► API pública do GitHub
```

- **`sections/`**: uma seção da página por componente (About, Projects, Experience, Contact).
- **`components/`**: peças reutilizáveis (Header, Footer, Section, ProjectCard).
- **`data/`**: conteúdo (projetos, experiências, perfil) separado do código — para adicionar um projeto basta editar `projects.js`.
- **`i18n/`**: dicionários `pt.js`/`en.js` e `LanguageContext`, que expõe o idioma atual para todos os componentes.

**Por que uma função serverless em vez de um servidor?** O site só precisa de back-end para esconder a chave do WakaTime. Uma função na própria Vercel resolve isso sem servidor ligado o tempo todo, e front e back ficam num único deploy gratuito. O e-mail usa o EmailJS, que funciona com chave pública.

- **`games/Bomberman.jsx`**: lógica do jogo separada do desenho (canvas) e do React; o loop roda com `requestAnimationFrame`.
- **Temas**: os componentes usam a escala `zinc-*` do Tailwind; cada tema redefine essa escala em `index.css` (`[data-theme=...]`), então nenhum componente precisa conhecer o tema ativo.
- **`vite.config.js`**: um plugin faz `/api/wakatime` funcionar também no `npm run dev`.

---

## 🎨 Protótipos
Wireframes de média fidelidade feitos no Figma.

<!-- TODO: exportar do Figma para docs/prototipos/ -->
| Desktop | Mobile |
| :---: | :---: |
| ![Desktop](docs/prototipos/desktop.png) | ![Mobile](docs/prototipos/mobile.png) |

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Node.js** v20 ou superior
* **npm**

### 🔑 Variáveis de Ambiente
Copie `.env.example` para `.env` e preencha com os dados do painel do [EmailJS](https://dashboard.emailjs.com):

| Variável | Descrição |
| :--- | :--- |
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço de e-mail (ex.: Gmail) |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template com as variáveis `{{name}}`, `{{email}}`, `{{message}}` |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública da conta |
| `WAKATIME_API_KEY` | Chave secreta do [WakaTime](https://wakatime.com/settings/api-key). Usada só em `api/wakatime.js`, nunca vai para o navegador |

### ⚡ Como Executar
```bash
git clone https://github.com/elijuniordd/portfolio.git
cd portfolio
npm install
cp .env.example .env   # e preencha
npm run dev            # http://localhost:5173
```

Gerar o currículo (HTML + PDF em `public/curriculo/`) depois de editar `src/data/`:
```bash
npm run curriculo   # precisa do Google Chrome instalado (ou CHROME_PATH)
```

Build de produção:
```bash
npm run build
npm run preview
```

---

## 🚀 Deploy
1. Importar o repositório em [vercel.com/new](https://vercel.com/new) (framework detectado: Vite).
2. Em *Settings → Environment Variables*, cadastrar as três variáveis `VITE_EMAILJS_*` e a `WAKATIME_API_KEY`.
3. Cada `git push` na `main` gera um novo deploy; outras branches geram *Preview*.

---

## 📂 Estrutura de Pastas
```
portfolio/
├── api/
│   └── wakatime.js        # função serverless (Vercel)
├── docs/prototipos/       # imagens dos wireframes
├── public/
│   ├── curriculo/         # currículo gerado (HTML e PDF, PT/EN)
│   └── escudo-cruzeiro.svg
├── scripts/
│   └── build-resume.mjs   # gera o currículo a partir de src/data
├── src/
│   ├── assets/projects/   # capas animadas (SVG) de cada projeto
│   ├── components/        # Header, Footer, Section, ProjectCard, Terminal, WakaStats, TechIcon
│   ├── games/             # Bomberman.jsx
│   ├── data/              # profile, projects, experiences, certifications, resume, specialties, stack
│   ├── i18n/              # pt.js, en.js, LanguageContext.jsx
│   ├── sections/          # Hero, About, Specialties, Projects, Experience, Stats, Resume, Contact
│   ├── theme/             # ThemeContext.jsx (escuro, claro, cruzeiro)
│   ├── utils/             # formatação de durações
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          # Tailwind + tema
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎥 Demonstração
<!-- TODO: prints/GIF do site rodando -->

---

## 📜 Créditos
- Escudo do Cruzeiro Esporte Clube: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cruzeiro_Esporte_Clube_(logo).svg), domínio público. Marca registrada do Cruzeiro Esporte Clube, usada aqui apenas como homenagem de torcedor.

---

## 👥 Autor
**Eli Dias** — Engenharia de Software, PUC Minas
