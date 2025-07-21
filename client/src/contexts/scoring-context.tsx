import { createContext, useContext, useState, ReactNode } from "react";

export interface ScoringWeights {
  fundamentalWeight: number;
  peWeight: number;
  deWeight: number;
  roeWeight: number;
  pbWeight: number;
  shareholderWeight: number;
  absoluteWeight: number;
  relativeWeight: number;
}

export interface ScoringContextType {
  weights: ScoringWeights;
  setWeights: (weights: ScoringWeights) => void;
  resetWeights: () => void;
  applyPreset: (preset: 'conservative' | 'balanced' | 'growth') => void;
}

const defaultWeights: ScoringWeights = {
  fundamentalWeight: 7,
  peWeight: 8,
  deWeight: 6,
  roeWeight: 9,
  pbWeight: 5,
  shareholderWeight: 5,
  absoluteWeight: 6,
  relativeWeight: 4,
};

const presets = {
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

const ScoringContext = createContext<ScoringContextType | undefined>(undefined);

export function ScoringProvider({ children }: { children: ReactNode }) {
  const [weights, setWeights] = useState<ScoringWeights>(defaultWeights);

  const resetWeights = () => {
    setWeights(defaultWeights);
  };

  const applyPreset = (preset: 'conservative' | 'balanced' | 'growth') => {
    setWeights(presets[preset]);
  };

  return (
    <ScoringContext.Provider value={{ weights, setWeights, resetWeights, applyPreset }}>
      {children}
    </ScoringContext.Provider>
  );
}

export function useScoring() {
  const context = useContext(ScoringContext);
  if (context === undefined) {
    throw new Error('useScoring must be used within a ScoringProvider');
  }
  return context;
}
