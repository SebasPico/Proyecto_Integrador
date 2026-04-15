export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  success,
  rightElement,
  autoComplete,
}) {
  const borderStateClass = error
    ? "border-red-500 focus:ring-red-200 focus:border-red-500"
    : success
      ? "border-emerald-500 focus:ring-emerald-200 focus:border-emerald-500"
      : "border-slate-300 focus:ring-sky-200 focus:border-sky-500";

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-4 ${borderStateClass}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-3 flex items-center">{rightElement}</div>
        ) : null}
      </div>
      <p
        id={`${id}-error`}
        className={`mt-2 min-h-5 text-sm ${error ? "text-red-600" : "text-emerald-600"}`}
      >
        {error || (success ? "Se ve bien." : "")}
      </p>
    </div>
  );
}
