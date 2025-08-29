import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
      d="M8 18V6H10.4L15.6 14.25V6H18V18H15.6L10.4 9.75V18H8Z"
      fill="hsl(var(--primary))" 
    />
  </svg>
);

export const Icons = {
  Logo,
};
