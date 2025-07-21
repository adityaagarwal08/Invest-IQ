import { Button } from "@/components/ui/button";
import { Settings, TrendingUp, User, BarChart3 } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 border-b border-blue-200 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <TrendingUp className="text-blue-600 h-5 w-5" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-yellow-800 h-2 w-2" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">InvestIQ</h1>
                <p className="text-sm text-blue-100">Smart Stock Analysis Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onSettingsClick} 
              className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure Weights
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <User className="text-white h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-white hidden sm:block">Analyst</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
