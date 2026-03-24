import { ArrowRight } from "lucide-react";

interface BusinessAppCardProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

const BusinessAppCard = ({ title, description, category, icon }: BusinessAppCardProps) => {
  return (
    <div className="group relative rounded-lg border border-business-border bg-business-surface/60 backdrop-blur-sm p-4 hover:border-business-accent/40 transition-all duration-300 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-business-accent-soft flex items-center justify-center text-business-accent">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-business text-sm font-semibold text-business-text truncate">{title}</h3>
            <ArrowRight className="w-3.5 h-3.5 text-business-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-business-text-muted text-xs mt-0.5 line-clamp-2">{description}</p>
          <span className="inline-block mt-2 text-[10px] font-medium text-business-accent bg-business-accent-soft px-2 py-0.5 rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessAppCard;
