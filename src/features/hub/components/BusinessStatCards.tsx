import type { BusinessStat } from "@/features/hub/types";

interface BusinessStatCardsProps {
  stats: BusinessStat[];
}

const BusinessStatCards = ({ stats }: BusinessStatCardsProps) => {
  return (
    <div className="flex gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex-1 rounded-lg bg-business-surface border border-business-border p-3">
          <p className="text-business-text-muted text-[10px] uppercase tracking-wider">{stat.label}</p>
          <p className="text-business-text font-business text-xl font-bold mt-0.5">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default BusinessStatCards;
