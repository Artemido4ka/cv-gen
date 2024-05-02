import { CVFormatedInterface, CVInterface } from '../types/cv.type';
import { formatProject } from './project.utils';

export const formatCV = (cv: CVInterface): CVFormatedInterface => {
  const department = cv.department.name;
  const specialization = cv.specialization.name;
  const language = cv.language.map(i => {
    return { name: i.name, level: i.level };
  });
  const skills = cv.skills.map(i => i.name);
  const cvsProjects = cv.cvsProjects.map(project => formatProject(project));

  return { ...cv, department, specialization, language, skills, cvsProjects };
};
