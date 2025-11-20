"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useProductFilters } from "../../hooks/use-product-filter";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== " curated " &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => ({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== " trending " &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => ({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== " hot_and_new " &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => ({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
