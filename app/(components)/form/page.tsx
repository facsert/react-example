"use client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, ChangeEvent } from "react";

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
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="host">host</Label>
        <Input
          type="text"
          id="host"
          value={client.host}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="port">port</Label>
        <Input
          type="number"
          id="port"
          value={client.port}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="username">username</Label>
        <Input
          type="text"
          id="username"
          value={client.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="password">password</Label>
        <Input
          type="text"
          id="password"
          value={client.password}
          onChange={handleChange}
        />
      </div>

      {/* <Button type="submit">Submit</Button> */}
      <Button type="button" onClick={testAction}>
        Button
      </Button>
    </form>
  );
}
