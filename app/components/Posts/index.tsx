import Link from "next/link";
import React from "react";
import DeletePostButton from "./DeletePostButton";

export type PostType = {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  author: {
    name: string | null;
  } | null;
};
const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Blog Posts</h1>
          <Link
            href={"/add-post"}
            className=" p-2 bg-green-600 font-bold text-white rounded-md shadow"
          >
            Add Blog
          </Link>
        </div>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {post.title}
                  </h2>

                  <Link href={`/view-post/${post.id}`}>
                    <button
                      className={`px-4 py-2  text-sm font-medium bg-yellow-100 text-yellow-700`}
                    >
                      View
                    </button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Author: {post.author?.name || "Unknown"}
                </p>
                <p className="text-gray-700 mt-4">{post.content}</p>
                <div className="mt-4 flex justify-between">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {post.published ? "Published" : "Unpublished"}
                  </span>

                  <DeletePostButton postId={post.id} />
                </div>
              </div>
            ))
          ) : (
            <h1>No Blog Posted yet</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
