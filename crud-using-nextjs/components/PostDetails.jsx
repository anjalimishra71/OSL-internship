import PostActions from "./PostActions";
const PostDetail = ({ post, comments }) => {
  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-4xl">
        <PostActions id={post.id} />
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

      </div>
    </div>
  );
};

export default PostDetail;