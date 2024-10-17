'use client'

import { useState, useMemo } from 'react'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { ArrowUpDown, Filter, ChevronDown, Trash2, Edit } from "lucide-react"


export class Node {
  id: number;
  number: string;

  host: string;
  port: number;
  username: string;
  password: string;

  ua4_port: number;
  ua5_port: number;
  comm_port: number;
  push_port: number;

  mountain: string;
  version: string;
  msg: string;
  
  constructor() {
    this.id = 0
    this.number = "";

    this.host = "";
    this.port = 0;
    this.username = "";
    this.password = "";
  
    this.ua4_port = 0;
    this.ua5_port = 0;
    this.comm_port = 0;
    this.push_port = 0;

    this.mountain = "";
    this.version = "";
    this.msg = "";
  }
}

type NodeKeys = keyof Node
const defaultColumns: NodeKeys[] = ['number', 'mountain', 'version', 'host', 'port', 'msg'];

export default function DataTable({ data }: { data: Node[]}) {
  const allColumns: NodeKeys[] = Object.keys(new Node()) as NodeKeys[]
  const [columns, setColumns] = useState<NodeKeys[]>(defaultColumns)
  const [checkedCol, setCheckedCol] = useState<NodeKeys[]>(defaultColumns)
  const [sortConfig, setSortConfig] = useState<{key: NodeKeys; direction: 'asc' | 'desc'} | null>(null)
  const [dropMenuOpen, setDropMenuOpen] = useState(false)

  const [checkiTems, setCheckiTems] = useState<Set<number>>(new Set())
  
  // 按 sortConfig 关键字和顺序排序数据
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
  
  // 修改 sortConfig
  const switchSortConfig = (key: NodeKeys) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }
  
  // 修改已选择的 columns
  const toggleColumn = (column: NodeKeys) => {
    setDropMenuOpen(true)
    setCheckedCol(prev => prev.includes(column)? prev.filter(col => col !== column) : [...prev, column])
  }

  // 按选择的 columns 显示数据
  const applySelectColumns = () => {
    setColumns(checkedCol)
    setDropMenuOpen(false)
  }

  // 数据全选或全不选
  const handleCheckAll = () => {
    if (checkiTems.size === filterData.length) {
      setCheckiTems(new Set())
    } else {
      setCheckiTems(new Set(filterData.map((_, index) => index)))
    }
  }

  // 单数据选择或不选
  const handleCheckItem = (index: number) => {
    setCheckiTems(prev => {
      const indexSet = new Set(prev)
      if (prev.has(index)) {
        indexSet.delete(index)
      } else {
        indexSet.add(index)
      }
      return indexSet
    })
  }

  // 返回所有操作后的数据
  const filterData = useMemo(() => {
    return sortedData
  }, [sortedData])

  return (
    <div>
      <div>
        <DropdownMenu open={dropMenuOpen} onOpenChange={() => setDropMenuOpen(true)}>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Select Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allColumns.map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={checkedCol.includes(column)}
                  onCheckedChange={() => toggleColumn(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              )
            })}
            <DropdownMenuSeparator />
            <div>
              <Button
                variant='outline'
                onClick={() => setCheckedCol(checkedCol.length === allColumns.length? []: [...allColumns])}
              >
                All
              </Button>
              <Button
                variant='outline'
                onClick={() => setDropMenuOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant='outline'
                onClick={applySelectColumns}
              >
                Select
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={checkiTems.size === filterData.length && filterData.length > 0}
                  onCheckedChange={handleCheckAll}
                />
              </TableHead>
              {columns.map((column, index) => {
                return (
                  <TableHead key={index}>
                    <div className='flex flex-row'>
                      <Button
                        variant='ghost'
                        className='p-0 h-4'
                        onClick={() => {switchSortConfig(column)}}
                      >
                        {column}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                )
              })}
              <TableHead>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData.map((line, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={checkiTems.has(index)}
                      onCheckedChange={() => handleCheckItem(index)}
                    />
                  </TableCell> 
                  {columns.map(head => {
                    return (
                      <TableCell key={head}>{line[head]}</TableCell>
                    )
                  })}
                  <TableCell>
                    <Button variant='outline' />
                  </TableCell> 
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}