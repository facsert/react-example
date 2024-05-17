"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, FormEvent } from "react"

export default function UploadPage() {
    const [file, setFile] = useState<File>();
    const [blacklist, setBlacklist] = useState(false);
    const [timeout, setTimeout] = useState(false);
    const [panic, setPanic] = useState(false);

    async function handleUpload(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            console.log("upload file", file);            
            formData.append("rules", `${blacklist? "blacklist": ""},${timeout? "timeout": ""},${panic? "panic": ""}`)
            
            try {
                const response = await fetch("http://localhost:8050/api/v1/scan/file", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    console.log("upload success");
                    console.log("upload response", await response.json());
                } else {
                    console.log("upload failed");
                }
            } catch (error) {
                console.log("upload error", error);
            }

        }
    }

    return (
        <div className="border">
            <form onSubmit={handleUpload}>
                <div>
                    <Checkbox id="blacklist" checked={blacklist} onCheckedChange={(checked) => setBlacklist(checked? true : false)} />
                    <Label htmlFor="blacklist">blacklist</Label>
                    <Checkbox id="timeout" checked={timeout} onCheckedChange={(checked) => setTimeout(checked? true : false)} />
                    <Label htmlFor="timeout">timeout</Label>
                    <Checkbox id="panic" checked={panic} onCheckedChange={(checked) => setPanic(checked? true : false)} />
                    <Label htmlFor="panic">panic</Label>

                </div>
                <div>
                    <Label htmlFor="uploadFile">Upload</Label>
                    <Input id="uploadFile" type="file" onChange={(e) => setFile(e.target.files?.[0])}/>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}


// {rules.map((rule, index) => {
//     return (
//         <div key={index}>
//             <Checkbox id={rule.name}  onCheckedChange={(checked) => { setRules(rules.map((r, i) => {
//                 if (i === index) {
//                     return {checked: checked? true : false, name: r.name}
//                 }
//                 return r
//             })) }} checked={rule.checked}/>
//             <Label>{rule.name}</Label>
//         </div>
//     )
// })}

