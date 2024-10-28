"use client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, ChangeEvent } from "react";
import ReactForm from "./react-form";

interface Client {
  host: string;
  port: number;
  username: string;
  password: string;
}

export default function FormPage() {
  const [client, setClient] = useState<Client>({
    host: "",
    port: 0,
    username: "",
    password: "",
  });
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(client);
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target as HTMLInputElement;
    setClient({ ...client, [id]: value });
    console.log(client);
  };

  function testAction() {
    console.log("TEST ACTION");
    console.log(client.host);
    console.log(client.username);
    toast.success(`Test ${client.host} Success`);
  }

  // TODO: 添加 Form 组件, 添加下拉, 输入框, checkbox 组件
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-1/3 grid grid-cols-5 gap-4 border rounded-md py-4">
        <h1 className="col-start-2 col-span-3">form</h1>

        <div className="col-start-2 col-span-3">
          <Label htmlFor="host">host</Label>
          <Input
            type="text"
            id="host"
            value={client.host}
            onChange={handleChange}
          />
        </div>

        <div className="col-start-2 col-span-3">
          <Label htmlFor="port">port</Label>
          <Input
            type="number"
            id="port"
            value={client.port}
            onChange={handleChange}
          />
        </div>

        <div className="col-start-2 col-span-3">
          <Label htmlFor="username">username</Label>
          <Input
            type="text"
            id="username"
            value={client.username}
            onChange={handleChange}
          />
        </div>

        <div className="col-start-2 col-span-3">
          <Label htmlFor="password">password</Label>
          <Input
            type="text"
            id="password"
            value={client.password}
            onChange={handleChange}
          />
        </div>

        {/* <Button type="submit">Submit</Button> */}
        <Button className="col-start-2 col-span-3" type="button" onClick={testAction}>
          Button
        </Button>
      </form>
    </div>
  );
}
