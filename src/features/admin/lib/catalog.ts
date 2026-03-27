import { supabase } from "@/integrations/supabase/client";
import {
  apps as businessFallbackApps,
  remixes as businessFallbackRemixes,
} from "@/features/business/data/apps";
import { consumerApps as consumerFallbackApps } from "@/features/admin/lib/consumer-seed";

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

type CatalogTableRow = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  repo: string | null;
  image_url: string | null;
  tags: string[] | null;
  category: string | null;
  forks: number | null;
  created_at: string | null;
  updated_at: string | null;
};

type StatsRow = {
  app_id: string;
  favorites: number | null;
  tryouts: number | null;
  forks: number | null;
};

type CatalogDatabase = {
  from: (table: string) => {
    select: (columns?: string) => Promise<{ data: unknown[] | null; error: { code?: string; message?: string } | null }>;
    order: (
      column: string,
      options: { ascending: boolean },
    ) => {
      select: (columns?: string) => Promise<{ data: unknown[] | null; error: { code?: string; message?: string } | null }>;
    };
    upsert: (payload: unknown, options?: { onConflict?: string }) => Promise<{ error: { code?: string; message?: string } | null }>;
    delete: () => {
      eq: (
        column: string,
        value: string,
      ) => Promise<{ error: { code?: string; message?: string } | null }>;
    };
  };
};

const db = supabase as unknown as CatalogDatabase;

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
    id: app.id,
    audience: "consumer",
    name: app.name,
    description: app.description,
    url: app.url,
    repo: app.repo,
    imageUrl: app.imageUrl,
    tags: [...app.tags],
    category: app.tags[0] ?? "Nổi bật",
    favorites: app.favorites,
    tryouts: app.tryouts,
    forks: app.forks,
  }));

const fallbackAppsForAudience = (audience: Audience) =>
  audience === "consumer" ? mapConsumerFallback() : mapBusinessFallback();

export const fetchCatalogApps = async (audience: Audience): Promise<CatalogApp[]> => {
  try {
    const table = audience === "consumer" ? "consumer_apps" : "business_apps";
    const statsTable = audience === "consumer" ? "consumer_app_stats" : "business_app_stats";
    const { data: appsData, error: appsError } = await db
      .from(table)
      .order("created_at", { ascending: true })
      .select("*");
    const { data: statsData } = await db.from(statsTable).select("*");

    if (appsError || !appsData || appsData.length === 0) return fallbackAppsForAudience(audience);

    const statsMap = new Map<string, { favorites: number; tryouts: number; forks: number }>();
    (statsData ?? []).forEach((row) => {
      const typedRow = row as StatsRow;
      statsMap.set(typedRow.app_id, {
        favorites: typedRow.favorites ?? 0,
        tryouts: typedRow.tryouts ?? 0,
        forks: typedRow.forks ?? 0,
      });
    });

    return appsData.map((row) => {
      const typedRow = row as CatalogTableRow;
      const stats = statsMap.get(typedRow.id) ?? {
        favorites: 0,
        tryouts: 0,
        forks: typedRow.forks ?? 0,
      };

      return {
        id: typedRow.id,
        audience,
        name: typedRow.name,
        description: typedRow.description ?? "",
        url: typedRow.url ?? "",
        repo: typedRow.repo ?? "",
        imageUrl: typedRow.image_url ?? undefined,
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

  const { error: statsError } = await db.from(statsTable).upsert(
    {
      app_id: app.id,
      favorites: app.favorites,
      tryouts: app.tryouts,
      forks: app.forks,
    },
    { onConflict: "app_id" },
  );

  if (statsError) throw statsError;
};

export const deleteCatalogApp = async (audience: Audience, id: string) => {
  const table = audience === "consumer" ? "consumer_apps" : "business_apps";
  const statsTable = audience === "consumer" ? "consumer_app_stats" : "business_app_stats";
  await db.from(statsTable).delete().eq("app_id", id);
  await db.from(table).delete().eq("id", id);
};

export const businessSeeds = businessFallbackRemixes;
