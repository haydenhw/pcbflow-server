export const hasSampleProject = projects => (
  Boolean(
    projects.find((project) => project.isSampleProject)
  )
);

export const addSampleProject = (projects, sampleProject) => {
  if (hasSampleProject(projects)) {
    return projects;
  }

  return [sampleProject, ...projects];
}

export const getSampleProjectWithId = (sampleProject, id) => (
  Object.assign({}, sampleProject, { ownerId: id })
);

export const getProjectById = (projects, projectId) => (
  projects.find(project => projectId === project._id)
);

export const getIdFromUrl = (url) => {
  const splitUrl = url.split('/');
  const id = splitUrl[splitUrl.length -1];

  return id;
};

export const isDesignRoute = (url) => {
  return RegExp('design').test(url);
};

const getSampleProjectIndex = projects => (
  projects.findIndex((project) => (
    project.isSampleProject
  ))
);

const removeSampleProject = projects => (
  projects.filter((project) => (
    !project.isSampleProject
  ))
);


export const moveSampleProjectFront = projects => {
  const sampleProjectIndex = getSampleProjectIndex(projects);
  const withoutSampleProject = removeSampleProject(projects);

  if (projects.length === 0) {
    return [];
  }

  return [projects[sampleProjectIndex], ...withoutSampleProject ];
}
