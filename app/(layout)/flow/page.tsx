"use client"

import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Article, getArticles } from "@/hook/article";
import { useEffect, useState } from "react";

// const articles = [
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 2",
//         content: "This is the second flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 3",
//         content: "This is the third flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
//     {
//         title: "Flow 1",
//         content: "This is the first flow",
//         date: "2021-01-01",
//     },
// ]

export default function FlowPage() {
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        getArticles().then((articles) => {
            setArticles(articles);
        })
    }, [])
    return (
       <div className="flex justify-center flex-row w-full h-full">
           <ScrollArea className="h-[80vh] rounded-md border p-2">
            {articles.map((article, index) => {
                return (
                    <Card key={article.id} className="w-[800px] mb-2 hover:bg-accent" onClick={() => {router.push(`/flow/${article.id}`)}}>
                        <CardHeader>
                            <CardTitle>{article.title}</CardTitle>
                            <CardDescription>{String(article.updated_at)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {article.tags.join(", ")}
                        </CardContent>
                    </Card>
                )
            })

            }
           </ScrollArea>
       </div>
    );
}