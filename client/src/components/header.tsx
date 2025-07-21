import { Button } from "@/components/ui/button";
import { Settings, ChartLine, User } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChartLine className="text-white h-4 w-4" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Stock Scoring Platform</h1>
                <p className="text-sm text-slate-500">Nifty 50 Analysis Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onSettingsClick} className="text-slate-700">
              <Settings className="mr-2 h-4 w-4" />
              Configure Weights
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="text-slate-600 h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">John Analyst</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
