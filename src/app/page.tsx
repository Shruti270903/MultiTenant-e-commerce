import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4  ">
        <div>
          <Button variant="elevated">I am a button</Button>
        </div>
        <div>
          <input className="h-full w-full border-2 rounded " placeholder="i am a input"/>
        </div>
        <div>
          <Progress value={60} />
        </div>
        <div>
          <textarea  className="border-2 w-full rounded" value="I am a TextArea"/>   
            </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
