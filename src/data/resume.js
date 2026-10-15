// Conteúdo exclusivo do currículo. Experiências, projetos e certificações
// vêm dos outros arquivos de src/data, para não repetir informação.
const resume = {
  title: {
    pt: 'Desenvolvedor Salesforce · Estudante de Engenharia de Software',
    en: 'Salesforce Developer · Software Engineering Student',
  },
  summary: {
    pt: 'Desenvolvedor Salesforce na Framework Digital, atuando com Apex, SOQL, LWC e Flow no catálogo de produtos de um grande cliente do varejo farmacêutico. Estudante de Engenharia de Software na PUC Minas, com experiência anterior em C#, ASP.NET e OutSystems e projetos pessoais em Java/Spring Boot e React. Trailhead Ranger, buscando as certificações Salesforce e oportunidades em projetos internacionais.',
    en: 'Salesforce Developer at Framework Digital, working with Apex, SOQL, LWC and Flow on the product catalog of a large pharmacy retail client. Software Engineering student at PUC Minas, with previous experience in C#, ASP.NET and OutSystems and personal projects in Java/Spring Boot and React. Trailhead Ranger, working toward Salesforce certifications and international project opportunities.',
  },
  education: [
    {
      school: 'PUC Minas',
      degree: { pt: 'Bacharelado em Engenharia de Software', en: "Bachelor's in Software Engineering" },
      period: '2025 – 2028',
    },
    {
      school: 'CEFET-MG',
      degree: { pt: 'Ensino Médio Técnico · Robótica e Modelagem 3D', en: 'Technical High School · Robotics and 3D Modeling' },
      period: '2021 – 2023',
    },
  ],
  skills: [
    { group: { pt: 'Salesforce', en: 'Salesforce' }, items: ['Apex', 'SOQL', 'Lightning Web Components', 'Flow', 'Salesforce CLI'] },
    { group: { pt: 'Linguagens', en: 'Languages' }, items: ['Java', 'C#', 'JavaScript', 'TypeScript', 'SQL'] },
    { group: { pt: 'Frameworks', en: 'Frameworks' }, items: ['Spring Boot (Web, Data JPA, Validation)', 'React', 'ASP.NET', 'Node.js', 'OutSystems'] },
    { group: { pt: 'Ferramentas', en: 'Tools' }, items: ['Git', 'Docker', 'MySQL', 'PostgreSQL', 'Vite', 'Scrum'] },
  ],
  languages: [
    { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
    { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Intermediário', en: 'Intermediate' } },
  ],
  // Nomes dos projetos (de projects.js) que entram no currículo, nesta ordem
  projects: ['CoffeeTrack Minas', 'TP Hospedagem', 'ClimaAPI', 'n8n Random Node'],
}

export default resume
