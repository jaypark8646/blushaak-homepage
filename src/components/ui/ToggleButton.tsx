"use client";

interface ToggleButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ToggleButton({
  options,
  value,
  onChange,
  className = "",
}: ToggleButtonProps) {
  return (
    <div className={`inline-flex rounded-lg border border-gray-200 p-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200
            ${
              value === option
                ? "bg-mint-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
