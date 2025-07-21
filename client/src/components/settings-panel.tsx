import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Users, X } from "lucide-react";
import { useScoring, ScoringWeights } from "@/contexts/scoring-context";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const { weights, setWeights, resetWeights, applyPreset } = useScoring();
  const [localWeights, setLocalWeights] = useState<ScoringWeights>(weights);

  const handleSliderChange = (key: keyof ScoringWeights) => (values: number[]) => {
    setLocalWeights(prev => ({ ...prev, [key]: values[0] }));
  };

  const handleApply = () => {
    setWeights(localWeights);
    onClose();
  };

  const handleReset = () => {
    resetWeights();
    setLocalWeights({
      fundamentalWeight: 7,
      peWeight: 8,
      deWeight: 6,
      roeWeight: 9,
      pbWeight: 5,
      shareholderWeight: 5,
      absoluteWeight: 6,
      relativeWeight: 4,
    });
  };

  const handlePreset = (preset: 'conservative' | 'balanced' | 'growth') => {
    applyPreset(preset);
    const presetWeights = {
      conservative: {
        fundamentalWeight: 8,
        peWeight: 9,
        deWeight: 8,
        roeWeight: 7,
        pbWeight: 6,
        shareholderWeight: 6,
        absoluteWeight: 7,
        relativeWeight: 3,
      },
      balanced: {
        fundamentalWeight: 7,
        peWeight: 7,
        deWeight: 7,
        roeWeight: 7,
        pbWeight: 7,
        shareholderWeight: 5,
        absoluteWeight: 5,
        relativeWeight: 5,
      },
      growth: {
        fundamentalWeight: 6,
        peWeight: 6,
        deWeight: 5,
        roeWeight: 10,
        pbWeight: 8,
        shareholderWeight: 4,
        absoluteWeight: 4,
        relativeWeight: 6,
      },
    };
    setLocalWeights(presetWeights[preset]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Configure Scoring Weights</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preset Configurations */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Presets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white" onClick={() => handlePreset('conservative')}>
                <CardContent className="p-3">
                  <div className="font-medium">Conservative</div>
                  <div className="text-sm text-blue-100">Focus on fundamentals & stability</div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white" onClick={() => handlePreset('balanced')}>
                <CardContent className="p-3">
                  <div className="font-medium">Balanced</div>
                  <div className="text-sm text-emerald-100">Equal weight to all factors</div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white" onClick={() => handlePreset('growth')}>
                <CardContent className="p-3">
                  <div className="font-medium">Growth Focused</div>
                  <div className="text-sm text-purple-100">Emphasize growth metrics</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weight Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fundamental Ratios */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-4 flex items-center">
                <Calculator className="mr-2 h-4 w-4 text-primary" />
                Fundamental Ratios Importance (0-10)
              </h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Overall Fundamental Weight</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.fundamentalWeight]}
                      onValueChange={handleSliderChange('fundamentalWeight')}
                      max={10}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.fundamentalWeight}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">P/E Ratio Weight</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.peWeight]}
                      onValueChange={handleSliderChange('peWeight')}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.peWeight}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">D/E Ratio Weight</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.deWeight]}
                      onValueChange={handleSliderChange('deWeight')}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.deWeight}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">ROE Weight</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.roeWeight]}
                      onValueChange={handleSliderChange('roeWeight')}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.roeWeight}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">P/B Ratio Weight</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.pbWeight]}
                      onValueChange={handleSliderChange('pbWeight')}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.pbWeight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shareholder Pattern & Marking */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-4 flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                Shareholder Pattern & Marking Method
              </h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Shareholder Pattern Weight (0-10)</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={[localWeights.shareholderWeight]}
                      onValueChange={handleSliderChange('shareholderWeight')}
                      max={10}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-sm font-medium text-slate-900">{localWeights.shareholderWeight}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">Marking Method Weightage</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-slate-600 mb-1 block">Absolute Marking Weight</Label>
                      <div className="flex items-center space-x-3">
                        <Slider
                          value={[localWeights.absoluteWeight]}
                          onValueChange={handleSliderChange('absoluteWeight')}
                          max={10}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-8 text-sm font-medium text-slate-900">{localWeights.absoluteWeight}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-600 mb-1 block">Relative Marking Weight</Label>
                      <div className="flex items-center space-x-3">
                        <Slider
                          value={[localWeights.relativeWeight]}
                          onValueChange={handleSliderChange('relativeWeight')}
                          max={10}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-8 text-sm font-medium text-slate-900">{localWeights.relativeWeight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleReset}>Reset to Defaults</Button>
          <Button onClick={handleApply}>Apply Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
