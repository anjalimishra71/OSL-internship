import { useNavigate, useParams } from "react-router-dom";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";


// Fetch single post
const fetchPost = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }

    return response.json();
};


// Fetch comments
const fetchComments = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
};


// Delete post
const deletePost = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }

    return response.json();
};


const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();


    // Fetch post
    const {
        data: post,
        isLoading: postLoading,
        isError: postIsError,
        error: postError,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id),
    });


    // Fetch comments
    const {
        data: comments = [],
        isLoading: commentsLoading,
        isError: commentsIsError,
        error: commentsError,
    } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetchComments(id),
    });


    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: () => deletePost(id),

        onSuccess: () => {
            // Remove deleted post from cache
            queryClient.removeQueries({
                queryKey: ["post", id],
            });

            // Refresh posts list
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

            navigate("/posts");
        },
    });


    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Do you want to delete this post?"
        );

        if (!confirmDelete) {
            return;
        }

        deleteMutation.mutate();
    };


    // Post loading
    if (postLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading post...
                </p>
            </div>
        );
    }


    // Post error
    if (postIsError) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-500">
                    {postError.message}
                </p>
            </div>
        );
    }


    if (!post) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">
                    Post not found
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
            <div className="mx-auto max-w-4xl">

              
                <div className="mb-5 flex justify-end gap-3">

                    <button
                        onClick={() => navigate(`/posts/${id}/edit`)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Edit Post
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {deleteMutation.isPending
                            ? "Deleting..."
                            : "Delete"
                        }
                    </button>

                </div>


                {/* Delete Error */}
                {deleteMutation.isError && (
                    <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {deleteMutation.error.message}
                    </p>
                )}


                {/* Post */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                    <p className="mb-2 text-sm text-gray-400">
                        Post #{post.id}
                    </p>

                    <h1 className="mb-4 text-2xl font-bold capitalize text-gray-800">
                        {post.title}
                    </h1>

                    <p className="leading-7 text-gray-600">
                        {post.body}
                    </p>

                </div>


                {/* Comments */}
                <div className="rounded-xl bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Comments
                    </h2>


                    {commentsLoading && (
                        <p className="text-sm text-gray-500">
                            Loading comments...
                        </p>
                    )}


                    {commentsIsError && (
                        <p className="text-sm text-red-500">
                            {commentsError.message}
                        </p>
                    )}


                    {!commentsLoading &&
                        !commentsIsError &&
                        comments.length > 0 && (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="rounded-lg border border-gray-200 p-4"
                                    >
                                        <h3 className="font-semibold text-gray-800">
                                            {comment.name}
                                        </h3>

                                        <p className="mb-2 text-sm text-blue-600">
                                            {comment.email}
                                        </p>

                                        <p className="text-sm leading-6 text-gray-600">
                                            {comment.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}


                    {!commentsLoading &&
                        !commentsIsError &&
                        comments.length === 0 && (
                            <p className="text-sm text-gray-500">
                                No comments available.
                            </p>
                        )}

                </div>


                {/* Back */}
                <button
                    onClick={() => navigate("/posts")}
                    className="mt-5 text-sm font-medium text-blue-600 hover:underline"
                >
                    ← Back to Posts
                </button>

            </div>
        </div>
    );
};

export default PostDetail;