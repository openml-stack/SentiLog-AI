import { Clock } from "lucide-react";
import { MoodCard } from "./mood-card";

export function LastAnalysis() {
  return (
    <MoodCard title="Last Analysis" icon={<Clock className="h-4 w-4 text-pink-400" />}>
      <div className="flex flex-col items-center text-center space-y-1.5">
        <p className="text-xl font-medium">2 hours ago</p>
        <p className="text-sm text-muted-foreground">Journal Entry #12</p>
        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center gap-1.5">
          <span className="text-lg">😊</span>
          <span className="text-sm text-purple-300">Positive mood</span>
        </div>
      </div>
    </MoodCard>
  );
}