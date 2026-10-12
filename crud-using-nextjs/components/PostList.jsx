import Link from "next/link";

const PostList = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">

      <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Posts
        </h1>

        <Link
          href="/posts/create"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="mb-2 text-sm font-medium text-gray-400">
              Post #{post.id}
            </p>

            <h2 className="mb-3 line-clamp-2 text-lg font-semibold capitalize text-gray-800">
              {post.title}
            </h2>

            <Link
              href={`/posts/${post.id}`}
              className="inline-block rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;