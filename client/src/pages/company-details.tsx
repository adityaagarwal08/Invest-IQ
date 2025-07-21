import { useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calculator, Users, Info, TrendingUp } from "lucide-react";
import { ScoreChart } from "@/components/score-chart";
import { nifty50Companies } from "@/data/mock-companies";
import { calculateCompanyScore, getScoreGrade } from "@/lib/scoring-algorithm";
import { useScoring } from "@/contexts/scoring-context";

export default function CompanyDetails() {
  const [, params] = useRoute("/company/:symbol");
  const [, setLocation] = useLocation();
  const { weights } = useScoring();

  const company = nifty50Companies.find(c => c.symbol === params?.symbol);
  
  const scoredCompany = useMemo(() => {
    if (!company) return null;
    return calculateCompanyScore(company, weights);
  }, [company, weights]);

  if (!company || !scoredCompany) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Company Not Found</h1>
              <p className="text-slate-600 mb-4">The requested company could not be found.</p>
              <Button onClick={() => setLocation("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Rankings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSectorColor = (sector: string) => {
    const colors = {
      'Technology': 'bg-purple-100 text-purple-800',
      'Banking': 'bg-green-100 text-green-800',
      'Energy': 'bg-blue-100 text-blue-800',
      'FMCG': 'bg-orange-100 text-orange-800',
      'Automobile': 'bg-red-100 text-red-800',
      'Pharmaceuticals': 'bg-pink-100 text-pink-800',
      'Default': 'bg-gray-100 text-gray-800'
    };
    return colors[sector as keyof typeof colors] || colors.Default;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rankings
          </Button>
        </div>

        {/* Company Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-600">
                    {company.symbol.slice(0, 4)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
                  <p className="text-slate-600 mt-1 flex items-center space-x-2">
                    <span>{company.symbol}</span>
                    <span>•</span>
                    <Badge className={getSectorColor(company.sector)}>
                      {company.sector}
                    </Badge>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{scoredCompany.finalScore.toFixed(1)}</div>
                <div className="text-sm text-slate-500">Composite Score</div>
                <div className="flex items-center justify-end mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+2.3 vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Breakdown Chart */}
          <div className="lg:col-span-2">
            <ScoreChart company={scoredCompany} />
          </div>

          {/* Metrics Cards */}
          <div className="space-y-6">
            {/* Fundamental Ratios Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-primary" />
                  Fundamental Ratios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">P/E Ratio</div>
                      <div className="text-xs text-slate-500">Price to Earnings</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{company.pe.toFixed(1)}</div>
                      <div className={`text-xs ${
                        scoredCompany.peScore >= 80 ? 'text-green-600' :
                        scoredCompany.peScore >= 60 ? 'text-blue-600' :
                        scoredCompany.peScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getScoreGrade(scoredCompany.peScore)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">D/E Ratio</div>
                      <div className="text-xs text-slate-500">Debt to Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{company.de.toFixed(2)}</div>
                      <div className={`text-xs ${
                        scoredCompany.deScore >= 80 ? 'text-green-600' :
                        scoredCompany.deScore >= 60 ? 'text-blue-600' :
                        scoredCompany.deScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getScoreGrade(scoredCompany.deScore)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">ROE</div>
                      <div className="text-xs text-slate-500">Return on Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{company.roe.toFixed(1)}%</div>
                      <div className={`text-xs ${
                        scoredCompany.roeScore >= 80 ? 'text-green-600' :
                        scoredCompany.roeScore >= 60 ? 'text-blue-600' :
                        scoredCompany.roeScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getScoreGrade(scoredCompany.roeScore)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">P/B Ratio</div>
                      <div className="text-xs text-slate-500">Price to Book</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{company.pb.toFixed(1)}</div>
                      <div className={`text-xs ${
                        scoredCompany.pbScore >= 80 ? 'text-green-600' :
                        scoredCompany.pbScore >= 60 ? 'text-blue-600' :
                        scoredCompany.pbScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getScoreGrade(scoredCompany.pbScore)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shareholder Pattern Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Shareholder Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Promoters</span>
                    <span className="font-semibold text-slate-900">{company.promoters.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${company.promoters}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">FIIs</span>
                    <span className="font-semibold text-slate-900">{company.fiis.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${company.fiis}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">DIIs</span>
                    <span className="font-semibold text-slate-900">{company.diis.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${company.diis}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Retail</span>
                    <span className="font-semibold text-slate-900">{company.retail.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${company.retail}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Info className="mr-2 h-5 w-5 text-primary" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Market Cap</span>
                    <span className="font-medium text-slate-900">{company.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Revenue</span>
                    <span className="font-medium text-slate-900">{company.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Updated</span>
                    <span className="font-medium text-slate-900">{company.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Data Source</span>
                    <span className="font-medium text-slate-900">NSE/BSE</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
