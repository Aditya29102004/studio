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
        <path d="M12 2a7 7 0 0 0-7 7c0 3.03 1.2 4.68 3 6.32a7 7 0 0 1 8 0c1.8-1.64 3-3.29 3-6.32a7 7 0 0 0-7-7Z" />
        <path d="M9.5 16.5h5" />
        <path d="M9.5 19.5h5" />
    </svg>
    );
}