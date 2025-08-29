import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }) => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={cn("drop-shadow-[0_0_8px_hsl(var(--primary))]", className)}
    {...props}
  >
    <path 
      d="M8.3,18H6L12,6L18,18H15.7L14.7,15.5H9.3L8.3,18 M10.1,13.5H13.9L12,8.5L10.1,13.5Z"
      fill="hsl(var(--primary))" 
    />
  </svg>
);

export const Icons = {
  Logo,
};
