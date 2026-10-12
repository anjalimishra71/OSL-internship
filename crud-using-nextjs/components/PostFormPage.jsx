"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const PostFormPage = () => {
  const router = useRouter();
  const params = useParams();

  const id = params?.id;
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }

          const data = await response.json();

          setForm({
            title: data.title,
            body: data.body,
          });
        } catch (error) {
          setError(error.message);
        }
      };

      fetchPost();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: form.title,
              body: form.body,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update post");
        }

        await response.json();
      } else {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: form.title,
              body: form.body,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create post");
        }

        await response.json();
      }

      router.push("/posts");
      router.refresh();

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md md:p-8">

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Post" : "Create Post"}
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Enter Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Body */}
          <div>
            <label
              htmlFor="body"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Enter Body
            </label>

            <textarea
              id="body"
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Enter post body"
              rows="6"
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => router.push("/posts")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Post"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default PostFormPage;