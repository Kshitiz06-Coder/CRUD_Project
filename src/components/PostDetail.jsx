import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../api/postService";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch {
        setError("Failed to launch the post details, ");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-gray-500 text-center py-8"> Loading Posts... </p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!post)
    return <p className="text-gray-500 text-center py-8">Post Not Found</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
      >
        Back
      </button>
      <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border  border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {post.body}
        </p>
        <small className="text-gray-400 block">
          Post Id: {post.id} | User Id: {post.userId}
        </small>
      </article>
      // Kshitiz work here; add the Edit/ Delete here;
    </div>
  );
}
