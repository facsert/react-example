import { create } from 'zustand'
const url:string = 'http://localhost:8010'

interface Article
{
    id: number;
    title: string;
    tags: string[];
    content: string;
    created_at: Date;
    updated_at: Date;
}

const getArticles: () => Promise<Article[]> = async () => {   
    try {
        const response = await fetch(`${url}/api/v1/articles`)
        console.log(response.status);
        return !response.ok ? []: response.json();
        // return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getArticleById: (id: number) => Promise<Article> = async (id: number) => {   
    try {
        const response = await fetch(`${url}/api/v1/articles/${id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}



interface SelectArticle {
    id: number;
    setId: (value: number) => void;
}

const useArticle = create<SelectArticle>((set) => ({
    id: 1,
    setId: (value: number) => set({ id: value }),
}))

export { getArticles, getArticleById, useArticle };
export type { Article };
