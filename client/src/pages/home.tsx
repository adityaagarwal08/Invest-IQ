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
    <div className="min-h-screen bg-slate-50">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      <SettingsPanel 
        open={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Companies</p>
                  <p className="text-3xl font-bold text-slate-900">50</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="text-primary h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Score</p>
                  <p className="text-3xl font-bold text-slate-900">{avgScore.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-green-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Top Performer</p>
                  <p className="text-xl font-bold text-slate-900">{topPerformer?.symbol}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="text-yellow-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Last Updated</p>
                  <p className="text-lg font-bold text-slate-900">2 hrs ago</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-purple-600 h-6 w-6" />
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
