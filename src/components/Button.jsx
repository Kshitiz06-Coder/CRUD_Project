export const Button = ({
  children,
  isLoading,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition flex items-center justify-center gap-2 disabled:opacity-50";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      disabled={isLoading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};
