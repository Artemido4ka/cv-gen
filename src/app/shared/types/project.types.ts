export interface IProject {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  responsibilities: Responsibility[];
  teamRoles: TeamRole[];
  techStack: TechStackItem[];
}

export type RequestProject = Omit<IFormatedProject, 'id'>;

export interface IFormatedProject
  extends Omit<IProject, 'responsibilities' | 'teamRoles' | 'techStack'> {
  responsibilities: string[];
  teamRoles: string[];
  techStack: string[];
}

export type Responsibility = {
  id: number;
  name: string;
};
export type TeamRole = {
  id: number;
  name: string;
};
export type TechStackItem = {
  id: number;
  name: string;
};
