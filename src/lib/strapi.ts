/**
 * Strapi CMS Client
 *
 * Connects to a Strapi headless CMS instance for managing
 * blog posts, projects, team members, testimonials, and other
 * dynamic content. Falls back to local Prisma database when
 * Strapi is not configured.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiRequestOptions {
  method?: string;
  path: string;
  data?: Record<string, unknown>;
  populate?: string[];
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination?: { page?: number; pageSize?: number };
}

interface StrapiResponse<T> {
  data: T | null;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
  };
}

/**
 * Make an authenticated request to the Strapi API
 */
export async function strapiRequest<T>(
  options: StrapiRequestOptions
): Promise<StrapiResponse<T>> {
  if (!STRAPI_URL || STRAPI_URL.includes("your-strapi-instance")) {
    return { data: null, error: { status: 503, name: "NotConfigured", message: "Strapi CMS is not configured" } };
  }

  const { method = "GET", path, data, populate, filters, sort, pagination } = options;

  // Build query string
  const params = new URLSearchParams();

  if (populate?.length) {
    params.set("populate", populate.join(","));
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.set(`filters[${key}]`, String(value));
    });
  }

  if (sort?.length) {
    params.set("sort", sort.join(","));
  }

  if (pagination) {
    if (pagination.page) params.set("pagination[page]", String(pagination.page));
    if (pagination.pageSize) params.set("pagination[pageSize]", String(pagination.pageSize));
  }

  const queryString = params.toString();
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      body: data ? JSON.stringify({ data }) : undefined,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          status: response.status,
          name: "StrapiError",
          message: result.error?.message || "Unknown Strapi error",
        },
      };
    }

    return result as StrapiResponse<T>;
  } catch (err) {
    return {
      data: null,
      error: {
        status: 500,
        name: "NetworkError",
        message: err instanceof Error ? err.message : "Failed to connect to Strapi",
      },
    };
  }
}

/**
 * Strapi CMS Helper Functions
 */

// Blog Posts
export async function getBlogPosts(options?: {
  page?: number;
  pageSize?: number;
  category?: string;
  featured?: boolean;
}) {
  return strapiRequest({
    path: "/posts",
    populate: ["coverImage", "author", "category", "tags"],
    sort: ["createdAt:desc"],
    filters: {
      published: true,
      ...(options?.category ? { category: options.category } : {}),
      ...(options?.featured !== undefined ? { featured: options.featured } : {}),
    },
    pagination: {
      page: options?.page || 1,
      pageSize: options?.pageSize || 10,
    },
  });
}

export async function getBlogPost(slug: string) {
  return strapiRequest({
    path: `/posts`,
    populate: ["coverImage", "author", "category", "tags"],
    filters: { slug, published: true },
  });
}

// Projects
export async function getProjects(options?: {
  page?: number;
  pageSize?: number;
  category?: string;
  featured?: boolean;
}) {
  return strapiRequest({
    path: "/projects",
    populate: ["coverImage", "images", "technologies"],
    sort: ["createdAt:desc"],
    filters: {
      published: true,
      ...(options?.category ? { category: options.category } : {}),
      ...(options?.featured !== undefined ? { featured: options.featured } : {}),
    },
    pagination: {
      page: options?.page || 1,
      pageSize: options?.pageSize || 10,
    },
  });
}

export async function getProject(slug: string) {
  return strapiRequest({
    path: "/projects",
    populate: ["coverImage", "images", "technologies"],
    filters: { slug, published: true },
  });
}

// Team Members
export async function getTeamMembers() {
  return strapiRequest({
    path: "/team-members",
    populate: ["image"],
    sort: ["order:asc"],
    filters: { published: true },
  });
}

// Testimonials
export async function getTestimonials(options?: { featured?: boolean }) {
  return strapiRequest({
    path: "/testimonials",
    populate: ["avatar"],
    sort: ["createdAt:desc"],
    filters: {
      published: true,
      ...(options?.featured !== undefined ? { featured: options.featured } : {}),
    },
  });
}

// Services
export async function getServices() {
  return strapiRequest({
    path: "/services",
    populate: ["icon"],
    sort: ["order:asc"],
    filters: { published: true },
  });
}

// Job Openings
export async function getJobOpenings() {
  return strapiRequest({
    path: "/job-openings",
    populate: [],
    sort: ["createdAt:desc"],
    filters: { published: true },
  });
}

// Site Settings
export async function getSiteSetting(key: string) {
  return strapiRequest({
    path: "/site-settings",
    filters: { key },
  });
}
