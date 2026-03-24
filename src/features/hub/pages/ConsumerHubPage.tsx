import { Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ConsumerExpandedHub from "@/components/ConsumerExpandedHub";
import AudienceSwitchButton from "@/features/hub/components/AudienceSwitchButton";
import AudiencePageTransition from "@/features/hub/components/AudiencePageTransition";
import { BUSINESS_BASE_PATH } from "@/features/hub/routes";

const ConsumerHubPage = () => {
  const navigate = useNavigate();

  return (
    <AudiencePageTransition audience="consumer">
      <div className="relative h-screen overflow-hidden">
        <AudienceSwitchButton
          onClick={() => navigate(BUSINESS_BASE_PATH, { state: { from: "consumer" } })}
          className="absolute top-4 right-4 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-business-bg/90 text-business-text text-[10px] font-business font-semibold backdrop-blur-sm border border-business-border shadow-lg hover:bg-business-bg transition-colors"
          leadingIcon={Briefcase}
          trailingIcon={ChevronRight}
          label="Bạn quán"
        />
        <ConsumerExpandedHub />
      </div>
    </AudiencePageTransition>
  );
};

export default ConsumerHubPage;
