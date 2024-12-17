"use client"
import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import WebSocket from 'websocket';
import { toast } from "sonner";

export default function WebSocketPage() {
  
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string[]>([]);
  const [connect, setConnect] = useState<WebSocket|null>(null);
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8008/api/v1/ws');

    socket.onopen = () => {
      toast.success('WebSocket connection established');
    };
  
    socket.onmessage = (event: MessageEvent<string>) => {
      toast.success(`Get message: ${event.data}`);
      setMessage(prev => [...prev, event.data]);
    }

    socket.onerror = (error: Event) => {
      toast.error(`WebSocket error ${JSON.stringify(error)}`);
    };
    
    setConnect(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  
  const handleSend = () => {
    if (connect && input) {
      connect.send(input);
      setInput("");
    }
  }
  
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="w-[20vw]">
        <div className="flex flex-row items-center mb-4">
          <div>
            <Label>WebSocket Example</Label>
            <Input
              className="w-[15vw]"
              placeholder="Enter message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={handleSend} className="ml-4 mt-6">Send</Button>
        </div>
        <div>
          {message.map((msg, index) => (
            <p key={index}>{`Index ${index+1}: ${msg}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};