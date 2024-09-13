"use client";

import React, { useEffect, useState, useMemo } from "react";
// import { Article, getArticleById } from "@/hook/article";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { localArticles, Article} from "../page";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article>();
  // useEffect(() => {
  //   getArticleById(Number(params.slug)).then((article) => {
  //     setArticle(article);
  //   });
  // }, [params.slug]);
  useMemo(() => {
    setArticle(localArticles[Number(params.slug)]);
  }, [params.slug])
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article?.title}</CardTitle>
        {/* <p>{article?.tags}</p> */}
      </CardHeader>
      <CardContent>
        <p>{article?.content}</p>
      </CardContent>
    </Card>
  );
}

// export default ArticlePage;
