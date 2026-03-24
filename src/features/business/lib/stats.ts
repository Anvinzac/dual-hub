import { supabase } from "@/integrations/supabase/client";

type AppStatsRow = {
  app_id: string;
  favorites: number;
  tryouts: number;
  forks: number;
};

type AdminDb = {
  from: (table: string) => {
    select: (columns?: string) => Promise<{ data: Array<{ app_id: string; favorites?: number; tryouts: number; forks?: number }> | null }>;
    upsert: (payload: unknown, options?: { onConflict?: string }) => Promise<unknown>;
  };
  rpc: (procedure: string, args: { _app_id: string }) => { throwOnError: () => Promise<void> };
};

const db = supabase as unknown as AdminDb;

const callStatsRpc = async (
  procedure: "increment_tryouts" | "increment_hearts" | "decrement_hearts",
  appId: string,
) => {
  await db.rpc(procedure, { _app_id: appId }).throwOnError();
};

const table = "business_app_stats";

export const incrementTryouts = async (appId: string) => {
  try {
    await callStatsRpc("increment_tryouts", appId);
  } catch {
    await db.from(table).upsert({ app_id: appId, tryouts: 1 }, { onConflict: "app_id" });
  }
};

export const incrementHearts = async (appId: string) => {
  try {
    await callStatsRpc("increment_hearts", appId);
  } catch {
    await db.from(table).upsert({ app_id: appId, favorites: 1 }, { onConflict: "app_id" });
  }
};

export const decrementHearts = async (appId: string) => {
  try {
    await callStatsRpc("decrement_hearts", appId);
  } catch {
    await db.from(table).upsert({ app_id: appId, favorites: 0 }, { onConflict: "app_id" });
  }
};

export const fetchAllStats = async (): Promise<Record<string, { hearts: number; tryouts: number }>> => {
  try {
    const { data } = await db.from(table).select("*");
    const map: Record<string, { hearts: number; tryouts: number }> = {};
    (data as AppStatsRow[] | null)?.forEach((row) => {
      map[row.app_id] = { hearts: row.favorites, tryouts: row.tryouts };
    });
    return map;
  } catch {
    return {};
  }
};
