import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = ({ data, setData }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const localPost = data.find(
                    (post) => post.id === Number(id)
                );

                if (localPost) {
                    setPost(localPost);
                } else {
                    const postResponse = await fetch(
                        `https://jsonplaceholder.typicode.com/posts/${id}`
                    );

                    if (!postResponse.ok) {
                        throw new Error("Failed to fetch post");
                    }

                    const postData = await postResponse.json();
                    setPost(postData);
                }

                
                const commentsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
                );

                if (!commentsResponse.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const commentsData = await commentsResponse.json();
                setComments(commentsData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id, data]);

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

            setData((prevData) =>
                prevData.filter(
                    (post) => post.id !== Number(id)
                )
            );

            navigate("/posts");

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-500">
                    {error}
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

                {/* Actions */}
                <div className="mb-5 flex justify-end gap-3">
                    <button
                        onClick={() => navigate(`/posts/${id}/edit`)}
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

                    {comments.length > 0 ? (
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
                    ) : (
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