export interface ConsumerAppRecord {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  status: string;
}

const STORAGE_KEY = "dual-hub-consumer-apps";

const readStorage = (): ConsumerAppRecord[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsumerAppRecord[]) : [];
  } catch {
    return [];
  }
};

const writeStorage = (records: ConsumerAppRecord[]) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const db = {
  consumerApps: {
    async count() {
      return readStorage().length;
    },
    async bulkAdd(records: ConsumerAppRecord[]) {
      const current = readStorage();
      const next = [...current, ...records.map((record, index) => ({ ...record, id: current.length + index + 1 }))];
      writeStorage(next);
    },
    async putAll(records: ConsumerAppRecord[]) {
      writeStorage(records.map((record, index) => ({ ...record, id: index + 1 })));
    },
    async toArray() {
      return readStorage();
    },
  },
};
