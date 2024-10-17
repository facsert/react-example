"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}
from "@/components/ui/form"

export type Node = {
  id: number;
  number: string;

  host: string;
  port: number;
  username: string;
  password: string;

  msg: string;
}

// 定义列的标题和内容的样式
export const columns: ColumnDef<Node>[] = [
  {
    accessorKey: "number",
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue("number")}</div>,
    header: ({column}) => {
      return (
        <div>
          <Button
            variant="ghost"
            className="cursor-pointer w-full flex flex-row justify-start items-center p-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >   
            <p>Number</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "host",
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue("host")}</div>,
    header: ({column}) => {
      return (
        <div>
          <Button
            variant="ghost"
            className="cursor-pointer w-full flex flex-row justify-start items-center p-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >   
            <p>Host</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
    cell: ({ row }) => <div className="text-left font-medium">{row.getValue("msg")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const node = row.original
      return (
        <div className="flex flex-row gap-4 ">
          <Edit node={node} />
          <Button variant="outline">Delete</Button>
        </div>
      )
    }
  }
]

function Edit({ node }: {node: Node}) {
  const formSchema = z.object({
    number: z.string().min(2, {
      message: "number must be at least 2 characters.",
    }),
    host: z.string().min(2, {
      message: "host must be at least 2 characters.",
    }),
    port: z.number().min(0, {
      message: "port must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: node
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"> Edit </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{node.number}</DialogTitle>
            <DialogDescription>modify node info</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="number"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="host"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>host</FormLabel>
                    <FormControl>
                      <Input placeholder="host" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="port"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>port</FormLabel>
                    <FormControl>
                      <Input placeholder="port" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit"> Save </Button>
                <DialogClose asChild>
                  <Button type="button"> Cancel </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
}