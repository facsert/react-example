"use client"

import React, { useEffect, useState } from "react"
import { Article, getArticleById } from "@/hook/article"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ArticleId {
  id: number
}

export default function ArticlePage( { id }: ArticleId )  {
// const ArticlePage: React.FC<ArticleId> = ( { id } ) => {
    const [article, setArticle] = useState<Article>()
    const articleId = id
    useEffect(() => {
      getArticleById(articleId).then((article) => {
        setArticle(article);
      })
    })
    return (
      <Card>
        <CardHeader>
          <CardTitle>{article?.title}</CardTitle>
          <p>{article?.tags}</p>
        </CardHeader>
        <CardContent>
          <p>{article?.content}</p>
        </CardContent>
      </Card>
    );
}

// export default ArticlePage;
