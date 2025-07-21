import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoredCompany, getScoreGrade } from "@/lib/scoring-algorithm";

interface ScoreChartProps {
  company: ScoredCompany;
}

export function ScoreChart({ company }: ScoreChartProps) {
  const scoreData = [
    { name: "P/E Ratio", score: company.peScore, color: "#3b82f6" },
    { name: "D/E Ratio", score: company.deScore, color: "#10b981" },
    { name: "ROE", score: company.roeScore, color: "#f59e0b" },
    { name: "P/B Ratio", score: company.pbScore, color: "#8b5cf6" },
    { name: "Shareholder", score: company.shareholderScore, color: "#ef4444" },
  ];

  // Mock historical data for line chart
  const historyData = [
    { month: "Jan", score: company.finalScore - 3 },
    { month: "Feb", score: company.finalScore - 2 },
    { month: "Mar", score: company.finalScore - 1 },
    { month: "Apr", score: company.finalScore + 1 },
    { month: "May", score: company.finalScore + 2 },
    { month: "Jun", score: company.finalScore },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
          <CardTitle className="text-lg font-semibold">Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-8">
            {scoreData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.name} Score</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">{item.score.toFixed(0)}/100</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.score >= 80 ? 'score-excellent' :
                      item.score >= 60 ? 'score-good' :
                      item.score >= 40 ? 'score-average' : 'score-poor'
                    }`}>
                      {getScoreGrade(item.score)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${item.score}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}`, 'Score']}
                  labelStyle={{ color: '#1e293b' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
          <CardTitle className="text-lg font-semibold">Score History (6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}`, 'Score']}
                  labelStyle={{ color: '#1e293b' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
