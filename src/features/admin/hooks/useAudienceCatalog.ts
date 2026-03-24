import { useQuery } from "@tanstack/react-query";
import { Audience, fetchCatalogApps } from "@/features/admin/lib/catalog";

export const useAudienceCatalog = (audience: Audience) =>
  useQuery({
    queryKey: ["catalog-apps", audience],
    queryFn: () => fetchCatalogApps(audience),
    staleTime: 60 * 1000,
  });
