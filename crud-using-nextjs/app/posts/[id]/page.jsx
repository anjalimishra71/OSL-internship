import PostDetail from "../../../components/PostDetails.jsx";

async function getPost(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}

async function getComments(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  const post = await getPost(id);
  const comments = await getComments(id);

  return (
    <PostDetail
      post={post}
      comments={comments}
    />
  );
}