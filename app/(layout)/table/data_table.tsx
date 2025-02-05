"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  
  getPaginationRowModel,
  
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { 
  ArrowUpDown, 
  ChevronDown, 
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function DataTable<TData, TValue>(
  {
    columns,
    data,
  }: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
) {
  
  const [initData, setInitData] = useState(data)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [currPage, setCurrPage] = useState(0)

  
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 5, //default page size
  });

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setInitData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          }),
        )
      },
    },
    enableRowSelection: true,
  })

  const uniNumber = useMemo(() => {
    const key: keyof TData = "number" as keyof TData
    const numbers = new Set(initData.map((item: any) => item[key]))
    return Array.from(numbers).sort((a, b) => a[key] > b[key]? 1 : -1)
  }, [initData])
  
  const uniHost = useMemo(() => {
    const key: keyof TData = "host" as keyof TData
    const hosts = new Set(initData.map((item: any) => item[key]))
    return Array.from(hosts).sort((a, b) => a[key] > b[key]? 1 : -1)
  }, [initData])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center py-4 gap-4">
        
        <Select
          onValueChange={(value) => {
            value === "all"
              ? table.getColumn("number")?.setFilterValue(undefined)
              : table.getColumn("number")?.setFilterValue(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Number</SelectItem>
            {uniNumber.map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => { 
            value === "all"
              ? table.getColumn("host")?.setFilterValue(undefined)
              : table.getColumn("host")?.setFilterValue(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Host" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Host</SelectItem>
            {uniHost.map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-full">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                    <Button
                      key={column.id}
                      className="w-full flex flex-row justify-start items-center"
                      variant="ghost"
                      onClick={() => column.toggleVisibility()}
                    >
                      <Checkbox checked={column.getIsVisible()} /> 
                      {column.id}
                    </Button>
                )
              })}
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border w-[50vw]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-4 py-4">

        <span className="w-20">
          共 {table.getFilteredRowModel().rows.length} 条
        </span>


        <Pagination>
          <PaginationContent>

            <PaginationItem>
              <PaginationLink 
                href="#"
                size='default'
                onClick={() => {
                  if (currPage !== 0) {
                    setCurrPage(currPage - 1)
                    table.previousPage()
                  }
                }}
              >
              <ChevronLeft className="h-4 w-4" />
              上一页
              </PaginationLink>
            </PaginationItem>

            {table.getPageOptions().map(index => (
              <PaginationItem key={index}>
                <PaginationLink 
                  isActive={index === (currPage)} 
                  href="#" 
                  onClick={() => {
                    setCurrPage(index)
                    table.setPageIndex(index)}}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                href="#"
                size={'default'}
                onClick={() => {
                  if (currPage !== (table.getPageCount() - 1)) {
                    setCurrPage(currPage + 1)
                    table.nextPage()
                  }
                }}
              >
                下一页 
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>

          </PaginationContent>
        </Pagination>

      </div>

    </div>
  )
}
