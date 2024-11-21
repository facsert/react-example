"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormEvent, useState, ChangeEvent, FormEventHandler } from "react";
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";


class Client {
  constructor(
    public host: string = "192.168.1.100",
    public port: number = 22,
    public username: string = "root",
    public password: string = "admin"
  ) {}
}

export default function FormPage() {
  // TODO: 添加 Form 组件, 添加下拉, 输入框, checkbox 组件
  return (
    <div className="w-full h-full flex flex-row items-center justify-center gap-2">
      <ReactForm1 />
      <ReactForm2 />
      <ReactForm3 />
    </div>
  );
}

function ReactForm1({...props}) {
  const defaultClient: Client= new Client();
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
    <div className="border rounded-md p-4 w-full max-w-md" {...props}>
      <form action={handleSubmit} className="flex flex-col gap-4">
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
            value={client.username}
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
            value={client.password}
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

class Person {
  constructor(
    public name: string = 'John',
    public age: number = 18,
    public sex: 'boy' | 'girl' = 'boy',
    public hobby: ('walk'| 'swim'|'ride')[] = ["walk"],
  ) {};
}

function ReactForm2({...props}) {
  const [person, setPerson] = useState<Person>(new Person());
  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setPerson(preState => ({...preState, [name]: value }));
  };

  const handleCheckbox = (checked: boolean, value: 'walk'| 'swim'|'ride') => {
    if (checked) {
      setPerson(preState => ({...preState, hobby: [...preState.hobby, value] }));
    } else {
      setPerson(preState => ({...preState, hobby: preState.hobby.filter(item => item !== value) }));
    }
  };

  const handleSubmit = (formData: FormData) => {
    toast.success(JSON.stringify(person));
  }
  const handleReset = () => setPerson(new Person());
  return (
    <div className="border rounded-md p-4 w-full max-w-md" {...props}>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            name='name' 
            type="text" 
            id="name" 
            defaultValue={person.name}
            onChange={handleChange}
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
            onChange={handleChange}
            value={person.age}
          />
        </div>
        <RadioGroup defaultValue="boy" onValueChange={(value: 'boy' | 'girl') => setPerson(preState => ({...preState, sex: value}))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="boy" value="boy" checked={person.sex === 'boy'} />
            <Label htmlFor="boy">Boy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="girl" value="girl" checked={person.sex === 'girl'} />
            <Label htmlFor="girl">Girl</Label>
          </div>
        </RadioGroup>
        <div className="flex flex-row gap-2">
          <Checkbox id="swim" name="hobby"
            value="swim"
            checked={person.hobby.includes('swim')}
            onCheckedChange={(checked: boolean) => handleCheckbox(checked, 'swim')}
          />
          <Label htmlFor="swim">Swim</Label>
          <Checkbox
            id="ride"
            name="hobby"
            value="ride"
            checked={person.hobby.includes('ride')}
            onCheckedChange={(checked: boolean) => handleCheckbox(checked, 'ride')}
          />
          <Label htmlFor="ride">Ride</Label>
          <Checkbox
            id="walk"
            name="hobby"
            value="walk"
            checked={person.hobby.includes('walk')}
            onCheckedChange={(checked: boolean) => handleCheckbox(checked, 'walk')}
          />
          <Label htmlFor="walk">Walk</Label>
        </div>
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleReset}>Reset</Button>
      </form>
      <br />
      <div>
        NAME: {person.name}
        <br />
        AGE: {person.age}
        <br />
        SEX: {person.sex}
        <br />
        HOBBY: [{person.hobby.join(', ')}]
      </div>
    </div>
    );
};

class Phone {
  constructor(
    public user: string = 'John',
    public phoneNumber: string = '13800138000',
    public system: 'ios' | 'android' = 'ios',
    public size: 'mini' | 'plus' | 'ultra' = 'plus',
  ) {}
}

const formSchema = z.object({
  user: z.string().min(2),
  phoneNumber: z.string().min(11).max(11),
  system: z.enum(['ios', 'android']),
  size: z.enum(['mini', 'plus', 'ultra']),
})

function ReactForm3({...props}) {
  const [phone, setPhone] = useState(new Phone());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: new Phone(),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success(JSON.stringify(data));
    console.log(data);
  };
  return (
    <div className="border rounded-md p-4 w-full max-w-md" {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <FormField
            name="user"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage >Please enter your name</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="system"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>System</FormLabel>
                <FormControl>
                <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="ios" value="ios" checked={field.value === 'ios'} />
                    <Label htmlFor="ios">IOS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="android" value="android" checked={field.value === 'android'} />
                    <Label htmlFor="android">Android</Label>
                  </div>
                </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="size"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="mini">mini</SelectItem>
                        <SelectItem value="plus">plus</SelectItem>
                        <SelectItem value="ultra">ultra</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};