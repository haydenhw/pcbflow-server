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

export const getProjectById = (projects, projectId) => (
  projects.find(project => projectId === project._id)
);
