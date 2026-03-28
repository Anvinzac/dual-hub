import { useEffect, useState } from "react";
import { db, type ConsumerAppRecord } from "@/lib/localDb";
import { consumerApps as fallback } from "@/features/admin/lib/consumer-seed";
import type { ConsumerPreviewApp } from "@/features/hub/types";

async function seedIfEmpty() {
  const records = await db.consumerApps.toArray();
  const seedNames = fallback.map((app) => app.name);
  const storedNames = records.map((record) => record.name);
  const isCurrentSeed =
    records.length === fallback.length &&
    seedNames.every((name, index) => storedNames[index] === name);

  if (!isCurrentSeed) {
    await db.consumerApps.putAll(
      fallback.map((app) => ({
        name: app.name,
        description: app.description,
        imageUrl: app.imageUrl ?? "",
        tags: [...app.tags],
        status: "Live catalog",
      })),
    );
  }
}

export function useConsumerPreviewApps() {
  const [apps, setApps] = useState<ConsumerPreviewApp[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await seedIfEmpty();
      const records = await db.consumerApps.toArray();
      if (!cancelled) {
        setApps(
          records.map((r: ConsumerAppRecord) => ({
            name: r.name,
            description: r.description,
            imageUrl: r.imageUrl,
            tags: r.tags,
            status: r.status,
          })),
        );
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { apps, loading };
}
