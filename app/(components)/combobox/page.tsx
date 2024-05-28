"use client"

import ComboBoxResponsive from "./combobox"
import { Option } from "./combobox"
import { useState } from "react"



const colors: Option[] = [
    {
        value: "red",
        label: "Red",
    },
    {
        value: "green",
        label: "Green",
    },
    {
        value: "blue",
        label: "Blue",
    },
]

const fruits: Option[] = [
    {
        value: "apple",
        label: "Apple",
    },
    {
        value: "banana",
        label: "Banana",
    },
    {
        value: "orange",
        label: "Orange",
    },
]

const hobbies: Option[] = [
    {
        value: "coding",
        label: "Coding",
    },
    {
        value: "reading",
        label: "Reading",
    },
    {
        value: "gaming",
        label: "Gaming",
    },
]

export default function ComboBoxPage() {
    const [color, setColor] = useState<Option | null>(null)
    const [fruit, setFruit] = useState<Option | null>(null)
    const [hobby, setHobby] = useState<Option | null>(null)

    return (
        <div className="h-full w-full flex flex-row justify-center items-center gap-4 ">
            <div className="flex flex-col gap-4 justify-center items-center h-[20vh] w-[20vw] hover:bg-accent rounded-full">
                <div>
                    {color? color.label: "None"}
                </div>
                <div>
                    <ComboBoxResponsive statusList={colors} setValue={setColor} />
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4 items-center h-[20vh] w-[20vw] hover:bg-accent rounded-full">
                <div>
                    {fruit? fruit.label: "None"}
                </div>
                <div>
                    <ComboBoxResponsive statusList={fruits} setValue={setFruit} />
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4 items-center h-[20vh] w-[20vw] hover:bg-accent rounded-full">
                <div>
                    {hobby? hobby.label: "None"}
                </div>
                <div>
                    <ComboBoxResponsive statusList={hobbies} setValue={setHobby} />
                </div>
            </div>
        </div>
    )

}

