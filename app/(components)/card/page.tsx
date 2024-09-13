"use client"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    CardDescription 
} from "@/components/ui/card";
import { useState } from "react";

export default function CardPage() {
    const [selected, setSelect] = useState(false)
    return (
      <>
      <h1>Card Page</h1>
      <Card className="hover:bg-accent" onClick={() => setSelect(!selected)}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          {selected? "selected": "not select"}
        </CardContent>
      </Card>
      </>
    );
}