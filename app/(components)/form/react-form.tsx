"use client"

import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/sonner";

class Client {
  host: string;
  port: number;
  username: string;
  password: string;

  constructor() {
    this.host = "";
    this.port = 0;
    this.username = "";
    this.password = "";
  };
};

export default function ReactForm() {
  const [client, setClient] = useState<Client>(new Client)

  const handleSubmit = () => {
    toast.success(JSON.stringify(client))
  };
  return (
    <form onSubmit={handleSubmit} className="w-1/3 grid grid-cols-5 gap-4 border rounded-md py-4">
    <h1 className="col-start-2 col-span-3">form</h1>

    <div className="col-start-2 col-span-3">
      <Label htmlFor="host">host</Label>
      <Input
        type="text"
        id="host"
        value={client.host}
        onChange={(e) => setClient({...client, host: e.target.value })}
      />
    </div>

    <div className="col-start-2 col-span-3">
      <Label htmlFor="port">port</Label>
      <Input
        type="number"
        id="port"
        value={client.port}
        onChange={(e) => setClient({...client, port: parseInt(e.target.value) })}
      />
    </div>

    <div className="col-start-2 col-span-3">
      <Label htmlFor="username">username</Label>
      <Input
        type="text"
        id="username"
        value={client.username}
        onChange={(e) => setClient({...client, username: e.target.value })}
      />
    </div>

    <div className="col-start-2 col-span-3">
      <Label htmlFor="password">password</Label>
      <Input
        type="text"
        id="password"
        value={client.password}
        onChange={(e) => setClient({...client, password: e.target.value })}
      />
    </div>

    <Button type="submit">Submit</Button>
    {/* <Button className="col-start-2 col-span-3" type="button">Button</Button> */}
  </form>
  );
}