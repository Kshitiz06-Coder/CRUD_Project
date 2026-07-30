import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex gap-6">
        <Link
          to="/"
          className="font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
}
