export default function Page({ params }) {
  return <h1>My Page :</h1>;
}

export async function generateStaticParams() {
  const posts = await fetch("https://dummyjson.com/products").then((res) => {
    return res.json();
  });

  return posts.products.map((post) => ({
    slug: post.id.toString(),
  }));
}
