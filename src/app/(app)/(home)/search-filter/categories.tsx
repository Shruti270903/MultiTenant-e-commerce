
import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";
interface Props {
  data?: Category[] | null;
}
export const Categories = ({ data }: Props) => {
 if (!Array.isArray(data)) {
    console.warn('Categories: data is not an array', data);
    return <div>No categories found.</div>;
  }
  return (
    <div className="relative w-full">

       <div className="flex flex-nowrap items-center">
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
       </div>
    </div>
  );
};
