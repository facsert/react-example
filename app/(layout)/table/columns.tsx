"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";

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
import { Button } from "@/components/ui/button";

import { PencilLine } from 'lucide-react';
import { Node } from './model'
import DataForm from './data_form'


// 定义列的标题和内容的样式
const selectCols: ColumnDef<Node>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "number",
    cell: ({ row }) => <div className="w-5 text-left font-medium">{row.getValue("number")}</div>,
    header: ({column}) => {
      return (
        <div className="px-0 mx-0">
          <Button
            variant="ghost"
            className="cursor-pointer flex flex-row justify-start items-center p-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >   
            <p>Number</p>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "host",
    cell: ({ row }) => <div className="w-5 text-left font-medium">{row.getValue("host")}</div>,
    header: ({column}) => {
      return (
        <div className="">
          <Button
            variant="ghost"
            className="cursor-pointer flex flex-row justify-start items-center p-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >   
            <p>Host</p>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "port",
    header: () => <div className="text-left">Port</div>,
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue("port")}</div>,
  },
  {
    accessorKey: "msg",
    header: () => <div className="text-left">Msg</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("msg")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const node = row.original
      return (
        <div className="flex flex-row gap-4 ">
          <Dialog>
            <DialogTrigger>
            <PencilLine className="w-6 h-6 text-primary" />
            </DialogTrigger>
            <DialogContent className="w-[40vw]">
              <DialogTitle>Edit Node</DialogTitle>
              <DataForm node={node} />
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  }
]

export { selectCols };