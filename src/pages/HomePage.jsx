import PostList from "../components/PostList";
export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">React CRUD Demo</h1>
      <PostList />
    </div>
  );
}
