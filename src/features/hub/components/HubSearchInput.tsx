import { Search } from "lucide-react";

interface HubSearchInputProps {
  placeholder: string;
  className: string;
  iconClassName: string;
  value: string;
  onChange: (value: string) => void;
}

const HubSearchInput = ({ placeholder, className, iconClassName, value, onChange }: HubSearchInputProps) => {
  return (
    <div className="relative">
      <Search className={iconClassName} />
      <input
        type="text"
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default HubSearchInput;
