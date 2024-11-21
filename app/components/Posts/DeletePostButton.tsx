"use client";

import { useRouter } from "next/navigation";

const DeletePostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  async function handleDeletePost() {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      router.refresh();
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  }
  return (
    <button
      className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700"
      onClick={handleDeletePost}
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
