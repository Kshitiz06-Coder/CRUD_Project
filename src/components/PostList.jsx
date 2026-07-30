import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../api/postService";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllPosts();
        setPosts(data.slice(0, 10));
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center py-8">Loading posts...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2">{post.body}</p>
              <Link
                to={`/post/${post.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>

              {/* TODO: Friend adds Edit/Delete handlers here */}
              <div className="mt-4 flex gap-3">
                <button
                  disabled
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  ✏️ Edit (TODO)
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  🗑️ Delete (TODO)
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
