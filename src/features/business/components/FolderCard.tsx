import { ChevronDown, ChevronRight, Folder } from "lucide-react";

import ChildAppStats from "@/features/business/components/ChildAppStats";
import { AppFolder } from "@/features/business/data/apps";

interface FolderCardProps {
  folder: AppFolder;
  appCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FolderCard = ({ folder, appCount, isOpen, onToggle }: FolderCardProps) => {
  const ToggleIcon = isOpen ? ChevronDown : ChevronRight;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="relative w-full rounded-[1.45rem] bg-business-surface/95 px-4 pb-4 pt-5 text-left active:scale-[0.995] transition-all duration-300"
    >
      <div
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-business-accent/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-business-accent/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-business-accent-soft flex items-center justify-center shrink-0 border border-business-border">
            <Folder className={`w-5 h-5 ${folder.accent}`} />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold font-display text-foreground">{folder.name}</p>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{folder.description}</p>
            <div className="mt-3 hidden lg:flex flex-col gap-2">
              {folder.childApps.slice(0, 3).map((child) => (
                <div
                  key={child.id}
                  className="flex items-center gap-3 rounded-xl border border-business-border/70 bg-business-bg/82 px-3 py-2.5"
                  aria-hidden="true"
                >
                  <div className="w-9 h-9 rounded-lg bg-business-accent-soft border border-business-border flex items-center justify-center text-xs font-semibold text-business-text shrink-0">
                    {child.iconLabel}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-business-text line-clamp-1">
                      {child.name}
                    </p>
                    <ChildAppStats
                      hearts={child.hearts}
                      tryouts={child.tryouts}
                      forks={child.forks}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-business-text-muted">
              <span className="px-2.5 py-1 rounded-full bg-business-accent-soft text-business-text">
                {appCount} tools
              </span>
              <span>{isOpen ? "Folder open" : "Tap to open"}</span>
            </div>
          </div>
        </div>
        <ToggleIcon className="w-4 h-4 text-business-text-muted shrink-0 mt-1" />
      </div>
    </button>
  );
};

export default FolderCard;
