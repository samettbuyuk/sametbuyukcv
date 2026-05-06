export interface Profile {
  fullName: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  profileImageUrl: string;
  links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  order: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  githubLink?: string;
  technologies: string[];
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}
