import * as React from "react";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return (
    <div className={`p-4 pt-0 ${className}`} {...props} />
  );
}