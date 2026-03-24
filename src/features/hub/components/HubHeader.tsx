import type { LucideIcon } from "lucide-react";

interface HubHeaderProps {
  badgeIcon: LucideIcon;
  badgeLabel: string;
  title: string;
  description: string;
  badgeIconClassName: string;
  badgeLabelClassName: string;
  titleClassName: string;
  descriptionClassName: string;
}

const HubHeader = ({
  badgeIcon: BadgeIcon,
  badgeLabel,
  title,
  description,
  badgeIconClassName,
  badgeLabelClassName,
  titleClassName,
  descriptionClassName,
}: HubHeaderProps) => {
  return (
    <div className="px-5 pt-14 pb-4">
      <div className="flex items-center gap-2 mb-1">
        <BadgeIcon className={badgeIconClassName} />
        <span className={badgeLabelClassName}>{badgeLabel}</span>
      </div>
      <h1 className={titleClassName}>{title}</h1>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
};

export default HubHeader;
