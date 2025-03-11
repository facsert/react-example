"use client";

import { useForm, Controller } from "react-hook-form";
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
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";

const hobbies: string[] = [
  "tennis",
  "basketball",
  "running",
  "swimming",
  "football",
  "volleyball",
];

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  email: z.string().email(),
  hobby: z.string(),
});


// TODO: 表单添加输入验证
export default function FormPage() {
  return (
    <div className="h-full flex flex-row justify-center items-center gap-4">
      <Card className="p-3 w-[20vw]">
        <CardHeader>Form0</CardHeader>
        <TetsForm0 />
      </Card>
      <Card className="p-3 w-[20vw]">
        <CardHeader>Form1</CardHeader>
        <TetsForm1 />
      </Card>
    </div>
  );
}


function TetsForm0() {
  type FormSchema = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "John",
      password: "pass",
      email: "example@mail.com",
      hobby: "football",
    },
  });
  
  const onSubmit = (formData: FormSchema) => {
    toast.info(JSON.stringify(formData))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username"
          {...register("username")}
        />
        {errors.username && (<p className="text-red-500 text-sm">{errors.username.message}</p>)}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder="password"
        />
        {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
        />
        {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
      </div>

      <div>
        <Controller
          name="hobby"
          control={control}
          render={({ field }) => (
            <div>
              <Label>Hobby</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger >
                  <SelectValue placeholder="请选择用户类型" />
                </SelectTrigger>
                <SelectContent>
                  {hobbies.map(hobby => (
                    <SelectItem key={hobby} value={hobby}>{hobby}</SelectItem>  
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
      <Button type="submit">保存</Button>
    </form>
  );
};

function TetsForm1() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Lily",
      password: "pass",
      email: "example@mail.com",
      hobby: "football",
    },
  });
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    toast.info(JSON.stringify(formData))  
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobby"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobby</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hobby" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hobbies.map(hobby => (
                    <SelectItem key={hobby} value={hobby}>{hobby}</SelectItem>  
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
