import * as React from "react"

import { cn } from "@/lib/utils"
import { border_color, input_fields_color, input_placeholder_color, input_text_color } from "@/resource/theme"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:bg-[${input_placeholder_color}] text-[${input_text_color}]`,
          className
        )}
        ref={ref}
        {...props}
        style={{backgroundColor:input_fields_color,borderColor:border_color,color:input_text_color}}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
