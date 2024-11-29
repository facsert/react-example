"use client"
import { useState, useEffect } from'react';
import Editor, { useMonaco } from '@monaco-editor/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

export default function EditorPage() {
  const [pythonCode, setPythonCode] = useState('');

  return (
    <div className="flex flex-col h-full w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Editor</Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] h-[80vh] p-4">
          <div className="grid grid-cols-3 gap-4 h-[50vh] w-full border border-gray-200 rounded-md">
            <Editor
              height="50vh"
              theme='vs-dark' 
              defaultLanguage="json"
              defaultValue="{}"
            />
            <Editor 
              height="50vh" 
              theme='vs-dark'
              defaultLanguage="python"
              defaultValue="print('hello world')"
              onChange={(value) => setPythonCode(String(value))}
            />
            <Editor 
              height="50vh" 
              theme='vs-dark'
              defaultLanguage="shell"
              defaultValue="echo 'hello world'"
            />
            <Button>Save</Button>
            <Button>Save</Button>
            <Button>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};