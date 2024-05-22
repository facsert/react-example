"use client"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

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
    // const data:Student[] = [];
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

// function Empty() {
//     return (
//         <TableRow>
//             <TableCell colSpan={5} className="h-12 text-center">
//                 No results.
//             </TableCell>
//         </TableRow>
//     );
// }

// function List(data: Student[]) {
//     const lines: JSX.Element[] = [];
//     data.map((row) => {
//             lines.push(
//                 <TableRow key={row.name}>
//                     <TableCell>{row.id}</TableCell>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.email}</TableCell>
//                     <TableCell>{row.create_at}</TableCell>
//                 </TableRow>
//         )
//     });
//     return lines;
// }