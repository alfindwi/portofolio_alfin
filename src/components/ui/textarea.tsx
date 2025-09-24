import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
      " placeholder:text-[15px] bg-[#212024] resize-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40  dark:bg-input/30 h-[200px] w-full rounded-md px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
