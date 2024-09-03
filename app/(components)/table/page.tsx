"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./table";
import { columns, Student } from "./columns";

const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      age: 20,
      sex: "boy",
      create_at: "20240512",
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 21,
      sex: "girl",
      create_at: "20240512",
    },
    {
      id: 3,
      name: "Jack Doe",
      age: 19,
      sex: "boy",
      create_at: "20240512",
    },
    {
      id: 3,
      name: "Lily Doe",
      age: 20,
      sex: "girl",
      create_at: "20240512",
    }
]

export default function TablePage() {
  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <div className="w-full h-[40px] text-center">
        <h1>Student Table</h1>
      </div>
      <ScrollArea className="w-full h-5/6 rounded-md border">
        <DataTable columns={columns} data={students} />
      </ScrollArea>
    </div>
  );
}
