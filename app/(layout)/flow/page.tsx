"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useState, useMemo } from "react";

import { LocalArticles, Article } from "./articles";

// TODO: 添加显示内容的功能
export default function FlowPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  useMemo(() => {
    setArticles(LocalArticles);
  }, []);
  return (
    <div className="flex justify-center flex-row w-full h-full">
      <ScrollArea className="h-[80vh] rounded-md border p-2">
        {articles.map((article, index) => {
          return (
            <Card
              key={index}
              className="w-[800px] mb-2 hover:bg-accent"
              onClick={() => {
                router.push(`/flow/${index}`);
              }}
            >
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{String(article.date)}</CardDescription>
              </CardHeader>
              <CardContent>{article.content}</CardContent>
            </Card>
          );
        })}
      </ScrollArea>
    </div>
  );
}


