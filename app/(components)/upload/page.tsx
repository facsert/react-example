"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, FormEvent } from "react"
import { toast } from 'sonner';

interface Rule {
    id: number
    name: string
    checked: boolean
}

interface Link {
    isLoading: boolean
    url: string
    filename: string
}

// { id: 1, name: "blacklist", checked: false },
// { id: 2, name: "timeout", checked: false },
// { id: 3, name: "panic", checked: false },

export default function UploadPage() {
    const [file, setFile] = useState<File>();
    const [link, setLink] = useState<Link>({
        isLoading: false,
        url: "",
        filename: ""
    });
    const [rules, setRules] = useState<Rule[]>([]);
  
    const formData = new FormData();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!file) {
            toast.error( "please add file", 
                {action: { label: "ok", onClick: () => {}} 
            })
            return
        }
        
        setLink({...link, isLoading: true})
        formData.append("file", file);
        // formData.append("rules", `${blacklist? "blacklist": ""},${timeout? "timeout": ""},${panic? "panic": ""}`)
        
        try {
            const response = await fetch("http://localhost:8050/api/v1/scan/file", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const blob = await response.blob();
                setLink({
                    isLoading: false,
                    url: window.URL.createObjectURL(blob),
                    filename: response.headers.get("Content-Disposition")?? "filename=example.zip"
                });
                console.log("upload success");
            } else {
                console.log("upload failed");
            }
        } catch (error) {
            console.log("upload error", error);
        }
    }

    function Download() {
        if (!link.url) {
            toast.error( "no response", 
                {action: { label: "ok", onClick: () => {}} 
            })
            return
        }
        const element = document.createElement('a');
        element.href = link.url;
        element.download = link.filename
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        window.URL.revokeObjectURL(link.url);

        setLink({...link, url: ""})
        console.log('upload success');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-[300px] z-0 border rounded-md hover:bg-accent ">
                    <Label htmlFor="uploadFile" className="flex flex-col justify-end items-center w-full h-[300px] z-10 cursor-pointer"><p>{file?.name?? "upload File"}</p></Label>
                    <Input className="w-full h-[300px] z-30 opacity-0 cursor-pointer" id="uploadFile" type="file" onChange={(e) => setFile(e.target.files?.[0])}/>
                </div>
                <div className="flex flex-row mt-4 gap-4">
                {rules.map((rule, index) => {
                    return (
                        <div key={index}>
                            <Checkbox className="mr-1" id={rule.name} checked={rule.checked}  onCheckedChange={(checked: boolean) => { setRules(rules.map((r, i) => {
                                return i === index? {id: r.id, checked: checked? true : false, name: r.name} : r
                            }))}} />
                            <Label htmlFor={rule.name}>{rule.name}</Label>
                        </div>
                    )
                })}
                </div>
                <div className="flex flex-row h-[20vh] border">
                    
                </div>
                <div className="flex flex-col gap-4 my-4">
                    <Button type="submit">Submit</Button>
                    <Button className="w-full" type="button" onClick={Download} >Download</Button>
                </div>
            </form>
        </div>
    )
}

