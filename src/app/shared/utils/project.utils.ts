import { formatDate } from '@angular/common';
import { BasicObjectItem, IFormatedProject, IProject } from '../types/project.types';

export const formatProject = (project: IProject): IFormatedProject => {
  const responsibilities = formatObjectToString(project.responsibilities);
  const techStack = formatObjectToString(project.techStack);
  const teamRoles = formatObjectToString(project.teamRoles);

  return { ...project, responsibilities, techStack, teamRoles };
};

export const formatObjectToString = (item: BasicObjectItem[]) => {
  return item.map(i => i.name);
};

export const formatProjectDate = (project: IProject): IProject => {
  const format = 'dd MM yyyy';
  const locale = 'en';
  const startDate = formatDate(project.startDate, format, locale);
  const endDate = formatDate(project.endDate, format, locale);

  return { ...project, startDate, endDate };
};
