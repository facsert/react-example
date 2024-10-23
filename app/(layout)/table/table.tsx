'use client'

import React, { useState, useMemo } from 'react'
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
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Filter, Columns, Edit, Trash2} from "lucide-react"

type DataItem = Record<string, string | number | null | undefined>

interface DynamicTableProps {
  data: DataItem[]
}

export default function DynamicTable({ data: initialData }: DynamicTableProps) {
  const [data, setData] = useState(initialData)
  const allColumns = useMemo(() => {
    const allKeys = data.reduce((keys, item) => {
      Object.keys(item).forEach(key => keys.add(key))
      return keys
    }, new Set<string>())
    return Array.from(allKeys)
  }, [data])
  const [columns, setColumns] = useState(allColumns)
  const [tempColumns, setTempColumns] = useState(allColumns)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [filters, setFilters] = useState<Record<string, Set<string>>>({})
  const [tempFilters, setTempFilters] = useState<Record<string, Set<string>>>({})
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false)

  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set())
  const [editingItem, setEditingItem] = useState<DataItem | null>(null)

  const sortedData = useMemo(() => {
    const sortableItems = [...data]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key]?? Number.NEGATIVE_INFINITY
        const bValue = b[sortConfig.key]?? Number.NEGATIVE_INFINITY
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const filteredData = useMemo(() => {
    return sortedData.filter(item => 
      Object.entries(filters).every(([key, value]) => 
        value.size === 0 || value.has(String(item[key] ?? ''))
      )
    )
  }, [sortedData, filters])

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleTempFilterChange = (column: string, value: string) => {
    setTempFilters(prev => {
      const newSet = new Set(prev[column] || [])
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        newSet.add(value)
      }
      return { ...prev, [column]: newSet }
    })
  }

  const applyFilter = (column: string) => {
    setFilters(prev => ({ ...prev, [column]: tempFilters[column] || new Set() }))
    setOpenDropdown(null)
  }

  const toggleAllFilters = (column: string, uniqueValues: Set<string | number>) => {
    setTempFilters(prev => {
      const currentSet = prev[column] || new Set<string>()
      const newSet = currentSet.size === uniqueValues.size ? new Set<string>() : new Set(Array.from(uniqueValues).map(String))
      return { ...prev, [column]: newSet }
    })
  }

  const uniqueValues = useMemo(() => {
    const values: Record<string, Set<string | number>> = {}
    allColumns.forEach(column => {
      values[column] = new Set(data.map(item => String(item[column] ?? '')))
    })
    return values
  }, [data, allColumns])

  const toggleColumn = (column: string) => {
    setColumnDropdownOpen(true)
    setTempColumns(prev => 
      prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]
    )
  }

  const applyColumnSelection = () => {
    setColumns(tempColumns)
    setColumnDropdownOpen(false)
  }

  const toggleAllColumns = () => {
    setTempColumns(tempColumns.length === allColumns.length ? [] : [...allColumns])
  }

  const handleCheckRow = (index: number) => {
    setCheckedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleCheckAll = () => {
    if (checkedRows.size === filteredData.length) {
      setCheckedRows(new Set())
    } else {
      setCheckedRows(new Set(filteredData.map((_, index) => index)))
    }
  }
  const handleDeleteSelected = () => {
    setData(prev => prev.filter((_, index) => !checkedRows.has(index)))
    setCheckedRows(new Set())
  }

  const handleEditItem = (item: DataItem) => {
    setEditingItem(item)
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      setData(prev => prev.map(item => item.id === editingItem.id ? editingItem : item))
      setEditingItem(null)
    }
  }

  if (data.length === 0) {
    return <div className="text-center p-4">No data available</div>
  }

  return (
    <div className="w-full overflow-auto">
      <div className="mb-4">
        <DropdownMenu 
          open={columnDropdownOpen}
          onOpenChange={() => setColumnDropdownOpen(true)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns className="mr-2 h-4 w-4" />
              Select Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <div className="flex justify-between mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAllColumns}
                >
                  {tempColumns.length === allColumns.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applyColumnSelection}
                >
                  Apply
                </Button>
              </div>
              {allColumns.map(column => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={tempColumns.includes(column)}
                  onCheckedChange={() => toggleColumn(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="destructive" onClick={handleDeleteSelected} disabled={checkedRows.size === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected
        </Button>
      </div>
      <Table className='border rounded-md'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={checkedRows.size === filteredData.length && filteredData.length > 0}
                onCheckedChange={handleCheckAll}
              />
            </TableHead>
            {columns.map(column => (
              <TableHead key={column} className="text-center whitespace-nowrap">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort(column)}
                    className="p-0 h-4"
                  >
                    {column}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                  <DropdownMenu open={openDropdown === column} onOpenChange={(open) => {
                    if (open) {
                      setOpenDropdown(column)
                      setTempFilters(prev => ({ ...prev, [column]: new Set(filters[column] || []) }))
                    }
                  }}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 h-4">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <div className="p-2">
                        <Input
                          placeholder="Filter values..."
                          value={filterValues[column] || ''}
                          onChange={(e) => setFilterValues(prev => ({ ...prev, [column]: e.target.value }))}
                          className="mb-2"
                        />
                        <div className="flex justify-between mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAllFilters(column, uniqueValues[column])}
                          >
                            {tempFilters[column]?.size === uniqueValues[column].size ? 'Deselect All' : 'Select All'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyFilter(column)}
                          >
                            Apply
                          </Button>
                        </div>
                        {Array.from(uniqueValues[column] || [])
                          .filter(value => 
                            String(value).toLowerCase().includes((filterValues[column] || '').toLowerCase())
                          )
                          .map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={tempFilters[column]?.has(String(value))}
                              onCheckedChange={() => handleTempFilterChange(column, String(value))}
                            >
                              {value}
                            </DropdownMenuCheckboxItem>
                          ))
                        }
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableHead>
            ))}
            <TableHead className="text-center whitespace-nowrap"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={checkedRows.has(index)}
                  onCheckedChange={() => handleCheckRow(index)}
                />
              </TableCell>
              {columns.map(column => (
                <TableCell key={column} className="text-center whitespace-nowrap">
                  {item[column] ?? ''}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={editingItem !== null} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editingItem && Object.entries(editingItem).map(([key, value]) => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={key} className="text-left">
                  {key}
                </Label>
                <Input
                  id={key}
                  value={value as string}
                  onChange={(e) => setEditingItem({ ...editingItem, [key]: e.target.value })}
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}