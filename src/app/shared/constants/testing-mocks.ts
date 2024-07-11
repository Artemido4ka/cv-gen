export const PROJECT_TEST_DATA = {
  id: 1,
  projectName: 'string',
  description: 'string',
  startDate: '2024-05-02T14:22:57.128Z',
  endDate: '2024-05-02T14:22:57.128Z',
  teamSize: 0,
  techStack: [
    {
      id: 0,
      name: 'string',
    },
  ],
  responsibilities: [
    {
      id: 0,
      name: 'string',
    },
  ],
  teamRoles: [
    {
      id: 0,
      name: 'string',
    },
  ],
};

export const PROJECT_TEST_DATA_WITH_FORMATED_DATE = {
  id: 1,
  projectName: 'string',
  description: 'string',
  startDate: '02 05 2024',
  endDate: '02 05 2024',
  teamSize: 0,
  techStack: [
    {
      id: 0,
      name: 'string',
    },
  ],
  responsibilities: [
    {
      id: 0,
      name: 'string',
    },
  ],
  teamRoles: [
    {
      id: 0,
      name: 'string',
    },
  ],
};

export const PROJECT_CREATE_TEST_DATA = {
  projectName: 'string',
  description: 'string',
  startDate: '2024-05-02T14:22:57.128Z',
  endDate: '2024-05-02T14:22:57.128Z',
  teamSize: 0,
  techStack: ['string'],
  responsibilities: ['string'],
  teamRoles: ['string'],
};

export const PROJECT_TEST_FORMATED_DATA = {
  id: 1,
  ...PROJECT_CREATE_TEST_DATA,
};

export const CV_DATA = {
  id: 60,
  cvName: 'CV Angular',
  firstName: 'Artsiom',
  lastName: 'Karenka',
  email: 'employee2@mail.com',
  departmentId: 1,
  specializationId: 1,
  employeeId: 2,
  department: {
    id: 1,
    name: 'global',
  },
  language: [
    {
      id: 45,
      nameId: 3,
      levelId: 2,
      name: {
        id: 3,
        name: 'Deutch',
      },
      level: {
        id: 2,
        name: 'B2',
      },
    },
    {
      id: 46,
      nameId: 1,
      levelId: 1,
      name: {
        id: 1,
        name: 'English',
      },
      level: {
        id: 1,
        name: 'B1',
      },
    },
  ],
  skills: [
    {
      id: 1,
      name: 'angular',
    },
    {
      id: 17,
      name: 'css',
    },
    {
      id: 18,
      name: 'html',
    },
    {
      id: 19,
      name: 'ts',
    },
  ],
  specialization: {
    id: 1,
    name: 'angular',
  },
  cvsProjects: [
    {
      id: 31,
      projectName: 'Angular project',
      startDate: '2022-12-31T21:00:00.000Z',
      endDate: '2024-01-31T21:00:00.000Z',
      teamSize: 2,
      description:
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ad itaque vel cum nostrum\n      distinctio tenetur doloremque, aut impedit totam, voluptate dolores minima corrupti, ipsa\n      iusto. Iure eveniet officia atque.',
      responsibilities: [
        {
          id: 9,
          name: 'responsibility3',
        },
        {
          id: 10,
          name: 'responsibility2',
        },
        {
          id: 11,
          name: 'responsibility1',
        },
        {
          id: 13,
          name: 'create api',
        },
      ],
      teamRoles: [
        {
          id: 10,
          name: 'frontend',
        },
        {
          id: 11,
          name: 'backend',
        },
        {
          id: 12,
          name: 'devops',
        },
      ],
      techStack: [
        {
          id: 1,
          name: 'angular',
        },
        {
          id: 17,
          name: 'css',
        },
        {
          id: 18,
          name: 'html',
        },
        {
          id: 19,
          name: 'ts',
        },
      ],
    },
    {
      id: 32,
      projectName: 'React project',
      startDate: '2022-12-31T21:00:00.000Z',
      endDate: '2024-01-31T21:00:00.000Z',
      teamSize: 2,
      description:
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ad itaque vel cum nostrum\n      distinctio tenetur doloremque, aut impedit totam, voluptate dolores minima corrupti, ipsa\n      iusto. Iure eveniet officia atque.',
      responsibilities: [
        {
          id: 9,
          name: 'responsibility3',
        },
        {
          id: 10,
          name: 'responsibility2',
        },
        {
          id: 11,
          name: 'responsibility1',
        },
        {
          id: 13,
          name: 'create api',
        },
      ],
      teamRoles: [
        {
          id: 10,
          name: 'frontend',
        },
        {
          id: 11,
          name: 'backend',
        },
        {
          id: 12,
          name: 'devops',
        },
      ],
      techStack: [
        {
          id: 1,
          name: 'angular',
        },
        {
          id: 17,
          name: 'css',
        },
        {
          id: 18,
          name: 'html',
        },
        {
          id: 19,
          name: 'ts',
        },
      ],
    },
  ],
};

export const CV_DATA_FORMATED = {
  id: 60,
  cvName: 'CV Angular',
  firstName: 'Artsiom',
  lastName: 'Karenka',
  email: 'employee2@mail.com',
  departmentId: 1,
  specializationId: 1,
  employeeId: 2,
  department: 'global',
  language: [
    {
      name: {
        id: 3,
        name: 'Deutch',
      },
      level: {
        id: 2,
        name: 'B2',
      },
    },
    {
      name: {
        id: 1,
        name: 'English',
      },
      level: {
        id: 1,
        name: 'B1',
      },
    },
  ],
  skills: ['angular', 'css', 'html', 'ts'],
  specialization: 'angular',
  cvsProjects: [
    {
      id: 31,
      projectName: 'Angular project',
      startDate: '2022-12-31T21:00:00.000Z',
      endDate: '2024-01-31T21:00:00.000Z',
      teamSize: 2,
      description:
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ad itaque vel cum nostrum\n      distinctio tenetur doloremque, aut impedit totam, voluptate dolores minima corrupti, ipsa\n      iusto. Iure eveniet officia atque.',
      responsibilities: ['responsibility3', 'responsibility2', 'responsibility1', 'create api'],
      teamRoles: ['frontend', 'backend', 'devops'],
      techStack: ['angular', 'css', 'html', 'ts'],
    },
    {
      id: 32,
      projectName: 'React project',
      startDate: '2022-12-31T21:00:00.000Z',
      endDate: '2024-01-31T21:00:00.000Z',
      teamSize: 2,
      description:
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ad itaque vel cum nostrum\n      distinctio tenetur doloremque, aut impedit totam, voluptate dolores minima corrupti, ipsa\n      iusto. Iure eveniet officia atque.',
      responsibilities: ['responsibility3', 'responsibility2', 'responsibility1', 'create api'],
      teamRoles: ['frontend', 'backend', 'devops'],
      techStack: ['angular', 'css', 'html', 'ts'],
    },
  ],
};

export const EMPLOYEE_DATA = {
  id: 1,
  firstName: 'test employee10',
  lastName: 'test lastname',
  email: 'empltest@mail.com',
  departmentId: 1,
  specializationId: 1,
  department: {
    id: 1,
    name: 'global',
  },
  specialization: {
    id: 1,
    name: 'angular',
  },
  cvs: [
    {
      id: 51,
      cvName: '1234',
      firstName: 'test employee10',
      lastName: 'test lastname',
      email: 'empltest@mail.com',
      departmentId: 1,
      specializationId: 1,
      employeeId: 1,
      department: {
        id: 1,
        name: 'global',
      },
      language: [
        {
          id: 47,
          nameId: 1,
          levelId: 1,
          name: {
            id: 1,
            name: 'English',
          },
          level: {
            id: 1,
            name: 'B1',
          },
        },
      ],
      skills: [
        {
          id: 2,
          name: 'string44',
        },
      ],
      specialization: {
        id: 1,
        name: 'angular',
      },
      cvsProjects: [
        {
          id: 35,
          projectName: 'string1',
          startDate: '2024-04-02T13:36:23.448Z',
          endDate: '2024-04-02T13:36:23.448Z',
          teamSize: 6,
          description: 'string1',
          responsibilities: [
            {
              id: 2,
              name: 'string22',
            },
            {
              id: 3,
              name: 'string33',
            },
          ],
          teamRoles: [
            {
              id: 2,
              name: 'string1',
            },
            {
              id: 3,
              name: 'string2',
            },
          ],
          techStack: [
            {
              id: 2,
              name: 'string44',
            },
            {
              id: 3,
              name: 'string55',
            },
          ],
        },
      ],
    },
  ],
};

export const EMPLOYEE_DATA_FORMATED = {
  id: 1,
  firstName: 'test employee10',
  lastName: 'test lastname',
  email: 'empltest@mail.com',
  departmentId: 1,
  specializationId: 1,
  department: 'global',
  specialization: 'angular',
  cvs: [
    {
      id: 51,
      cvName: '1234',
      firstName: 'test employee10',
      lastName: 'test lastname',
      email: 'empltest@mail.com',
      departmentId: 1,
      specializationId: 1,
      employeeId: 1,
      department: 'global',
      language: [
        {
          name: {
            id: 1,
            name: 'English',
          },
          level: {
            id: 1,
            name: 'B1',
          },
        },
      ],
      skills: ['string44'],
      specialization: 'angular',
      cvsProjects: [
        {
          id: 35,
          projectName: 'string1',
          startDate: '2024-04-02T13:36:23.448Z',
          endDate: '2024-04-02T13:36:23.448Z',
          teamSize: 6,
          description: 'string1',
          responsibilities: ['string22', 'string33'],
          teamRoles: ['string1', 'string2'],
          techStack: ['string44', 'string55'],
        },
      ],
    },
  ],
};

export const TEST_EMPLOYEE_TABLE_COLUMNS = [
  {
    columnDef: 'id',
    header: 'home.employees.table.headers.id',
  },
  {
    columnDef: 'firstName',
    header: 'home.employees.table.headers.firstName',
  },
  {
    columnDef: 'lastName',
    header: 'home.employees.table.headers.lastName',
  },
  {
    columnDef: 'email',
    header: 'home.employees.table.headers.email',
  },
  {
    columnDef: 'department',
    header: 'home.employees.table.headers.department',
  },
  {
    columnDef: 'specialization',
    header: 'home.employees.table.headers.specialization',
  },
];
