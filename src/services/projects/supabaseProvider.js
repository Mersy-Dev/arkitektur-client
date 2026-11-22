const NOT_IMPLEMENTED = "Supabase projects provider is not implemented yet";

async function notImplemented() {
  throw new Error(NOT_IMPLEMENTED);
}

export const listProjects = notImplemented;
export const getProjectBySlug = notImplemented;
export const getLatestProjects = notImplemented;
export const getFeaturedProjects = notImplemented;
export const listCategories = notImplemented;
export const getAdjacentProjects = notImplemented;
export const createProject = notImplemented;
export const updateProject = notImplemented;
export const deleteProject = notImplemented;
export const uploadImage = notImplemented;
export const listAllProjectsForAdmin = notImplemented;
