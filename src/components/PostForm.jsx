import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postService";

export default function PostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      const newPost = await createPost(formData);
      setMessage(`✅ Post created successfully! (ID: ${newPost.id})`);
      setFormData({ title: "", body: "", userId: 1 });
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setMessage("❌ Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>

      {message && (
        <p className="mb-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-sm">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter post content"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition ${
            submitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
