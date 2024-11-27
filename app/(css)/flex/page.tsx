import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-row flex-warp gap-2">
      <div className="w-full h-[8vh] flex flex-row gap-2">

        <div className="basis-1/6 h-[8vh] flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Flex Basic
          </h3>
          <div className="bg-gray-200 flex flex-row justify-start items-center gap-2 p-2 rounded-md">
            <Button className="basis-1/6">1/6</Button>
            <Button className="basis-2/6">2/6</Button>
            <Button className="basis-3/6">3/6</Button>
          </div>
        </div>

        <div className="h-[8vh] basis-1/6 flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Flex Row Direction
          </h3>
          <div className="bg-gray-200 flex flex-row items-center gap-2 p-2 rounded-md">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
        </div>

        <div className="h-[8vh] basis-1/6 flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Flex Row Direction (reverse)
          </h3>
          <div className="bg-gray-200 flex flex-row-reverse items-center gap-2 p-2 rounded-md">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
        </div>

        <div className="w-full h-[6vh] basis-1/6 flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            justify-start (default)
          </h3>
          <div className="bg-gray-200 flex flex-row justify-start items-center gap-2 p-2 rounded-md">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
        </div>

        <div className="w-full h-[6vh] basis-1/6 flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            justify-center
          </h3>
          <div className="bg-gray-200 flex flex-row justify-center items-center gap-2 p-2 rounded-md">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
        </div>

        <div className="w-full h-[6vh] basis-1/6 flex flex-col">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            justify-start
          </h3>
          <div className="bg-gray-200 flex flex-row justify-end items-center gap-2 p-2 rounded-md">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
        </div>

      </div>
    </div>
  );
};


