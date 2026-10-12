"use client";

import { useRouter } from "next/navigation";

const PostActions = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Do you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      router.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-5 flex justify-end gap-3">
      <button
        onClick={() => router.push(`/posts/${id}/edit`)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Edit Post
      </button>

      <button
        onClick={handleDelete}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default PostActions;