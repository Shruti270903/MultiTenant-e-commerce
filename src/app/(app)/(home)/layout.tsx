"use server";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import Navbar from "./navbar";
import { Footer } from "./footer";
import SearchFilters from "./search-filter";
import type { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories" as const,
    depth: 1, // populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false, // only top-level categories
      },
    },
    sort:"name"
  });
  // --- TRANSFORM PAYLOAD DATA ---
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined, // prevent nesting loops
    })),
  }));
  // --- RENDER ---
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Pass cleaned data to SearchFilters */}
      <SearchFilters data={formattedData} />

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
