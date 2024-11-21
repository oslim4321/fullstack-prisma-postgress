import prisma from "@/lib/prisma";
import React from "react";
import EditPost from "./components/EditPost";

const getData = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return post;
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await getData(id);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-500">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {/* Author Information */}
      <div className="text-sm text-gray-600 mb-4">
        <p>
          <strong>Author:</strong> {post.author?.name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${post.author?.email}`}
            className="text-blue-600 underline"
          >
            {post.author?.email}
          </a>
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
        <span>
          <strong>Status:</strong>{" "}
          {post.published ? (
            <span className="text-green-600">Published</span>
          ) : (
            <span className="text-red-600">Unpublished</span>
          )}
        </span>
        <span>|</span>
        <span>
          <strong>Author ID:</strong> {post.authorId}
        </span>
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>{post.content}</p>
      </div>

      <EditPost post={post} />
    </div>
  );
};

export default Page;
