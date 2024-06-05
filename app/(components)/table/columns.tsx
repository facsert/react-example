"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type Student = {
    id: number;
    name: string;
    age: number;
    sex: "boy"|"girl";
    create_at: string;
}

// 定义列的标题和内容的样式
export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-left">Name</div>,
        cell: ({ row }) => <div className="text-left font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "age",
        header: ({column}) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        className="cursor-pointer w-full flex flex-row justify-start items-center p-2"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >   
                        <p>Age</p>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className="text-left px-4">{row.getValue("age")}</div>
    },
    {
        accessorKey: "sex",
        header: "性别",
        cell: ({ row }) => <div className="text-left">{row.getValue("sex") === "boy" ? "男生" : "女生"}</div>,
    },
    {
        accessorKey: "create_at",
        header: "Create At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const student = row.original
            return (
                <div className="flex flex-row gap-4 ">
                    {/* <button>Edit</button> */}
                    <Edit />
                    <Button variant="ghost">Delete</Button>
                </div>
            )
        }
    }
]

function Edit() {
    return (
        <div className="h-10 px-4 py-2 hover:bg-accent rounded-full">
            <Dialog>
                <DialogTrigger className="w-full h-full flex flex-row justify-center items-center">
                    <p>Edit</p>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                        <DialogDescription>
                            Edit the student information
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label htmlFor="name">name</Label>
                        <Input id="name"></Input>

                        <Label htmlFor="age">age</Label>
                        <Input id="age"></Input>
                    </div>
                    <DialogClose>
                        Edit
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}
