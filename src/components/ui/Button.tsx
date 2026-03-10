import { ButtonProps } from "@/types";

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-blue-500 text-white hover:shadow-lg  disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-purple-500 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-red-500 text-white hover:bg-red-600  disabled:opacity-50 disabled:cursor-not-allowed",
    success:
      "bg-green-600 text-white hover:bg-green-600  disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};
