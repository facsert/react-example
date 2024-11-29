"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LocalArticles, Article} from "../articles";


export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article>();

  useMemo(() => {
    setArticle(LocalArticles[Number(params.slug)]);
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
