import DynamicTable from "./table";

const data = [
    { name: "John", age: 30, city: "New York"},
    { name: "Jane", age: 25, city: "London", hobby: "games"},
    { name: "Bob", age: 40, city: "Paris" },
]

export default function TablePage() {
  return (
    <div>
      <DynamicTable data={data} />
    </div>
  );
};