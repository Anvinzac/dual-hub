import { fetchCatalogApps } from "@/features/admin/lib/catalog";
import { remixes as fallbackRemixes, type AppMeta, type RemixMeta } from "@/features/business/data/apps";

export async function fetchApps(): Promise<AppMeta[]> {
  const catalog = await fetchCatalogApps("business");

  return catalog.map((app) => ({
    id: app.id,
    name: app.name,
    url: app.url,
    repo: app.repo,
    screenshot: app.imageUrl ?? "",
    templates: app.tags,
    type: [app.category],
    hearts: app.favorites,
    tryouts: app.tryouts,
    forks: app.forks,
    description: app.description,
  }));
}

export async function fetchRemixes(appId?: string): Promise<RemixMeta[]> {
  return appId ? fallbackRemixes.filter((r) => r.appId === appId) : fallbackRemixes;
}

export async function submitApp(data: {
  name: string;
  repo: string;
  description?: string;
  category?: string;
}): Promise<void> {
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const catalog = await fetchCatalogApps("business");
  const next = {
    id,
    audience: "business" as const,
    name: data.name,
    description: data.description || "",
    url: "",
    repo: data.repo,
    imageUrl: "",
    tags: data.category ? [data.category] : [],
    category: data.category || "General",
    favorites: 0,
    tryouts: 0,
    forks: 0,
  };

  if (catalog.some((entry) => entry.id === id)) {
    throw new Error("App id already exists");
  }

  const { upsertCatalogApp } = await import("@/features/admin/lib/catalog");
  await upsertCatalogApp(next);
}
