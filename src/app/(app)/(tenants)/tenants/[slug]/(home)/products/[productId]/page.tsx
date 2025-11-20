import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
 interface Props{
    params: Promise<{productId: string; slug: string}>;
 };
 const Page = async ({params}: Props) =>{
    const {productId, slug} = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.geyOne.queryOptions({
        slug,
    }));
    return(
      <HydrationBoundary>
        <ProductView  productId={productId} tenantSlug={slug} />
      </HydrationBoundary>
    );
 }
 export default Page;