export default function SlugPage({ params }: { params: { slug: string } }) {
    return <div>Flow Post: {params.slug}</div>
}