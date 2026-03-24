import type { LucideIcon } from "lucide-react";

interface AudienceSwitchButtonProps {
  onClick: () => void;
  className: string;
  label: string;
  leadingIcon: LucideIcon;
  trailingIcon?: LucideIcon;
  leadingIconClassName?: string;
  trailingIconClassName?: string;
}

const AudienceSwitchButton = ({
  onClick,
  className,
  label,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  leadingIconClassName = "w-3 h-3",
  trailingIconClassName = "w-3 h-3",
}: AudienceSwitchButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={className}>
      <LeadingIcon className={leadingIconClassName} />
      {label}
      {TrailingIcon ? <TrailingIcon className={trailingIconClassName} /> : null}
    </button>
  );
};

export default AudienceSwitchButton;
