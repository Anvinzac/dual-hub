import { supabase } from "@/integrations/supabase/client";

type AppStatsRow = {
  app_id: string;
  hearts: number;
  tryouts: number;
};

const callStatsRpc = async (
  procedure: "increment_tryouts" | "increment_hearts" | "decrement_hearts",
  appId: string,
) => {
  await supabase.rpc(procedure, { _app_id: appId }).throwOnError();
};

export const incrementTryouts = async (appId: string) => {
  try {
    await callStatsRpc("increment_tryouts", appId);
  } catch {
    // Silent fail per spec
  }
};

export const incrementHearts = async (appId: string) => {
  try {
    await callStatsRpc("increment_hearts", appId);
  } catch {
    // Silent fail
  }
};

export const decrementHearts = async (appId: string) => {
  try {
    await callStatsRpc("decrement_hearts", appId);
  } catch {
    // Silent fail
  }
};

export const fetchAllStats = async (): Promise<Record<string, { hearts: number; tryouts: number }>> => {
  try {
    const { data } = await supabase.from("app_stats").select("*");
    const map: Record<string, { hearts: number; tryouts: number }> = {};
    (data as AppStatsRow[] | null)?.forEach((row) => {
      map[row.app_id] = { hearts: row.hearts, tryouts: row.tryouts };
    });
    return map;
  } catch {
    return {};
  }
};
