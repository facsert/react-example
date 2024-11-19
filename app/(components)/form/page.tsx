"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "sonner"
import ReactForm from "./react-form";
import { set } from "react-hook-form";


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
      <ReactForm2 />
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

function ReactForm2({...props}) {
  type Person = {
    name: string;
    age: number;
    sex: 'boy' | 'girl';
    hobby: 'walk'| 'swim'|'ride'
  }
  const defaultData: Person = {
    hobby: "walk",
    sex: 'boy',
    age: 18,
    name: 'John',
  }

  const [person, setPerson] = useState<Person>(defaultData);
  async function handleSubmit(formData: FormData) {
    // const port: number = (formData.get('port')?? client.port) as number;
    // setClient(preState => ({...preState,
    //   host: formData.get('host') as string,
    //   port: (formData.get('port') ?? client.port) as number,
    //   username: formData.get('username') as string,
    //   password: formData.get('password') as string,
    // }))
    toast.success(JSON.stringify(person));
  }
  
  const handleReset = () => setPerson(defaultData);
  return (
    <div className="border rounded-md p-4 w-full max-w-md gap-4" {...props}>
      <form action={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            name='name' 
            type="text" 
            id="name" 
            defaultValue={person.name}
            onChange={(e) => setPerson(preState => ({...preState, name: e.target.value}))}
            value={person.name}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input 
            name='age' 
            type="number" 
            id="age" 
            defaultValue={person.age}
            onChange={(e) => setPerson(preState => ({...preState, age: e.target.valueAsNumber}))}
            value={person.age}
          />
        </div>
        <RadioGroup defaultValue="boy" onValueChange={(value) => console.log(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="boy" value="boy" />
            <Label htmlFor="boy">Boy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="girl" value="girl" />
            <Label htmlFor="girl">Girl</Label>
          </div>
        </RadioGroup>
        <div>
          <Checkbox id="swim" name="hobby" value="swim" />
          <Label htmlFor="swim">Swim</Label>
          <Checkbox id="ride" name="hobby" value="ride" />
          <Label htmlFor="ride">Ride</Label>
          <Checkbox id="walk" name="hobby" value="walk" />
          <Label htmlFor="walk">Walk</Label>
        </div>
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleReset}>Reset</Button>
      </form>
      <br />
      <div>
        Fruit: apple
        <br />
        
        <br />
      
        <br />
  
      </div>
    </div>
    );
};
