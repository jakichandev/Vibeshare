interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  required?: boolean;
}

export const Field = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  autoComplete = "off",
  required = false,
}: FieldProps) => {
  return (
    <label className="block">
      <span className="block mb-1 text-sm text-theme-gy-200 font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="
          w-full rounded-xl bg-theme-v-700 border border-theme-v-800
          px-4 py-3 text-base text-theme-gy-100
          placeholder:text-theme-gy-400
          focus:outline-none focus:ring-2 focus:ring-theme-gy-200 focus:ring-offset-2 focus:ring-offset-theme-v-900
          transition-shadow duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
    </label>
  );
};
