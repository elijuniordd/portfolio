import { FaJava, FaSalesforce } from 'react-icons/fa'
import { TbBolt, TbBrandCSharp, TbDatabaseSearch, TbSql } from 'react-icons/tb'
import {
  SiApachemaven,
  SiDocker,
  SiDotnet,
  SiGit,
  SiHibernate,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

// Logo e cor oficial de cada tecnologia (cores das marcas, via Simple Icons)
export const TECH = {
  Salesforce: { icon: FaSalesforce, color: '#00A1E0' },
  Apex: { icon: FaSalesforce, color: '#032D60' },
  SOQL: { icon: TbDatabaseSearch, color: '#0176D3' },
  'Lightning Web Components': { icon: TbBolt, color: '#0176D3' },
  LWC: { icon: TbBolt, color: '#0176D3' },
  Flow: { icon: FaSalesforce, color: '#7F56D9' },
  Java: { icon: FaJava, color: '#E76F00' },
  'Spring Boot': { icon: SiSpringboot, color: '#6DB33F' },
  'Spring Data JPA': { icon: SiHibernate, color: '#59666C' },
  Maven: { icon: SiApachemaven, color: '#C71A36' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  SQL: { icon: TbSql, color: '#4479A1' },
  'C#': { icon: TbBrandCSharp, color: '#512BD4' },
  'ASP.NET': { icon: SiDotnet, color: '#512BD4' },
  JavaScript: { icon: SiJavascript, color: '#D4B300' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  React: { icon: SiReact, color: '#087EA4' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Vite: { icon: SiVite, color: '#646CFF' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Git: { icon: SiGit, color: '#F05032' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
}

// Grade "Stack" no fim da seção de especialidades
export const STACK_GROUPS = [
  { title: { pt: 'Salesforce', en: 'Salesforce' }, items: ['Salesforce', 'Apex', 'SOQL', 'LWC', 'Flow'] },
  { title: { pt: 'Back-end', en: 'Back end' }, items: ['Java', 'Spring Boot', 'Spring Data JPA', 'Maven', 'C#', 'ASP.NET', 'Node.js'] },
  { title: { pt: 'Front-end', en: 'Front end' }, items: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { title: { pt: 'Dados e ferramentas', en: 'Data & tools' }, items: ['MySQL', 'PostgreSQL', 'Docker', 'Git', 'Postman'] },
]
