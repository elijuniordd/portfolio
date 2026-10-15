// Cada projeto: { date: 'AAAA-MM', name, description: {pt, en}, techs[], github, image }
// A timeline ordena por `date` automaticamente (mais antigo → mais recente).
// Capas animadas (SVG) em src/assets/projects/. `new URL` funciona no Vite e no Node (script do currículo). `screenshot` é opcional: print real do sistema.
const n8nCover = new URL('../assets/projects/n8n-random-node.svg', import.meta.url).href
const coffeeTrackCover = new URL('../assets/projects/coffeetrack.svg', import.meta.url).href
const hospedagemCover = new URL('../assets/projects/tp-hospedagem.svg', import.meta.url).href
const climaCover = new URL('../assets/projects/clima-api.svg', import.meta.url).href
const oficinaCover = new URL('../assets/projects/oficina-do-amanha.svg', import.meta.url).href

const projects = [
  {
    date: '2025-09',
    name: 'n8n Random Node',
    description: {
      pt: 'Conector customizado para a plataforma de automação n8n que gera números verdadeiramente aleatórios pela API do Random.org. Desafio técnico do programa de estágio da Onfly.',
      en: 'Custom node for the n8n automation platform that generates truly random numbers through the Random.org API. Technical challenge for the Onfly internship program.',
    },
    techs: ['TypeScript', 'Node.js', 'n8n', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/elijuniordd/n8n-random-node-challenge',
    image: n8nCover,
  },
  {
    date: '2026-03',
    name: 'CoffeeTrack Minas',
    description: {
      pt: 'Ecossistema Salesforce para rastrear a produção de cafés especiais em Minas Gerais: objetos customizados (Fazenda e Lote), Flow que marca lotes acima de 1000 m como potencial café especial e um portal do comprador em LWC com filtros por nota SCA.',
      en: 'Salesforce ecosystem to track specialty coffee production in Minas Gerais: custom objects (Farm and Lot), a Flow that flags lots above 1000 m as specialty coffee candidates, and an LWC buyer portal filtered by SCA score.',
    },
    techs: ['Salesforce', 'Apex', 'LWC', 'Flow', 'Salesforce CLI'],
    github: 'https://github.com/elijuniordd/CoffeeTrack',
    image: coffeeTrackCover,
    screenshot: 'https://github.com/user-attachments/assets/2c88e6ca-029b-46e3-b052-b78e97e8c255',
  },
  {
    date: '2026-04',
    name: 'TP Hospedagem',
    description: {
      pt: 'Sistema de reservas de hospedagem feito em grupo na disciplina de Programação Modular: back-end em Spring Boot com MySQL, front-end em React, notificações, cancelamento de reservas e pagamentos integrados.',
      en: 'Lodging booking system built as a team for the Modular Programming course: Spring Boot back end with MySQL, React front end, notifications, booking cancellation and integrated payments.',
    },
    techs: ['Java', 'Spring Boot', 'MySQL', 'React', 'Docker'],
    github: 'https://github.com/Programacao-Modular-PUC/trabalho-pratico-tphospedagem',
    image: hospedagemCover,
  },
  {
    date: '2026-08',
    name: 'ClimaAPI',
    description: {
      pt: 'API REST em Spring Boot que consulta a previsão do tempo de uma cidade usando a WeatherAPI. Feita em dupla na disciplina de DIAW.',
      en: 'Spring Boot REST API that fetches the weather forecast for a city using WeatherAPI. Built in a pair for the DIAW course.',
    },
    techs: ['Java', 'Spring Boot', 'Maven', 'REST'],
    github: 'https://github.com/elijuniordd/ClimaAPI',
    image: climaCover,
  },
  {
    date: '2026-10',
    name: 'Oficina do Amanhã',
    description: {
      pt: 'Jogo web educativo em que o jogador ajuda moradores de um bairro investigando o problema, pedindo uma solução clara a uma IA simulada e testando o resultado. 6 missões, progresso salvo no navegador e testes automatizados.',
      en: 'Educational web game where the player helps neighborhood residents by investigating a problem, asking a simulated AI for a clear solution and testing the result. 6 missions, progress saved in the browser and automated tests.',
    },
    techs: ['TypeScript', 'Vite', 'Vitest', 'Playwright'],
    github: 'https://github.com/elijuniordd/arcade-frame',
    image: oficinaCover,
  },
]

export default projects
