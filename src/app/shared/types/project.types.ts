export interface IProject {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  responsibilities: ResponsibilityT[];
  teamRoles: TeamRoleT[];
  techStack: TechStackItemT[];
}

export type RequestProject = Omit<IFormatedProject, 'id'>;

export interface IFormatedProject
  extends Omit<IProject, 'responsibilities' | 'teamRoles' | 'techStack'> {
  [key: string]: number | string | string[];
  responsibilities: string[];
  teamRoles: string[];
  techStack: string[];
}

export interface BasicObjectItem {
  id: number;
  name: string;
}

export type ResponsibilityT = BasicObjectItem;
export type TeamRoleT = BasicObjectItem;
export type TechStackItemT = BasicObjectItem;

export type FormatedTeamRoleT = string;
export type FormatedResponsibilityT = string;
export type FormatedTechStackItemT = string;
