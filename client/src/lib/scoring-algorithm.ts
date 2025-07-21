import { Company } from "@/data/mock-companies";
import { ScoringWeights } from "@/contexts/scoring-context";

export interface ScoredCompany extends Company {
  peScore: number;
  deScore: number;
  roeScore: number;
  pbScore: number;
  shareholderScore: number;
  fundamentalScore: number;
  finalScore: number;
  rank: number;
}

export function calculatePEScore(pe: number, peHistory: number[], x: number, y: number): number {
  // Absolute marking
  let absoluteMarks = 0;
  if (pe < 20) absoluteMarks = 100;
  else if (pe >= 20 && pe <= 30) absoluteMarks = 50;
  else absoluteMarks = 0;

  // Relative marking (3-Year trend)
  let relativeMarks = 0;
  if (peHistory.length >= 3) {
    const [x1, x2, x3] = peHistory;
    relativeMarks = 100 * (
      ((x1 - pe) / (x1 + pe)) +
      ((x2 - pe) / (x2 + pe)) +
      ((x3 - pe) / (x3 + pe))
    ) / 3;
  }
  
  relativeMarks = Math.max(0, Math.min(100, relativeMarks));

  return 100 * ((absoluteMarks * x) + (relativeMarks * y)) / (200 * (x + y));
}

export function calculateDEScore(de: number, deHistory: number[], x: number, y: number): number {
  // Absolute marking
  let absoluteMarks = 0;
  if (de <= 0.5) absoluteMarks = 100;
  else if (de <= 1.0) absoluteMarks = 75;
  else if (de <= 1.5) absoluteMarks = 50;
  else if (de <= 2.0) absoluteMarks = 25;
  else absoluteMarks = 0;

  // Relative marking (2-Year trend)
  let relativeMarks = 0;
  if (deHistory.length >= 2) {
    const [de1yr, de2yr] = deHistory;
    relativeMarks = 100 * (
      ((de1yr - de) / (de1yr + de)) +
      ((de2yr - de) / (de2yr + de))
    ) / 2;
  }
  
  relativeMarks = Math.max(0, Math.min(100, relativeMarks));

  return 100 * ((absoluteMarks * x) + (relativeMarks * y)) / (200 * (x + y));
}

export function calculateROEScore(roe: number, roeHistory: number[], x: number, y: number): number {
  // Absolute marking
  let absoluteMarks = 0;
  if (roe >= 20) absoluteMarks = 100;
  else if (roe >= 15) absoluteMarks = 75;
  else if (roe >= 10) absoluteMarks = 50;
  else absoluteMarks = 25;

  // Relative marking (2-Year trend)
  let relativeMarks = 0;
  if (roeHistory.length >= 2) {
    const [roe1yr, roe2yr] = roeHistory;
    relativeMarks = 100 * (
      ((roe - roe1yr) / (roe + roe1yr)) +
      ((roe - roe2yr) / (roe + roe2yr))
    ) / 2;
  }
  
  relativeMarks = Math.max(0, Math.min(100, relativeMarks));

  return 100 * ((absoluteMarks * x) + (relativeMarks * y)) / (200 * (x + y));
}

export function calculatePBScore(pb: number, pbHistory: number[], x: number, y: number): number {
  // Absolute marking
  let absoluteMarks = 0;
  if (pb <= 1.0) absoluteMarks = 100;
  else if (pb <= 2.0) absoluteMarks = 50;
  else absoluteMarks = 0;

  // Relative marking (3-Year average)
  let relativeMarks = 0;
  if (pbHistory.length >= 3) {
    const pb3yrAvg = pbHistory.reduce((sum, val) => sum + val, 0) / pbHistory.length;
    relativeMarks = 100 * ((pb3yrAvg - pb) / (pb3yrAvg + pb));
  }
  
  relativeMarks = Math.max(0, Math.min(100, relativeMarks));

  return 100 * ((absoluteMarks * x) + (relativeMarks * y)) / (200 * (x + y));
}

export function calculateShareholderScore(company: Company): number {
  const { promoters, fiis, diis, retail } = company;
  
  // Promoters scoring
  let promoterMarks = 0;
  if (promoters > 50) promoterMarks = 100;
  else if (promoters >= 40) promoterMarks = 70;
  else if (promoters >= 10) promoterMarks = 40;
  else promoterMarks = 0;

  // FIIs scoring
  let fiiMarks = 0;
  if (fiis > 20) fiiMarks = 50;
  else if (fiis >= 10) fiiMarks = 30;
  else fiiMarks = 10;

  // DIIs scoring
  let diiMarks = 0;
  if (diis > 15) diiMarks = 50;
  else if (diis >= 5) diiMarks = 30;
  else diiMarks = 10;

  // Retail scoring
  let retailMarks = 0;
  if (retail < 15) retailMarks = 50;
  else if (retail <= 25) retailMarks = 30;
  else retailMarks = 10;

  return 100 * (promoterMarks + fiiMarks + diiMarks + retailMarks) / 250;
}

export function calculateCompanyScore(company: Company, weights: ScoringWeights): ScoredCompany {
  const { fundamentalWeight, peWeight, deWeight, roeWeight, pbWeight, shareholderWeight, absoluteWeight, relativeWeight } = weights;

  // Calculate individual scores
  const peScore = calculatePEScore(company.pe, company.peHistory, absoluteWeight, relativeWeight);
  const deScore = calculateDEScore(company.de, company.deHistory, absoluteWeight, relativeWeight);
  const roeScore = calculateROEScore(company.roe, company.roeHistory, absoluteWeight, relativeWeight);
  const pbScore = calculatePBScore(company.pb, company.pbHistory, absoluteWeight, relativeWeight);
  const shareholderScore = calculateShareholderScore(company);

  // Calculate fundamental ratio score
  const fundamentalScore = 100 * (
    (peScore * peWeight) +
    (deScore * deWeight) +
    (roeScore * roeWeight) +
    (pbScore * pbWeight)
  ) / ((peWeight + deWeight + roeWeight + pbWeight) * 100);

  // Calculate final score
  const finalScore = (
    (fundamentalScore * fundamentalWeight) +
    (shareholderScore * shareholderWeight)
  ) / (fundamentalWeight + shareholderWeight);

  return {
    ...company,
    peScore: Math.round(peScore * 100) / 100,
    deScore: Math.round(deScore * 100) / 100,
    roeScore: Math.round(roeScore * 100) / 100,
    pbScore: Math.round(pbScore * 100) / 100,
    shareholderScore: Math.round(shareholderScore * 100) / 100,
    fundamentalScore: Math.round(fundamentalScore * 100) / 100,
    finalScore: Math.round(finalScore * 100) / 100,
    rank: 0, // Will be set after sorting
  };
}

export function scoreAllCompanies(companies: Company[], weights: ScoringWeights): ScoredCompany[] {
  const scoredCompanies = companies.map(company => calculateCompanyScore(company, weights));
  
  // Sort by final score descending and assign ranks
  scoredCompanies.sort((a, b) => b.finalScore - a.finalScore);
  scoredCompanies.forEach((company, index) => {
    company.rank = index + 1;
  });

  return scoredCompanies;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-yellow-600";
  return "text-red-600";
}

export function getScoreGrade(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Poor";
}
