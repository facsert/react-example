"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "sonner"
import ReactForm from "./react-form";
import { set } from "react-hook-form";
import { createPrerenderState } from "next/dist/server/app-render/dynamic-rendering";

interface Client {
  host: string;
  port: number;
  username: string;
  password: string;
}

export default function FormPage() {
  // TODO: 添加 Form 组件, 添加下拉, 输入框, checkbox 组件
  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <ReactForm1 />
    </div>
  );
}

function ReactForm1({...props}) {
  const defaultClient: Client= {
    host: "192.168.1.100",
    port: 3000,
    username: "root",
    password: "admin",
  }
  const [client, setClient] = useState<Client>(defaultClient);
  async function handleSubmit(formData: FormData) {
    const port: number = (formData.get('port')?? client.port) as number;
    setClient(preState => ({...preState,
      host: formData.get('host') as string,
      port: (formData.get('port')?? client.port) as number,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }))
    toast.success(JSON.stringify(client));
    // toast.success(`Host: ${formData.get('host')}`);
  }

  const handleChange = () => {

  }
  
  const handleReset = () => setClient(defaultClient);

  return (
    <div className="border rounded-md p-4 w-full max-w-md gap-4" {...props}>
      <form action={handleSubmit}>
        <div>
          <Label htmlFor="host">Host</Label>
          <Input 
            name='host' 
            type="text" 
            id="host" 
            defaultValue={client.host}
            onChange={(e) => setClient(preState => ({...preState, host: e.target.value}))}
            value={client.host}
          />
        </div>
        <div>
          <Label htmlFor="port">Port</Label>
          <Input 
            name='port'
            type="number"
            id="port"
            defaultValue={client.port}
            onChange={(e) => setClient(preState => ({...preState, port: e.target.valueAsNumber}))}
            value={client.port}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            name='username'
            type="text"
            id="username"
            defaultValue={client.username}
            onChange={(e) => setClient(preState => ({...preState, username: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name='password'
            type="text"
            id="password"
            defaultValue={client.password}
            onChange={(e) => setClient(preState => ({...preState, password: e.target.value}))}
          />
        </div>
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleReset}>Reset</Button>
      </form>
      <br />
      <div>
        HOST: {client.host}
        <br />
        PORT: {client.port}
        <br />
        USERNAME: {client.username}
        <br />
        PASSWORD: {client.password}
      </div>
    </div>
    );
};

