import { GitFork, Heart, Play } from "lucide-react";

interface ChildAppStatsProps {
  hearts: number;
  tryouts: number;
  forks: number;
  className?: string;
}

const ChildAppStats = ({ hearts, tryouts, forks, className = "" }: ChildAppStatsProps) => {
  return (
    <div className={`flex items-center gap-3 text-[11px] text-business-text-muted ${className}`.trim()}>
      <span className="inline-flex items-center gap-1">
        <Heart size={11} className="text-business-text-muted/80" />
        {hearts}
      </span>
      <span className="inline-flex items-center gap-1">
        <Play size={11} className="text-business-text-muted/80 fill-current" />
        {tryouts}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork size={11} className="text-business-text-muted/80" />
        {forks}
      </span>
    </div>
  );
};

export default ChildAppStats;
