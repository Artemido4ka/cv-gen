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
