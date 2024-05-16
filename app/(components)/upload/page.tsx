"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface Rule {
    checked: boolean
    name: string
}

[        {checked: false, name: "blackList"},
{checked: false, name: "logRepeat"},
{checked: false, name: "timeout"},
{checked: false, name: "panic"},]
export default function UploadPage() {
    const [rules, setRules] = useState<Rule[]>([
        {checked: false, name: "blackList"},
        {checked: false, name: "logRepeat"},
        {checked: false, name: "timeout"},
        {checked: false, name: "panic"},
    ]);
    
    
    const handleSubmit = () => {
        console.log(rules)
        console.log("")
        // console.log(data.file)
        // console.log(data.rules)
    }

    return (
        <div className="border">
            <form onSubmit={handleSubmit}>
                <div>
                    {rules.map((rule, index) => {
                        return (
                            <div key={index}>
                                <Checkbox id={rule.name}  onCheckedChange={(checked) => { setRules(rules.map((r, i) => {
                                    if (i === index) {
                                        return {checked: checked? true : false, name: r.name}
                                    }
                                    return r
                                })) }} checked={rule.checked}/>
                                <Label>{rule.name}</Label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Input placeholder="upload file" type="file" />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

