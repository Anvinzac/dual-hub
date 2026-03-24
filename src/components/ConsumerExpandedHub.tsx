import { useState } from "react";
import ConsumerAppCard from "./ConsumerAppCard";
import HubCategoryList from "@/features/hub/components/HubCategoryList";
import HubHeader from "@/features/hub/components/HubHeader";
import HubSearchInput from "@/features/hub/components/HubSearchInput";
import { useAudienceCatalog } from "@/features/admin/hooks/useAudienceCatalog";
import {
  consumerCategories,
  consumerHeader,
} from "@/features/hub/data";

const ConsumerExpandedHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(consumerCategories[0]?.label ?? "");
  const SectionIcon = consumerHeader.sectionIcon;
  const { data: consumerApps = [] } = useAudienceCatalog("consumer");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleApps = consumerApps.filter((app) => {
    const matchesCategory =
      activeCategory === "Nổi bật" || app.tags.includes(activeCategory);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      app.name.toLowerCase().includes(normalizedQuery) ||
      app.description.toLowerCase().includes(normalizedQuery) ||
      app.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="h-full flex flex-col bg-consumer-bg consumer-scroll overflow-y-auto">
      <HubHeader
        badgeIcon={consumerHeader.badgeIcon}
        badgeLabel={consumerHeader.badgeLabel}
        title={consumerHeader.title}
        description={consumerHeader.description}
        badgeIconClassName="w-5 h-5 text-consumer-amber fill-consumer-amber"
        badgeLabelClassName="text-xs font-semibold text-consumer-coral uppercase tracking-wider"
        titleClassName="font-playful text-3xl font-extrabold text-consumer-text leading-tight"
        descriptionClassName="text-consumer-text-muted text-sm mt-1"
      />

      <div className="px-5 pb-3">
        <HubSearchInput
          placeholder={consumerHeader.searchPlaceholder}
          iconClassName="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-consumer-text-muted"
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-consumer-surface text-consumer-text text-base border-2 border-consumer-coral/15 focus:border-consumer-coral/40 outline-none transition-colors placeholder:text-consumer-text-muted/60"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="px-5 pb-4">
        <HubCategoryList
          categories={consumerCategories}
          activeLabel={activeCategory}
          onSelect={setActiveCategory}
          buttonClassName="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all"
          activeClassName="bg-consumer-coral text-consumer-surface shadow-md"
          inactiveClassName="bg-consumer-surface text-consumer-text-muted hover:bg-consumer-coral/10"
          iconClassName="w-4.5 h-4.5"
        />
      </div>

      <div className="px-5 pb-3">
        <div className="flex items-center gap-2">
          <SectionIcon className="w-5 h-5 text-consumer-magenta" />
          <h2 className="font-playful text-xl font-bold text-consumer-text">{consumerHeader.sectionTitle}</h2>
        </div>
      </div>

      <div data-testid="consumer-app-grid" className="px-5 pb-8 grid grid-cols-2 gap-3">
        {visibleApps.map((app) => (
          <ConsumerAppCard
            key={app.id}
            title={app.name}
            description={app.description}
            tags={app.tags}
            plays={app.tryouts}
            favorites={app.favorites}
            imageUrl={app.imageUrl ?? ""}
            url={app.url || "#"}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsumerExpandedHub;
