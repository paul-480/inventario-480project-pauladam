// src/domain/project/project.entity.ts

export interface Client {
  id: string;
  name: string;
}

export interface Technology {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  client: Client;
  technologies: Technology[];
}