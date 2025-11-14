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

interface Props {
  params: Promise<{
    category: string;
  }>,
  searchParams: Promise<SearchParams>;
}
const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const {minPrice, maxPrice} = await searchParams; 
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
      category,
     ...filters,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListView category={category} />
    </HydrationBoundary>
  );
};
// http://localhost:3000/education
export default Page;
