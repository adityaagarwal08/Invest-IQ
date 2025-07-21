import { Badge } from "@/components/ui/badge";
import { ScoredCompany } from "@/lib/scoring-algorithm";
import { getScoreColor } from "@/lib/scoring-algorithm";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CompanyCardProps {
  company: ScoredCompany;
  onClick: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank.toString();
  };

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

  const generateSparkline = () => {
    // Generate a simple sparkline based on score (mock trend data)
    const baseHeight = company.finalScore;
    const variations = [-5, -2, 3, -1, 2]; // Mock variations
    
    return variations.map((variation, index) => {
      const height = Math.max(10, Math.min(40, baseHeight + variation));
      return (
        <div
          key={index}
          className={`sparkline-bar ${getScoreColor(height).replace('text-', 'bg-')}`}
          style={{ height: `${(height / 100) * 24}px` }}
        />
      );
    });
  };

  const getTrendIcon = () => {
    if (company.finalScore > 70) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (company.finalScore < 50) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-yellow-600" />;
  };

  return (
    <tr className="hover:bg-blue-50/50 cursor-pointer transition-all duration-200 hover:shadow-sm" onClick={onClick}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            company.rank <= 3 ? 'bg-yellow-100' : 'bg-slate-100'
          }`}>
            <span className={`text-sm font-bold ${
              company.rank <= 3 ? 'text-yellow-600' : 'text-slate-600'
            }`}>
              {getRankIcon(company.rank)}
            </span>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-slate-600">
              {company.symbol.slice(0, 4)}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">{company.name}</div>
            <div className="text-sm text-slate-500">{company.symbol}</div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge className={`${getSectorColor(company.sector)}`}>
          {company.sector}
        </Badge>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className={`text-sm font-bold mr-3 ${getScoreColor(company.finalScore)}`}>
            {company.finalScore.toFixed(1)}
          </span>
          <div className="w-20 bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreColor(company.finalScore).replace('text-', 'bg-')}`}
              style={{ width: `${company.finalScore}%` }}
            />
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-1">
          {generateSparkline()}
          {getTrendIcon()}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
        {company.pe.toFixed(1)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
        {company.roe.toFixed(1)}%
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-primary hover:text-blue-600 text-sm font-medium">
          View Details
        </button>
      </td>
    </tr>
  );
}
