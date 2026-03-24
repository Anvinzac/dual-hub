import { supabase } from "@/integrations/supabase/client";
import {
  apps as businessFallbackApps,
  remixes as businessFallbackRemixes,
} from "@/features/business/data/apps";
import { consumerApps as consumerFallbackApps } from "@/features/hub/data";

export type Audience = "consumer" | "business";

export interface CatalogApp {
  id: string;
  audience: Audience;
  name: string;
  description: string;
  url: string;
  repo: string;
  imageUrl?: string;
  iconName?: string;
  tags: string[];
  category: string;
  favorites: number;
  tryouts: number;
  forks: number;
  createdAt?: string;
  updatedAt?: string;
}

type SupabaseQueryResult<T> = Promise<{ data: T | null; error: { code?: string; message?: string } | null }>;

type AdminDb = {
  from: (table: string) => {
    select: (columns?: string) => SupabaseQueryResult<unknown[]>;
    order: (column: string, options: { ascending: boolean }) => {
      select: (columns?: string) => SupabaseQueryResult<unknown[]>;
    };
    upsert: (payload: unknown, options?: { onConflict?: string }) => SupabaseQueryResult<unknown>;
    delete: () => {
      eq: (column: string, value: string) => SupabaseQueryResult<unknown>;
    };
    eq: (column: string, value: string) => {
      select: (columns?: string) => SupabaseQueryResult<unknown[]>;
    };
  };
};

const db = supabase as unknown as AdminDb;

const mapBusinessFallback = (): CatalogApp[] =>
  businessFallbackApps.map((app) => ({
    id: app.id,
    audience: "business",
    name: app.name,
    description: app.description ?? "",
    url: app.url,
    repo: app.repo,
    tags: [...app.templates],
    category: app.type[0] ?? "General",
    favorites: app.hearts,
    tryouts: app.tryouts,
    forks: app.forks,
  }));

const mapConsumerFallback = (): CatalogApp[] =>
  consumerFallbackApps.map((app) => ({
    id: app.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    audience: "consumer",
    name: app.title,
    description: app.description,
    url: app.url,
    repo: "",
    imageUrl: app.imageUrl,
    tags: [...app.tags],
    category: app.tags[0] ?? "Nổi bật",
    favorites: app.favorites,
    tryouts: app.plays,
    forks: 0,
  }));

const fallbackAppsForAudience = (audience: Audience) =>
  audience === "consumer" ? mapConsumerFallback() : mapBusinessFallback();

export const fetchCatalogApps = async (audience: Audience): Promise<CatalogApp[]> => {
  try {
    const table = audience === "consumer" ? "consumer_apps" : "business_apps";
    const statsTable = audience === "consumer" ? "consumer_app_stats" : "business_app_stats";
    const { data: appsData, error: appsError } = await db.from(table).order("created_at", { ascending: true }).select("*");
    const { data: statsData } = await db.from(statsTable).select("*");
    if (appsError || !appsData) return fallbackAppsForAudience(audience);

    const statsMap = new Map<string, { favorites: number; tryouts: number; forks: number }>();
    (statsData ?? []).forEach((row) => {
      const typedRow = row as { app_id: string; favorites?: number; hearts?: number; tryouts?: number; forks?: number };
      statsMap.set(typedRow.app_id, {
        favorites: typedRow.favorites ?? typedRow.hearts ?? 0,
        tryouts: typedRow.tryouts ?? 0,
        forks: typedRow.forks ?? 0,
      });
    });

    return appsData.map((row) => {
      const typedRow = row as {
        id: string;
        name: string;
        description?: string | null;
        url?: string | null;
        repo?: string | null;
        image_url?: string | null;
        imageUrl?: string | null;
        tags?: string[] | null;
        category?: string | null;
        favorites?: number | null;
        tryouts?: number | null;
        forks?: number | null;
        created_at?: string | null;
        updated_at?: string | null;
      };
      const stats = statsMap.get(typedRow.id) ?? { favorites: typedRow.favorites ?? 0, tryouts: typedRow.tryouts ?? 0, forks: typedRow.forks ?? 0 };
      return {
        id: typedRow.id,
        audience,
        name: typedRow.name,
        description: typedRow.description ?? "",
        url: typedRow.url ?? "",
        repo: typedRow.repo ?? "",
        imageUrl: typedRow.image_url ?? typedRow.imageUrl ?? undefined,
        tags: typedRow.tags ?? [],
        category: typedRow.category ?? typedRow.tags?.[0] ?? "General",
        favorites: stats.favorites,
        tryouts: stats.tryouts,
        forks: stats.forks,
        createdAt: typedRow.created_at ?? undefined,
        updatedAt: typedRow.updated_at ?? undefined,
      };
    });
  } catch {
    return fallbackAppsForAudience(audience);
  }
};

export const upsertCatalogApp = async (app: CatalogApp) => {
  const table = app.audience === "consumer" ? "consumer_apps" : "business_apps";
  const statsTable = app.audience === "consumer" ? "consumer_app_stats" : "business_app_stats";
  const payload = {
    id: app.id,
    name: app.name,
    description: app.description,
    url: app.url,
    repo: app.repo,
    image_url: app.imageUrl ?? null,
    tags: app.tags,
    category: app.category,
    forks: app.forks,
  };

  const { error } = await db.from(table).upsert(payload, { onConflict: "id" });
  if (error) throw error;

  await db.from(statsTable).upsert({
    app_id: app.id,
    favorites: app.favorites,
    tryouts: app.tryouts,
    forks: app.forks,
  }, { onConflict: "app_id" });
};

export const deleteCatalogApp = async (audience: Audience, id: string) => {
  const table = audience === "consumer" ? "consumer_apps" : "business_apps";
  const statsTable = audience === "consumer" ? "consumer_app_stats" : "business_app_stats";
  await db.from(statsTable).delete().eq("app_id", id);
  await db.from(table).delete().eq("id", id);
};

export const seedBusinessCatalog = businessFallbackRemixes;
