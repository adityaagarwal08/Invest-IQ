import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { CompanyCard } from "./company-card";
import { ScoredCompany } from "@/lib/scoring-algorithm";

interface RankingTableProps {
  companies: ScoredCompany[];
  onCompanyClick: (company: ScoredCompany) => void;
}

export function RankingTable({ companies, onCompanyClick }: RankingTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSector, setSelectedSector] = useState("all");
  const itemsPerPage = 10;

  const filteredCompanies = companies.filter(company => 
    selectedSector === "all" || company.sector === selectedSector
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  const sectors = Array.from(new Set(companies.map(c => c.sector)));

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">Nifty 50 Rankings</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Companies ranked by composite score</p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center space-x-3">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="px-6 py-3">Rank</TableHead>
                <TableHead className="px-6 py-3">Company</TableHead>
                <TableHead className="px-6 py-3">Sector</TableHead>
                <TableHead className="px-6 py-3">Score</TableHead>
                <TableHead className="px-6 py-3">Score Trend</TableHead>
                <TableHead className="px-6 py-3">P/E</TableHead>
                <TableHead className="px-6 py-3">ROE</TableHead>
                <TableHead className="px-6 py-3">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => onCompanyClick(company)}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-slate-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, filteredCompanies.length)}</span> of{' '}
                <span className="font-medium">{filteredCompanies.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-l-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="rounded-none"
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-r-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
