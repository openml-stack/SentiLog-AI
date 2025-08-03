import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function MoodCard({ title, icon, children, className = "" }: MoodCardProps) {
  return (
    <Card className={`bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}