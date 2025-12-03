import { QuickLogModal } from "./QuickLogModal";
import { Activity, Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-8 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-hero">
          <Activity className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Life Pattern Engine</h1>
          <p className="text-sm text-muted-foreground">Your digital twin awaits</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <QuickLogModal />
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
