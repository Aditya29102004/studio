import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8c0-2.2-1.8-4-4-4-1.1 0-2.1.5-2.8 1.2-1.4 1.5-2.8 3.2-4.2 5.1-1.2 1.5-2.4 3-3 4.5-.6 1.5-1 3.2.3 4.6.8 1.1 2.2 1.8 3.7 1.8h1.5c.6 0 1.2.2 1.7.7.5.5.7 1.2.7 1.7v.5c0 .6.4 1 1 1h.2c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7v-.5c0-.6.2-1.2.7-1.7.5-.5 1.2-.7 1.7-.7h1.5c1.5 0 2.9-.7 3.7-1.8.9-1.2.7-2.8.2-4.2-.7-1.5-1.9-2.7-3.2-3.8zM4 17c.3-.9.7-1.7 1.3-2.5" />
      <path d="M10.2 6.8c.4-.9 1.1-1.4 2-1.6" />
      <path d="M8.5 10.5c.9-1 2-1.5 3.5-1.5.9 0 1.7.3 2.5 1" />
      <line x1="12" y1="22" x2="12" y2="22" />
      <path d="M12 22v-2.5" />
    </svg>
  );
}
