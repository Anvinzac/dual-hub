import type { CategoryOption } from "@/features/hub/types";

interface HubCategoryListProps {
  categories: CategoryOption[];
  activeLabel: string;
  onSelect: (label: string) => void;
  activeClassName: string;
  inactiveClassName: string;
  buttonClassName: string;
  iconClassName?: string;
}

const HubCategoryList = ({
  categories,
  activeLabel,
  onSelect,
  activeClassName,
  inactiveClassName,
  buttonClassName,
  iconClassName = "w-4 h-4",
}: HubCategoryListProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.label}
            className={`${buttonClassName} ${category.label === activeLabel ? activeClassName : inactiveClassName}`}
            type="button"
            aria-pressed={category.label === activeLabel}
            onClick={() => onSelect(category.label)}
          >
            {Icon ? <Icon className={iconClassName} /> : null}
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default HubCategoryList;
