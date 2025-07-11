import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  );
};

export const CardTitle = ({ className, ...props }) => {
  return (
    <div
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
};

export const CardDescription = ({ className, ...props }) => {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
};

export const CardContent = ({ className, ...props }) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  );
};

export const CardFooter = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
};
