"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
  className?: string;
}

export const AuthCard = ({
  children,
  headerLabel,
  className,
}: AuthCardProps) => {
  return (
    <Card className={cn("shadow-xs border border-border", className)}>
      <CardHeader className="flex flex-col items-center">
        <CardDescription>{headerLabel}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
