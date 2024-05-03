import { Injectable } from '@angular/core';
import { IFormatedProject, IProject } from '../../types/project.types';
import { formatObjectToString } from '../../utils/shared.utils';
import { formatDate } from '@angular/common';
import { CVFormatedInterface, CVInterface } from '../../types/cv.type';
import { IEmployee, IFormatedEmployee } from '../../types/employees.types';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  formatProject(project: IProject): IFormatedProject {
    const responsibilities = formatObjectToString(project.responsibilities);
    const techStack = formatObjectToString(project.techStack);
    const teamRoles = formatObjectToString(project.teamRoles);

    return { ...project, responsibilities, techStack, teamRoles };
  }

  formatProjectDate(project: IProject): IProject {
    const format = 'dd MM yyyy';
    const locale = 'en';
    const startDate = formatDate(project.startDate, format, locale);
    const endDate = formatDate(project.endDate, format, locale);

    return { ...project, startDate, endDate };
  }

  formatCV(cv: CVInterface): CVFormatedInterface {
    const department = cv.department.name;
    const specialization = cv.specialization.name;
    const language = cv.language.map(i => {
      return { name: i.name, level: i.level };
    });
    const skills = cv.skills.map(i => i.name);
    const cvsProjects = cv.cvsProjects.map(project => this.formatProject(project));

    return { ...cv, department, specialization, language, skills, cvsProjects };
  }

  formatEmployee(employee: IEmployee): IFormatedEmployee {
    const department = employee.department.name;
    const specialization = employee.specialization.name;

    const cvs = employee.cvs.map(cv => this.formatCV(cv));

    return { ...employee, department, specialization, cvs };
  }
}
