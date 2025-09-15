"use client";

import { useEffect, useRef } from "react";

type StickySidebarProps = {
  /** Header height + desired gap, in px */
  offset?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Uses CSS `position: sticky` if possible.
 * If sticky can't engage due to layout/overflow, falls back to `position: fixed`.
 */
export default function StickySidebar({
  offset = 0,
  className,
  children,
}: StickySidebarProps) {
  const asideRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // tiny helper to join classes without clsx
  const asideClass = "ds_layout__sidebar" + (className ? " " + className : "");

  useEffect(() => {
    const aside = asideRef.current!;
    const inner = innerRef.current!;

    // Try native sticky first
    inner.style.position = "sticky";
    inner.style.top = `${offset}px`;

    let stickyWorks = false;
    try {
      stickyWorks = getComputedStyle(inner).position === "sticky";
    } catch {
      stickyWorks = false;
    }
    if (stickyWorks) return; // native sticky will handle it

    // Fallback: fixed with synced left/width
    inner.classList.add("sgds-sticky-fixed");

    const sync = () => {
      const rect = aside.getBoundingClientRect();
      inner.style.left = `${rect.left}px`; // viewport coords for fixed
      inner.style.width = `${rect.width}px`;
      inner.style.top = `${offset}px`;
    };

    const onScroll = () => sync();
    const onResize = () => sync();

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Keep width aligned if the column resizes
    let ro: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(sync);
      ro.observe(aside);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [offset]);

  return (
    <aside
      ref={asideRef}
      className={asideClass}
      aria-label="Document navigation"
    >
      <div ref={innerRef}>{children}</div>
    </aside>
  );
}
