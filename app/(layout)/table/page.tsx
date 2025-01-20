import DynamicTable from "./table";
import { selectCols } from './columns'
import { Node } from "./model";
import DataTable from "./data_table";

const data = [
    { name: "John", age: 30, city: "New York"},
    { name: "Jane", age: 25, city: "London", hobby: "games"},
    { name: "Bob", age: 40, city: "Paris" },
]

const nodes: Node[] = [
    {id: 1, number: 'machine1', host: "192.168.1.1", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 2, number: 'machine2', host: "192.168.1.2", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 3, number: 'machine3', host: "192.168.1.3", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 4, number: 'machine4', host: "192.168.1.4", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 5, number: 'machine5', host: "192.168.1.5", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 6, number: 'machine6', host: "192.168.1.6", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 7, number: 'machine7', host: "192.168.1.7", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 8, number: 'machine8', host: "192.168.1.8", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 9, number: 'machine9', host: "192.168.1.9", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 10, number:'machine10', host: "192.168.1.10", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 11, number:'machine11', host: "192.168.1.11", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 12, number:'machine12', host: "192.168.1.12", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 13, number:'machine13', host: "192.168.1.13", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 14, number:'machine14', host: "192.168.1.14", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 15, number:'machine15', host: "192.168.1.15", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
    {id: 16, number:'machine16', host: "192.168.1.16", port: 8080, username: "root", password: "password", msg: "Hello, world!"},
]

// TODO: 简化，标准化表格代码
export default function TablePage() {
  return (
    <div>
      <DataTable columns={selectCols} data={nodes} />
      {/* <DynamicTable data={data} /> */}
    </div>
  );
};