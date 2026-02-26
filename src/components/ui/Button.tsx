"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "cta" | "outline" | "ghost" | "mint";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary:
    "bg-blu-500 text-white hover:bg-blu-600 active:bg-blu-700",
  cta: "bg-cta-500 text-white hover:bg-cta-600 active:bg-cta-400",
  outline:
    "border-2 border-blu-500 text-blu-500 hover:bg-blu-500 hover:text-white",
  ghost: "text-dark-800 hover:bg-gray-100",
  mint: "bg-mint-500 text-white hover:bg-mint-600",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        font-[family-name:var(--font-dm-sans)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
