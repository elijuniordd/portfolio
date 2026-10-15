// Conteúdo da seção "Especialidades".

export const salesforce = {
  id: 'salesforce',
  name: 'Salesforce',
  intro: {
    pt: 'É onde quero construir minha carreira. Trabalho com Salesforce Core todos os dias na Framework Digital e estudo para as certificações da plataforma. Gosto de juntar automação declarativa (Flow) com código (Apex e LWC) para resolver problema de negócio de verdade.',
    en: 'This is where I want to build my career. I work with Salesforce Core every day at Framework Digital and I am studying for the platform certifications. I like combining declarative automation (Flow) with code (Apex and LWC) to solve real business problems.',
  },
  skills: [
    {
      name: 'Apex',
      text: {
        pt: 'Lógica de negócio no servidor: classes, triggers e métodos expostos para o LWC.',
        en: 'Server-side business logic: classes, triggers and methods exposed to LWC.',
      },
    },
    {
      name: 'SOQL',
      text: {
        pt: 'Consultas aos objetos do Salesforce, com filtros dinâmicos e relacionamentos.',
        en: 'Queries over Salesforce objects, with dynamic filters and relationships.',
      },
    },
    {
      name: 'Lightning Web Components',
      text: {
        pt: 'Interfaces reativas em JavaScript, com dados do Apex via @wire.',
        en: 'Reactive JavaScript interfaces, getting data from Apex through @wire.',
      },
    },
    {
      name: 'Flow',
      text: {
        pt: 'Automação declarativa: record-triggered flows que validam e preenchem dados.',
        en: 'Declarative automation: record-triggered flows that validate and fill in data.',
      },
    },
  ],
  // Fluxo mostrado no diagrama
  architecture: [
    { label: 'LWC', detail: 'buyerPortal' },
    { label: 'Apex', detail: '@AuraEnabled' },
    { label: 'SOQL', detail: 'Database.query' },
    { label: 'Objetos', labelEn: 'Objects', detail: 'Fazenda__c · Lote__c' },
  ],
  roadmap: [
    { name: 'Trailhead Ranger', done: true },
    { name: 'Salesforce Certified Platform Developer I', done: false },
    { name: 'Salesforce Certified Administrator', done: false },
    { name: 'Salesforce Certified Platform App Builder', done: false },
  ],
  projects: ['CoffeeTrack Minas'],
}

export const java = {
  id: 'java',
  name: 'Java + Spring Boot',
  intro: {
    pt: 'Java foi a linguagem em que aprendi orientação a objetos e é a que mais uso na faculdade. Com Spring Boot construo APIs REST organizadas em camadas, com validação, DTOs, JPA e padrões de projeto.',
    en: 'Java is the language where I learned object-oriented programming and the one I use most in college. With Spring Boot I build layered REST APIs, with validation, DTOs, JPA and design patterns.',
  },
  skills: [
    {
      name: 'APIs REST',
      nameEn: 'REST APIs',
      text: {
        pt: 'Controllers com @RestController, rotas, status HTTP e consumo de APIs externas.',
        en: 'Controllers with @RestController, routes, HTTP status codes and external API calls.',
      },
    },
    {
      name: 'Spring Data JPA',
      text: {
        pt: 'Entidades, repositórios e relacionamentos persistidos em MySQL (H2 nos testes).',
        en: 'Entities, repositories and relationships persisted in MySQL (H2 for tests).',
      },
    },
    {
      name: 'DTOs + Bean Validation',
      text: {
        pt: 'Entrada e saída separadas das entidades, validadas com @Valid.',
        en: 'Request and response objects separated from entities, validated with @Valid.',
      },
    },
    {
      name: 'Padrões de projeto',
      nameEn: 'Design patterns',
      text: {
        pt: 'Strategy nos meios de pagamento e canais de notificação plugáveis.',
        en: 'Strategy for payment methods and pluggable notification channels.',
      },
    },
  ],
  architecture: [
    { label: 'Controller', detail: '@RestController' },
    { label: 'Service', detail: 'regras de negócio', detailEn: 'business rules' },
    { label: 'Repository', detail: 'Spring Data JPA' },
    { label: 'MySQL', detail: 'Docker' },
  ],
  roadmap: null,
  projects: ['TP Hospedagem', 'ClimaAPI'],
}

export const specialties = [salesforce, java]
