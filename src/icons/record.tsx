import type { ComponentProps } from "react";

export const RecordIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
      </g>
    </svg>
  );
};
