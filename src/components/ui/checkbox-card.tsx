"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  details?: React.ReactNode;
}

export const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ className, label, details, ...props }, ref) => {
    return (
      <div className={cn(
        "relative h-full flex cursor-pointer rounded-lg border border-gray-700 bg-gray-900/10 backdrop-blur-md /50 p-4 shadow-sm focus-within:ring-2 focus-within:ring-primary",
        props.checked ? "border-primary bg-primary/10" : "hover:bg-gray-800/50 /50",
        className
      )}>
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-foreground">{label}</div>
            <div className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border",
              props.checked ? "border-primary bg-primary text-primary-foreground" : "border-gray-600"
            )}>
              {props.checked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          {details && (
            <div className="mt-2 text-xs text-gray-400">
              {details}
            </div>
          )}
        </div>
      </div>
    )
  }
)

CheckboxCard.displayName = "CheckboxCard" 