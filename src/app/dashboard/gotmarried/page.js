"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function GotMarriedPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!session) return toast.error("You must be logged in to post");

    setLoading(true);

    const res = await fetch("/api/married", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, description }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Post created successfully!");
      setTitle("");
      setImage("");
      setDescription("");
    } else {
      toast.error(data.error || "Failed to create post");
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-bold">You must log in to post here.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Got Married 🎉</h2>

      <form onSubmit={handlePost} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
