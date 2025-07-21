import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, BarChart3, Trophy, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { SettingsPanel } from "@/components/settings-panel";
import { RankingTable } from "@/components/ranking-table";
import { nifty50Companies } from "@/data/mock-companies";
import { scoreAllCompanies, ScoredCompany } from "@/lib/scoring-algorithm";
import { useScoring } from "@/contexts/scoring-context";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { weights } = useScoring();

  const scoredCompanies = useMemo(() => {
    return scoreAllCompanies(nifty50Companies, weights);
  }, [weights]);

  const avgScore = useMemo(() => {
    return scoredCompanies.reduce((sum, company) => sum + company.finalScore, 0) / scoredCompanies.length;
  }, [scoredCompanies]);

  const topPerformer = scoredCompanies[0];

  const handleCompanyClick = (company: ScoredCompany) => {
    setLocation(`/company/${company.symbol}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      <SettingsPanel 
        open={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">Total Companies</p>
                  <p className="text-3xl font-bold text-white">50</p>
                  <p className="text-xs text-blue-200 mt-1">Nifty 50 Index</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Building className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-100">Average Score</p>
                  <p className="text-3xl font-bold text-white">{avgScore.toFixed(1)}</p>
                  <p className="text-xs text-emerald-200 mt-1">Composite Rating</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <BarChart3 className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-100">Top Performer</p>
                  <p className="text-xl font-bold text-white">{topPerformer?.symbol}</p>
                  <p className="text-xs text-amber-200 mt-1">Score: {topPerformer?.finalScore.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Trophy className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">Last Updated</p>
                  <p className="text-lg font-bold text-white">2 hrs ago</p>
                  <p className="text-xs text-purple-200 mt-1">Real-time data</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Clock className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rankings Table */}
        <RankingTable 
          companies={scoredCompanies} 
          onCompanyClick={handleCompanyClick}
        />
      </main>
    </div>
  );
}
