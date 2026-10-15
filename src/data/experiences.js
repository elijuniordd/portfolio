// Ordem: mais recente primeiro
const experiences = [
  {
    company: 'Framework Digital',
    role: { pt: 'Salesforce Developer (Estágio)', en: 'Salesforce Developer (Intern)' },
    period: { pt: 'mar. 2026 — atual · Híbrido, BH', en: 'Mar 2026 — present · Hybrid, BH' },
    description: {
      pt: 'Desenvolvimento Salesforce Core no time de Catálogo/PIM, alocado em cliente do varejo farmacêutico (Drogaria Araujo). Apex, SOQL, Lightning Web Components e Flow; manutenção do catálogo de produtos integrado ao Salesforce; cerimônias ágeis e contato direto com o cliente.',
      en: 'Salesforce Core development on the Catalog/PIM team, serving a pharmacy retail client (Drogaria Araujo). Apex, SOQL, Lightning Web Components and Flow; maintaining the product catalog integrated with Salesforce; agile ceremonies and direct client contact.',
    },
    skills: ['Apex', 'SOQL', 'LWC', 'Flow'],
    highlights: {
      pt: [
        'Desenvolvimento em Apex, SOQL, Lightning Web Components (LWC) e Flow no time de Catálogo/PIM.',
        'Manutenção e evolução do catálogo de produtos (PIM) integrado à plataforma Salesforce para a Drogaria Araujo.',
        'Participação em cerimônias ágeis e contato direto com o cliente.',
      ],
      en: [
        'Built features with Apex, SOQL, Lightning Web Components (LWC) and Flow on the Catalog/PIM team.',
        'Maintained and evolved the product catalog (PIM) integrated with Salesforce for Drogaria Araujo, a pharmacy retail chain.',
        'Took part in agile ceremonies and worked directly with the client.',
      ],
    },
  },
  {
    company: 'Framework Digital',
    role: { pt: 'Software Developer', en: 'Software Developer' },
    period: { pt: 'nov. 2025 — mar. 2026', en: 'Nov 2025 — Mar 2026' },
    description: {
      // TODO: descrever o que você fez nesse período
      pt: 'Desenvolvimento de aplicações com C#, ASP.NET e OutSystems.',
      en: 'Application development with C#, ASP.NET and OutSystems.',
    },
    skills: ['C#', 'ASP.NET', 'OutSystems'],
    highlights: {
      pt: ['Desenvolvimento de aplicações com C#, ASP.NET e OutSystems.'],
      en: ['Developed applications with C#, ASP.NET and OutSystems.'],
    },
  },
  {
    company: 'Grupo da Solidariedade',
    role: { pt: 'Professor de Programação (Estágio)', en: 'Programming Teacher (Intern)' },
    period: { pt: 'mai. 2023 — nov. 2023', en: 'May 2023 — Nov 2023' },
    description: {
      pt: 'Ensino de lógica de programação e fundamentos de desenvolvimento para jovens em projeto social: planejamento de aulas, didática para iniciantes e acompanhamento individual dos alunos.',
      en: 'Taught programming logic and development fundamentals to young people in a social project: lesson planning, beginner-friendly teaching and one-on-one student mentoring.',
    },
    skills: ['Lógica de programação', 'Didática'],
    highlights: {
      pt: [
        'Ensino de lógica de programação e fundamentos de desenvolvimento para jovens em projeto social.',
        'Planejamento de aulas e acompanhamento individual dos alunos.',
      ],
      en: [
        'Taught programming logic and development fundamentals to young people in a social project.',
        'Planned lessons and mentored students one-on-one.',
      ],
    },
  },
]

export default experiences
