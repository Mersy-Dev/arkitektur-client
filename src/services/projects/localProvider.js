import { projectsSample } from "../../data/projects.sample.js";
import { mapProject } from "./mapProject.js";

const ADMIN_ERROR = "Admin writes need the backend, not available yet";

function waitShortly() {
  const delay = 250 + Math.floor(Math.random() * 201);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function publishedProjects() {
  return projectsSample
    .map(mapProject)
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function listProjects({ category, search, page = 1, pageSize = 6 } = {}) {
  await waitShortly();
  let items = publishedProjects();

  if (category && category !== "All") {
    items = items.filter((project) => project.category === category);
  }

  if (search) {
    const needle = String(search).trim().toLowerCase();
    if (needle) {
      items = items.filter((project) =>
        [project.title, project.location, project.category].some((value) =>
          value.toLowerCase().includes(needle)
        )
      );
    }
  }

  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.max(1, Number(pageSize) || 6);
  const start = (safePage - 1) * safePageSize;
  const pagedItems = items.slice(start, start + safePageSize);

  return {
    items: pagedItems,
    total: items.length,
    page: safePage,
    pageSize: safePageSize,
    hasMore: start + pagedItems.length < items.length,
  };
}

export async function getProjectBySlug(slug) {
  await waitShortly();
  return publishedProjects().find((project) => project.slug === slug) ?? null;
}

export async function getLatestProjects(limit = 6) {
  await waitShortly();
  return publishedProjects().slice(0, Math.max(0, Number(limit) || 0));
}

export async function getFeaturedProjects(limit = 4) {
  await waitShortly();
  return publishedProjects()
    .filter((project) => project.featured)
    .slice(0, Math.max(0, Number(limit) || 0));
}

export async function listCategories() {
  await waitShortly();
  return [...new Set(publishedProjects().map((project) => project.category).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export async function getAdjacentProjects(slug) {
  await waitShortly();
  const projects = publishedProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

export async function createProject() {
  throw new Error(ADMIN_ERROR);
}

export async function updateProject() {
  throw new Error(ADMIN_ERROR);
}

export async function deleteProject() {
  throw new Error(ADMIN_ERROR);
}

export async function uploadImage() {
  throw new Error(ADMIN_ERROR);
}

export async function listAllProjectsForAdmin() {
  throw new Error(ADMIN_ERROR);
}
