"use client"

import * as React from "react"
import { useState } from "react"
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
  })

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center py-4">
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

      <div className="rounded-md border w-[30vw]">
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
