import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";


// Fetch single post for Edit
const fetchPost = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }

    return response.json();
};


// Create Post
const createPost = async (post) => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
};


// Update Post
const updatePost = async ({ id, post }) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update post");
    }

    return response.json();
};


const PostFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        body: "",
    });

    const [error, setError] = useState("");


    // Fetch selected post when editing
    const {
        data: post,
        isLoading: postLoading,
        error: postError,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id),
        enabled: isEditMode,
    });


    // Put fetched post data into form
    useEffect(() => {
        if (post) {
            setForm({
                title: post.title,
                body: post.body,
            });
        }
    }, [post]);


    // Create / Update mutation
    const mutation = useMutation({
        mutationFn: isEditMode
            ? ({ id, post }) => updatePost({ id, post })
            : createPost,

        onSuccess: () => {
            // Refresh posts list
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

            // Refresh single post cache
            if (isEditMode) {
                queryClient.invalidateQueries({
                    queryKey: ["post", id],
                });
            }

            navigate("/posts");
        },

        onError: (err) => {
            setError(err.message);
        },
    });


    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (isEditMode) {
            mutation.mutate({
                id,
                post: {
                    title: form.title,
                    body: form.body,
                },
            });
        } else {
            mutation.mutate({
                title: form.title,
                body: form.body,
            });
        }
    };


    // Loading selected post in edit mode
    if (isEditMode && postLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-medium text-gray-600">
                    Loading post...
                </p>
            </div>
        );
    }


    // Error while fetching selected post
    if (isEditMode && postError) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-500">
                    {postError.message}
                </p>
            </div>
        );
    }


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


                    
                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() => navigate("/posts")}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {mutation.isPending
                                ? "Saving..."
                                : isEditMode
                                    ? "Save Changes"
                                    : "Create Post"
                            }
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default PostFormPage;