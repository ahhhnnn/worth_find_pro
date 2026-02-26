export type WorkPattern = "double_weekend" | "single_weekend" | "no_weekend";
export type CommuteMode = "walk" | "subway" | "taxi";
export type ColleagueRelationship = "supportive" | "neutral" | "toxic";

export interface CalcInput {
  salaryMonthly: number;
  stockValueMonthly: number;
  socialSecurityLevel: "full" | "standard" | "minimum";
  benefits: {
    meals: boolean;
    gym: boolean;
    restroomFree: boolean;
    transportSubsidy: boolean;
  };
  workStartHour: number;
  workEndHour: number;
  workPattern: WorkPattern;
  intensity: number;
  hiddenOvertimeEnabled: boolean;
  commuteOneWayMinutes: number;
  commuteMode: CommuteMode;
  wfhDaysPerWeek: number;
  puaItems: string[];
  colleagueRelationship: ColleagueRelationship;
  infraScore: number;
}

export interface FactorBreakdown {
  actualHourly: number;
  benefitFactor: number;
  moodFactor: number;
  commuteLoss: number;
  puaLoss: number;
  monthlyWorkHoursReal: number;
  monthlyIncomeAdjusted: number;
}

export interface DimensionScores {
  valuePower: number;
  wellness: number;
  freedom: number;
  harmony: number;
}

export interface CalcResult {
  kScore: number;
  rating: RatingLevel;
  breakdown: FactorBreakdown;
  dimensions: DimensionScores;
  verdict: string;
  adviceDo: string;
  adviceDont: string;
  talismanTitle: string;
}

export type RatingLevel = "大罗金仙" | "元婴老怪" | "筑基散修" | "凡人牛马" | "万年尸王";

export interface ScoringConfig {
  stockDiscount: number;
  hiddenOvertimeRate: number;
  baseMonthlyWorkDays: number;
  fullSocialFactor: number;
  standardSocialFactor: number;
  minimumSocialFactor: number;
  benefitPerItem: number;
  benefitMin: number;
  benefitMax: number;
  commuteThreshold: number;
  commuteIncrementMinutes: number;
  commuteIncrementLoss: number;
  puaIncrementLoss: number;
}

export interface AnonymousReportPayload {
  companyAlias: string;
  industry: string;
  cityTier: string;
  kScore: number;
  rating: RatingLevel;
  factorsDigest: string[];
  createdAt: string;
}
