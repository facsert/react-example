"use client"
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, ChangeEvent } from "react";

interface Client {
    host: string
    port: number
    username: string
    password: string
}

export default function FormPage() {
    const [client, setClient] = useState<Client>({
        host: "",
        port: 0,
        username: "",
        password: ""
    })
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(client)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target as HTMLInputElement;
        setClient({...client, [id]: value})
        console.log(client)
    }

    function testAction(formData: FormData) {
        console.log("TEST ACTION");
        console.log(formData.get("host"));
        console.log(formData.get("username"));
        toast.success("Success");
    }
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="host">host</Label>
            <Input type="text" id="host" value={client.host} onChange={handleChange}/>

            <Label htmlFor="port">port</Label>
            <Input type="number" id="port" value={client.port} onChange={handleChange} />

            <Label htmlFor="username">username</Label>
            <Input type="text" id="username" value={client.username} onChange={handleChange} />

            <Label htmlFor="password">password</Label>
            <Input type="text" id="password" value={client.password} onChange={handleChange} />

            <Button type="submit">Submit</Button>
            <Button formAction={testAction}>Button</Button>
        </form>
    );
}