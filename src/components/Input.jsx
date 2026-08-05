export const Input = ({ label, error, className = '', ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
    )}
    <input
      className={`
        w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-900
        placeholder:text-slate-400
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
        ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 hover:border-slate-300'}
        ${className}
      `}
      {...props}
    />
    {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
  </div>
);