// Switch VITE_DATA_PROVIDER=local or =supabase to choose the implementation.
// Each provider exports the public and admin function names below with the same
// Promise-based return shapes; only this file may be imported by application code.

import * as localProvider from "./localProvider.js";
import * as supabaseProvider from "./supabaseProvider.js";

const providerName = import.meta.env.VITE_DATA_PROVIDER || "local";
const provider = providerName === "supabase" ? supabaseProvider : localProvider;

export const {
  listProjects,
  getProjectBySlug,
  getLatestProjects,
  getFeaturedProjects,
  listCategories,
  getAdjacentProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  listAllProjectsForAdmin,
} = provider;
