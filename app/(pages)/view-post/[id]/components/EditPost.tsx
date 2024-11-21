"use client";

import { PostType } from "@/app/components/Posts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditPost = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await fetch(`/api/posts/edit/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published }),
      });

      if (response.ok) {
        router.refresh();
        alert("Post updated successfully!");
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false); // Set loading to false when the request is finished
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      {/* Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Published */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <span>Loading...</span> : "Save Changes"}
      </button>
    </form>
  );
};

export default EditPost;
