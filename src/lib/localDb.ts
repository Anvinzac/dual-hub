import Dexie, { type EntityTable } from "dexie";

export interface ConsumerAppRecord {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const db = new Dexie("DualHubDB") as Dexie & {
  consumerApps: EntityTable<ConsumerAppRecord, "id">;
};

db.version(1).stores({
  consumerApps: "++id, name",
});

export { db };
