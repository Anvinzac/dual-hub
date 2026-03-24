import { useState } from "react";
import BusinessAppCard from "./BusinessAppCard";
import BusinessStatCards from "@/features/hub/components/BusinessStatCards";
import HubCategoryList from "@/features/hub/components/HubCategoryList";
import HubHeader from "@/features/hub/components/HubHeader";
import HubSearchInput from "@/features/hub/components/HubSearchInput";
import {
  businessApps,
  businessCategories,
  businessHeader,
  businessStats,
} from "@/features/hub/data";

const BusinessExpandedHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(businessCategories[0]?.label ?? "");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleApps = businessApps.filter((app) => {
    const matchesCategory =
      activeCategory === "Tất cả" || app.category === activeCategory;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      app.title.toLowerCase().includes(normalizedQuery) ||
      app.description.toLowerCase().includes(normalizedQuery) ||
      app.category.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="h-full flex flex-col bg-business-bg business-scroll overflow-y-auto">
      <HubHeader
        badgeIcon={businessHeader.badgeIcon}
        badgeLabel={businessHeader.badgeLabel}
        title={businessHeader.title}
        description={businessHeader.description}
        badgeIconClassName="w-4 h-4 text-business-accent"
        badgeLabelClassName="text-xs font-medium text-business-accent uppercase tracking-widest"
        titleClassName="font-business text-3xl font-bold text-business-text leading-tight"
        descriptionClassName="text-business-text-muted text-sm mt-1"
      />

      <div className="px-5 pb-3">
        <HubSearchInput
          placeholder={businessHeader.searchPlaceholder}
          iconClassName="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-business-text-muted"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-business-surface text-business-text text-sm border border-business-border focus:border-business-accent/50 outline-none transition-colors placeholder:text-business-text-muted/60"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="px-5 pb-4">
        <HubCategoryList
          categories={businessCategories}
          activeLabel={activeCategory}
          onSelect={setActiveCategory}
          buttonClassName="shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-all"
          activeClassName="bg-business-accent text-business-text"
          inactiveClassName="bg-business-surface text-business-text-muted border border-business-border hover:border-business-accent/30"
        />
      </div>

      <div className="px-5 pb-4">
        <BusinessStatCards stats={businessStats} />
      </div>

      <div data-testid="business-app-list" className="px-5 pb-8 flex flex-col gap-2.5">
        {visibleApps.map((app) => (
          <BusinessAppCard key={app.title} {...app} />
        ))}
      </div>
    </div>
  );
};

export default BusinessExpandedHub;
