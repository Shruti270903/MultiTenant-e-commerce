import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import type { SearchParams } from "nuqs/server";
// import { Suspense } from "react";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
import {ProductListView} from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}
const Page = async ({searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);
  const {minPrice, maxPrice} = await searchParams; 
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListView  />
    </HydrationBoundary>
  );
};
// http://localhost:3000/education
export default Page;
