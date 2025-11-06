import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

interface Props{
    params:Promise<{
        category:string;
        subcategory:string;
    }>
}
const Page = async ({params}:Props)=>{
    const {category, subcategory} = await params;
    return(
        <div>
Category: {category} 
<br/>
SubCategory : {subcategory}
        </div>

)}
// http://localhost:3000/drawing-painting/watercolor
export default Page;