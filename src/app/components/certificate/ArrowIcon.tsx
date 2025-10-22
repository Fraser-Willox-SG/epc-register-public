import * as React from "react";

export default function ArrowIcon({
  dir = "up",
  size = 24,
  className,
}: {
  dir?: "up" | "down" | "left" | "right";
  size?: number;
  className?: string;
}) {
  const rotate =
    dir === "up"
      ? "rotate(0deg)"
      : dir === "right"
      ? "rotate(90deg)"
      : dir === "down"
      ? "rotate(180deg)"
      : "rotate(-90deg)";

  return (
    <svg
      width={size}
      height={(size * 49) / 25}
      viewBox="0 0 25 49"
      aria-hidden="true"
      className={className}
      style={{ transform: rotate }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.861 46.4989L17.2688 13.3119L21.8532 16.2094C23.2494 17.0884 24.7104 15.1904 23.6632 13.8642L13.0982 0.539634C12.526 -0.179878 11.4933 -0.179878 10.9247 0.539634L0.359688 13.8642C-0.694656 15.1904 0.769911 17.0884 2.16251 16.2094L6.75052 13.3158L10.1547 46.4989C10.3957 48.8792 13.6236 48.8792 13.861 46.4989Z"
        fill="#D32205"
      />
    </svg>
  );
}
