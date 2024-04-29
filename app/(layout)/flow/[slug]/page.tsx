
import ArticlePage from "@/components/ArticlePage"

export default function SlugPage({ params }: { params: { slug: string } }) {
    return <div><ArticlePage id={Number(params.slug)} /></div>
}