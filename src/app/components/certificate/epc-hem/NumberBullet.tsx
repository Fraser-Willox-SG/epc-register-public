import * as React from "react";

/** Black circular number bullet used in tables/lists */
export default function NumberBullet({
  n,
  size = 24,
  className,
  title,
}: {
  n: number | string;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`num-bullet ${className ?? ""}`.trim()}
      aria-hidden="true"
      title={title}
      style={{ "--badge-size": `${size}px` } as React.CSSProperties}
    >
      {n}
    </span>
  );
}
