import { useEffect, useState } from "react";

const CommentCard = ({ sinData }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${sinData.id}/comments`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const data = await response.json();

                setComments(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchComments();
    }, [sinData.id]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="rounded-lg border border-gray-200 bg-white p-4"
                    >
                        <h2 className="mb-1 font-semibold text-gray-800">
                            {comment.name}
                        </h2>

                        <p className="mb-2 text-sm text-blue-600">
                            {comment.email}
                        </p>

                        <p className="text-sm leading-6 text-gray-600">
                            {comment.body}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No comments available.</p>
            )}
        </div>
    );
};

export default CommentCard;