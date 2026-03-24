import type { LucideIcon } from "lucide-react";

export type ActivePanel = "none" | "consumer" | "business";
export type Audience = Exclude<ActivePanel, "none">;

export interface CategoryOption {
  label: string;
  icon?: LucideIcon;
}

export interface ConsumerPreviewApp {
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface BusinessPreviewApp {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export interface ConsumerApp {
  title: string;
  description: string;
  tags: string[];
  plays: number;
  favorites: number;
  imageUrl: string;
  url: string;
}

export interface BusinessApp {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export interface BusinessStat {
  label: string;
  value: string;
}
