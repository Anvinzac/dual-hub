import { useEffect, useState } from "react";
import { db, type ConsumerAppRecord } from "@/lib/localDb";
import { consumerPreviewApps as fallback } from "@/features/hub/data";
import type { ConsumerPreviewApp } from "@/features/hub/types";

async function seedIfEmpty() {
  const count = await db.consumerApps.count();
  if (count === 0) {
    await db.consumerApps.bulkAdd(
      fallback.map((app) => ({
        name: app.name,
        description: app.description,
        imageUrl: app.imageUrl,
        tags: [...app.tags],
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
          })),
        );
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { apps, loading };
}
