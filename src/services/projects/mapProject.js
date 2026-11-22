/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} location
 * @property {string} category
 * @property {string} shortDescription
 * @property {string} description
 * @property {string} coverImage
 * @property {string[]} gallery
 * @property {string} size
 * @property {number} year
 * @property {string} client
 * @property {boolean} featured
 * @property {boolean} published
 * @property {string} createdAt
 */

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled-project";
}

/**
 * Converts a camelCase or snake_case database record into the app Project shape.
 * @param {Record<string, unknown> | null | undefined} raw
 * @returns {Project}
 */
export function mapProject(raw = {}) {
  const record = raw && typeof raw === "object" ? raw : {};
  const title = String(record.title ?? "");

  const providedSlug = String(record.slug ?? "").trim();

  return {
    id: String(record.id ?? ""),
    slug: providedSlug || slugify(title),
    title,
    location: String(record.location ?? ""),
    category: String(record.category ?? ""),
    shortDescription: String(record.shortDescription ?? record.short_description ?? ""),
    description: String(record.description ?? ""),
    coverImage: String(record.coverImage ?? record.cover_image ?? ""),
    gallery: Array.isArray(record.gallery) ? record.gallery.map(String) : [],
    size: String(record.size ?? ""),
    year: Number(record.year ?? 0),
    client: String(record.client ?? ""),
    featured: record.featured === true,
    published: record.published == null ? true : Boolean(record.published),
    createdAt: String(record.createdAt ?? record.created_at ?? ""),
  };
}
