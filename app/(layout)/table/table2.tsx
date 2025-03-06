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
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from "sonner";

import { ArrowUpDown, ChevronDown, Trash2, Edit, CircleX } from "lucide-react"


export class Node {
  // id: number;
  number: NodeValue;

  host: NodeValue;
  port: NodeValue;
  username: NodeValue;
  password: NodeValue;

  ua4_port: NodeValue;
  ua5_port: NodeValue;
  comm_port: NodeValue;
  push_port: NodeValue;

  mountain: NodeValue;
  version: NodeValue;
  msg: NodeValue;
  
  constructor() {
    // this.id = 0
    this.number = "ENV";

    this.host = "";
    this.port = 0;
    this.username = "username";
    this.password = "password?";
  
    this.ua4_port = 0;
    this.ua5_port = 0;
    this.comm_port = 0;
    this.push_port = 0;

    this.mountain = "";
    this.version = "V2";
    this.msg = "host 192.168.1.1";
  }
}


type NodeKeys = keyof Node
type NodeValue = string | number
type Filter = {key: NodeKeys; value: NodeValue}
const defaultColumns: NodeKeys[] = ['number', 'mountain', 'version', 'host', 'port', 'msg'];
const editColumns: NodeKeys[] = ['mountain', 'version', 'host', 'port', 'msg'];
const allColumns: NodeKeys[] = Object.keys(new Node()) as NodeKeys[]

export default function DataTable({ data }: { data: Node[]}) {
  const [columns, setColumns] = useState<NodeKeys[]>(defaultColumns)
  const [sortConfig, setSortConfig] = useState<{key: NodeKeys; direction: 'asc' | 'desc'} | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<Filter|null>(null)

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
  const toggleSortConfig = (key: NodeKeys) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // 数据全选或全不选
  const handleCheckedAll = () => {
    if (checkedItems.size === filterData.length) {
      setCheckedItems(new Set())
    } else {
      setCheckedItems(new Set(filterData.map((_, index) => index)))
    }
  }

  // 单数据选择或不选
  const handleCheckItem = (index: number) => {
    setCheckedItems(prev => {
      const indexSet = new Set(prev)
      if (prev.has(index)) {
        indexSet.delete(index)
      } else {
        indexSet.add(index)
      }
      return indexSet
    })
  }

  //恢复默认
  const resetData = () => {
    setColumns(defaultColumns)
    setSortConfig(null)
    setCheckedItems(new Set())
    setFilter(null)
  }

  // 返回所有操作后的数据
  const filterData = useMemo(() => {
    if (filter === null) {
      return sortedData
    }
    return sortedData.filter(item => item[filter.key] === filter.value)
  }, [sortedData, filter])

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <AddItem />
        <DeleteItems data={filterData} checkedItems={checkedItems} />
        <SelectItem data={data} nodeKey="host" setFilter={setFilter} />
        <SelectItem data={data} nodeKey="mountain" setFilter={setFilter} />
        <SelectColumns setColumns={setColumns} />
        <Button variant='outline' onClick={resetData}> Reset </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={checkedItems.size === filterData.length && filterData.length > 0}
                  onCheckedChange={handleCheckedAll}
                />
              </TableHead>
              {columns.map((column, index) => {
                return (
                  <TableHead key={index}>
                    <div className='flex flex-row'>
                      <Button
                        variant='ghost'
                        className='p-0 h-4'
                        onClick={() => {toggleSortConfig(column)}}
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
            {filterData.map((item, index) => {
              return (
                <TableRow key={index}>

                  <TableCell>
                    <Checkbox
                      checked={checkedItems.has(index)}
                      onCheckedChange={() => handleCheckItem(index)}
                    />
                  </TableCell>

                  {columns.map(head => {
                    return (
                      <TableCell key={head}>{item[head]}</TableCell>
                    )
                  })}

                  <TableCell>
                    <EditItem item={item} />
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

function AddItem() {
  const [item, setItem] = useState<Node>(new Node())
  // 新增单条数据
  const handleAddItem = () => {
    toast.info(`add ${JSON.stringify(item, null, 2)}`)
    console.log(`add ${JSON.stringify(item, null, 2)}`)
  }

  return (
      <Dialog >
        <DialogTrigger asChild>
          <Button variant='outline'>
            Add
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Add </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {allColumns && allColumns.map(col => {
              return (
                <div key={col}>
                  <Label htmlFor={col}>{col}</Label>
                  <Input
                    id={col}
                    value={item[col]}
                    onChange={(e) => setItem({...item, [col]: e.target.value})}
                  />
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <DialogClose>
              {/* <Button variant='outline'>Cancel</Button> */}
            </DialogClose>
            <Button type="submit" variant='outline' onClick={handleAddItem}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

function SelectColumns({ setColumns }: {setColumns: React.Dispatch<React.SetStateAction<NodeKeys[]>>}) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkedCols, setCheckItCols] = useState<NodeKeys[]>(defaultColumns)

  // 修改已选择的 columns
  const toggleColumn = (column: NodeKeys) => {
    setCheckItCols(prev => prev.includes(column)? prev.filter(col => col !== column) : [...prev, column])
  }

  // 应用选择的 columns 
  const applySelectColumns = () => {
    setColumns(checkedCols)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
    <PopoverTrigger asChild>
      <Button variant='outline'>
        Select Columns <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className='w-[200px]'>
      <div className='flex flex-col items-start gap-1'>
        {allColumns.map(column => {
          return (
            <div className='w-full flex flex-row justify-between items-center hover:bg-accent rounded-md px-2' key={column} onClick={() => toggleColumn(column)}>
              {column}
              <Checkbox checked={checkedCols.includes(column)} />
            </div>
          )
        })}
      </div>
      <div className='flex flex-row justify-between'>
        <Button
          variant='outline'
          onClick={() => setCheckItCols(checkedCols.length === allColumns.length? []: [...allColumns])}
        >
          All
        </Button>
        <Button
          variant='outline'
          onClick={applySelectColumns}
        >
          Select
        </Button>
      </div>
    </PopoverContent>
  </Popover>
  );
};

function EditItem({item}: {item: Node}) {
  const [editItem, setEditItem] = useState<Node>(new Node())
  // 编辑单条数据
  const handleEditItem = () => {
    toast.info(`edit ${JSON.stringify(editItem, null, 2)}`)
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setEditItem(item)}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {editItem['number']}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {editColumns && editColumns.map(col => {
            return (
              <div key={col}>
                <Label htmlFor={col}>{col}</Label>
                <Input
                  id={col}
                  value={editItem[col]}
                  onChange={(e) => setEditItem({...editItem, [col]: e.target.value})}
                />
              </div>
            )
          })}
        </div>
        <DialogFooter>
          <DialogClose>
            Close
          {/* Close <Button variant='outline'>Close</Button> */}
          </DialogClose>
          <Button type="submit" variant='outline' onClick={handleEditItem}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteItems({data, checkedItems}:{data: Node[], checkedItems:Set<number>}) {
  // 删除勾选的数据
  const handleDeleteItems = () => {
    const deleteItems = data.filter((_, index) => checkedItems.has(index))
    const numbers = Array.from(deleteItems.map(line => line.number))
    toast.custom((t) => (
      <div className='w-full min-w-48 flex flex-row items-center justify-between'>
        {`delete ${JSON.stringify(numbers, null, 2)}`}
        <Button size='icon' variant='ghost' onClick={() => toast.dismiss(t)}>
        <CircleX className='mx-2 h-4 w-4 bg-transparent' />
      </Button>
      </div>
    ))
  }
  return (
    <Button variant='outline' onClick={handleDeleteItems}> 
      Delete
      <Trash2 className="ml-2 h-4 w-4" />
    </Button>
  );
}

function SelectItem({data, nodeKey, setFilter}: {data: Node[], nodeKey: NodeKeys, setFilter:React.Dispatch<React.SetStateAction<Filter|null>>}) {
  const unique = Array.from(new Set<number|string>(data.map(item => item[nodeKey])))
  const selectValue = (value: string| number) => {
    setFilter({key:nodeKey, value: value})
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          Select {nodeKey} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {unique.map(value => {
          return (
            <DropdownMenuCheckboxItem
              key={value}
              onCheckedChange={() => selectValue(value)}
            >
              {value}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};