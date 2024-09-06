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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Filter, Columns } from "lucide-react"

type DataItem = Record<string, string | number | null | undefined>

interface DynamicTableProps {
  data: DataItem[]
}

export default function DynamicTable({ data }: DynamicTableProps) {
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

  const sortedData = useMemo(() => {
    let sortableItems = [...data]
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              {columns.map(column => (
                <TableCell key={column} className="text-center whitespace-nowrap">
                  {item[column] ?? ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}