import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

import { getStudents, Student } from "@/hook/student";



export default async function TablePage() {
    const data:Student[] = await getStudents();
    return (
       <div className="flex flex-col justify-start items-center h-full w-full">
            <div className="w-full h-[40px] text-center">
                <h1>Student Table</h1>
            </div>
            <ScrollArea className="w-full h-5/6 rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Locked</TableHead>
                        <TableHead>Create_at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data.length === 0 ? Empty() : List(data) }
                </TableBody>
            </Table>
        </ScrollArea>
    </div> 
    );
}

function Empty() {
    return (
        <TableRow>
            <TableCell colSpan={5} className="h-12 text-center">
                No results.
            </TableCell>
        </TableRow>
    );
}

function List(data: Student[]) {
    const lines: JSX.Element[] = [];
    data.map((row) => {
            lines.push(
                <TableRow key={row.name}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell className={row.locked ? "text-green-500" : "text-red-500"}>
                    {row.locked ? "TRUE" : "FALSE"}
                </TableCell>
                <TableCell>{row.create_at}</TableCell>
            </TableRow>
        )
    });
    return lines;
}