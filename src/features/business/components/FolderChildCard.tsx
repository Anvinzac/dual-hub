import { ArrowRight, Heart } from "lucide-react";

import ChildAppStats from "@/features/business/components/ChildAppStats";
import { FolderChildApp } from "@/features/business/data/apps";

interface FolderChildCardProps {
  app: FolderChildApp;
  isLiked: boolean;
  onOpen: (app: FolderChildApp) => void;
  onHeart: (appId: string) => void;
}

const FolderChildCard = ({ app, isLiked, onOpen, onHeart }: FolderChildCardProps) => {
  return (
    <article className="rounded-2xl border border-business-border/70 bg-business-bg/88 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
      <button type="button" onClick={() => onOpen(app)} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-2xl bg-business-accent-soft flex items-center justify-center text-sm font-semibold text-business-text border border-business-border shrink-0">
            {app.iconLabel}
          </div>
          <ChildAppStats hearts={app.hearts} tryouts={app.tryouts} forks={app.forks} />
        </div>

        <div className="mt-3">
          <p className="text-base font-semibold font-display text-business-text">{app.name}</p>
          <p className="text-sm uppercase tracking-[0.14em] text-business-text-muted mt-1.5">{app.subtitle}</p>
          <p className="text-sm text-business-text-muted mt-2.5 line-clamp-3 leading-relaxed">{app.description}</p>
        </div>
      </button>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label={`Favorite ${app.name}`}
          className="inline-flex items-center justify-center rounded-full border border-business-border/70 bg-business-surface/70 p-2 text-business-text-muted active:scale-95 transition-transform"
          onClick={() => onHeart(app.id)}
        >
          <Heart size={14} className={isLiked ? "fill-coral text-coral" : ""} />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-electric px-3.5 py-2 text-sm font-semibold text-primary-foreground active:scale-95 transition-transform"
          onClick={() => onOpen(app)}
        >
          Open
          <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
};

export default FolderChildCard;
