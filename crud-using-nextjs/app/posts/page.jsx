import PostList from "@/components/PostList";

async function getPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export default async function PostsPage() {
  const data = await getPosts();

  return <PostList data={data} />;
}