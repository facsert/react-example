"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp } from "lucide-react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { ThemeToggle } from '@/components/ui/ThemeToggle'
// import { downloadToExcel } from '@/lib/xlsx'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function PeopleDataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // new
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })

    return (
        <div>
            <div className='flex items-center py-2'>
                <Input
                    placeholder='Filter by first name'
                    value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("first_name")?.setFilterValue(event.target.value)
                    }}
                    className='max-w-sm'
                />

                {/* <ThemeToggle className='ml-4' /> */}

                {/*Column visibility dropdown btn*/}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-4'>
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                // as long as it's not the actions column, we can toggle visibility
                                if (column.id !== "actions")
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className='capitalize'
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <Button onClick={() => downloadToExcel()} className="ml-4">
                    Export to Excel
                </Button> */}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => {
                            return (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <TableHead key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows?.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>
                                    No results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div>
                <div>
                    <div className="flex items-center space-x-2 py-1">
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            First
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                        <div>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                Last
                            </Button>
                        </div>
                        <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-4'>
                            Show {table.getState().pagination.pageSize} <ChevronUp className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {/* Pagination control goes here */}
                        {[10, 25, 50].map(pageSize => (
                            <DropdownMenuCheckboxItem
                                key={pageSize}
                                checked={table.getState().pagination.pageSize === pageSize}
                                onCheckedChange={(value) => {
                                    if (value) {
                                        table.setPageSize(pageSize)
                                    }
                                }}
                            >
                                Show {pageSize} 
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className='text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
        </div>
    )
}

export default PeopleDataTable