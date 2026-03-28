import { Heart, Play, ExternalLink } from "lucide-react";

interface ConsumerAppCardProps {
  title: string;
  description: string;
  tags: string[];
  plays: number;
  favorites: number;
  imageUrl: string;
  url: string;
  statusLabel?: string;
}

const tagColors = [
  "bg-consumer-coral/20 text-consumer-coral",
  "bg-consumer-cyan/20 text-consumer-cyan",
  "bg-consumer-magenta/20 text-consumer-magenta",
  "bg-consumer-purple/20 text-consumer-purple",
  "bg-consumer-amber/20 text-consumer-amber",
];

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const ConsumerAppCard = ({ title, description, tags, plays, favorites, imageUrl, url, statusLabel }: ConsumerAppCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Translucent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-consumer-text/90 via-consumer-text/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-consumer-coral via-consumer-amber to-consumer-magenta" />
      <div className="relative p-4 pt-20 flex flex-col gap-2">
        {/* External link icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-5 h-5 text-consumer-surface/80" />
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-consumer-coral/40 bg-consumer-coral/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-consumer-surface shadow-[0_0_0_1px_hsl(12_90%_62%/0.15),0_0_26px_hsl(12_90%_62%/0.24)]">
          <span className="h-1.5 w-1.5 rounded-full bg-consumer-amber shadow-[0_0_12px_hsl(38_95%_58%/0.8)]" />
          {statusLabel ?? "Live catalog"}
        </div>

        <h3 className="font-playful text-xl font-bold text-consumer-surface leading-tight">{title}</h3>
        <p className="text-consumer-surface/80 text-sm leading-relaxed line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1.5">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-1.5 text-consumer-surface/70 text-sm">
          <span className="flex items-center gap-1.5">
            <Play className="w-4 h-4 fill-current" />
            {formatCount(plays)}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4" />
            {formatCount(favorites)}
          </span>
        </div>

        <div className="mt-1 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-consumer-surface/80">
          <span className="h-px flex-1 bg-consumer-surface/20" />
          Editable in admin
          <span className="h-px flex-1 bg-consumer-surface/20" />
        </div>
      </div>
    </a>
  );
};

export default ConsumerAppCard;
