"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
} from "@/components/ui/card"
import { useState, useEffect } from "react"
import io from "socket.io-client";
import { toast } from 'sonner';

const socket = io("http://localhost:8010/ws")

export default function CommandPage() {
    const [command, setCommand] = useState("ip a")
    const [msg, setMsg] = useState("")

    const sendCommand = () => {
        toast(`send ${command}`)
        socket.emit("command", command);
    }

    useEffect(() => {
        // client-side
        socket.on("connect", () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });
        
        socket.on("disconnect", () => {
            console.log(socket.id); // undefined
        });

        socket.on("command", (data:string)=> {
            setMsg(`${msg}\n${data}`)
        })
    }, [msg])
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-row gap-2">
                <Label htmlFor="command">command</Label>
                <Input id="command" value={command} onChange={() => setCommand(command)}></Input>
            </div>
            <Button onClick={sendCommand}>执行</Button>
            <Card className="w-full h-[50vh]">
                <CardContent>
                    {msg.split("\n").map((i, line) => <p key={i}>{line}</p>)}
                </CardContent>
            </Card>
        </div>
    )
}