import { CalcInput, CalcResult, RatingLevel, ScoringConfig } from "@/lib/types";
import { generateCopyByRating } from "@/lib/copywriting";

export const defaultScoringConfig: ScoringConfig = {
  stockDiscount: 0.6,
  hiddenOvertimeRate: 0.12,
  baseMonthlyWorkDays: 21.75,
  fullSocialFactor: 1.1,
  standardSocialFactor: 1,
  minimumSocialFactor: 0.92,
  benefitPerItem: 0.03,
  benefitMin: 0.85,
  benefitMax: 1.25,
  commuteThreshold: 60,
  commuteIncrementMinutes: 30,
  commuteIncrementLoss: 0.1,
  puaIncrementLoss: 0.05
};

function getWorkDays(pattern: CalcInput["workPattern"]): number {
  if (pattern === "single_weekend") return 26;
  if (pattern === "no_weekend") return 30;
  return defaultScoringConfig.baseMonthlyWorkDays;
}

function getSocialFactor(level: CalcInput["socialSecurityLevel"]): number {
  if (level === "full") return defaultScoringConfig.fullSocialFactor;
  if (level === "minimum") return defaultScoringConfig.minimumSocialFactor;
  return defaultScoringConfig.standardSocialFactor;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getRating(kScore: number): RatingLevel {
  if (kScore > 3) return "大罗金仙";
  if (kScore > 2) return "元婴老怪";
  if (kScore > 1) return "筑基散修";
  if (kScore > 0.5) return "凡人牛马";
  return "万年尸王";
}

export function calculateKScore(input: CalcInput, config = defaultScoringConfig): CalcResult {
  const dailyHoursRaw = (24 + input.workEndHour - input.workStartHour) % 24 || 8;
  const dailyHours = dailyHoursRaw + (input.intensity - 5) * 0.2;
  const workDays = getWorkDays(input.workPattern);
  const monthlyWorkHoursBase = Math.max(80, dailyHours * workDays);
  const monthlyWorkHoursReal = input.hiddenOvertimeEnabled
    ? monthlyWorkHoursBase * (1 + config.hiddenOvertimeRate)
    : monthlyWorkHoursBase;

  const monthlyIncomeAdjusted = input.salaryMonthly + input.stockValueMonthly * config.stockDiscount;
  const actualHourly = monthlyIncomeAdjusted / monthlyWorkHoursReal;

  const benefitCount = Object.values(input.benefits).filter(Boolean).length;
  const benefitFactorRaw =
    getSocialFactor(input.socialSecurityLevel) + benefitCount * config.benefitPerItem;
  const benefitFactor = clamp(benefitFactorRaw, config.benefitMin, config.benefitMax);

  const moodBase =
    1 +
    (input.colleagueRelationship === "supportive" ? 0.08 : 0) +
    (input.colleagueRelationship === "toxic" ? -0.12 : 0) +
    (input.infraScore - 5) * 0.015 -
    (input.intensity - 5) * 0.025;
  const moodFactor = clamp(moodBase, 0.75, 1.2);

  const commutePenaltySteps = Math.max(
    0,
    Math.ceil((input.commuteOneWayMinutes - config.commuteThreshold) / config.commuteIncrementMinutes)
  );
  const commuteModeModifier =
    input.commuteMode === "taxi" ? -0.05 : input.commuteMode === "subway" ? 0.05 : 0;
  const wfhOffset = input.wfhDaysPerWeek * 0.05;
  const commuteLoss = Math.max(
    0.8,
    1 + commutePenaltySteps * config.commuteIncrementLoss + commuteModeModifier - wfhOffset
  );

  const puaLoss = 1 + input.puaItems.length * config.puaIncrementLoss;
  const kScore = Number(((actualHourly * benefitFactor * moodFactor) / (commuteLoss * puaLoss)).toFixed(2));

  const rating = getRating(kScore);

  const dimensions = {
    valuePower: clamp((actualHourly / 150) * 100, 20, 100),
    wellness: clamp((moodFactor / 1.2) * 100, 20, 100),
    freedom: clamp((1 / commuteLoss) * 100, 20, 100),
    harmony: clamp((1 / puaLoss) * 110, 20, 100)
  };

  const copy = generateCopyByRating(rating);

  return {
    kScore,
    rating,
    breakdown: {
      actualHourly: Number(actualHourly.toFixed(2)),
      benefitFactor: Number(benefitFactor.toFixed(2)),
      moodFactor: Number(moodFactor.toFixed(2)),
      commuteLoss: Number(commuteLoss.toFixed(2)),
      puaLoss: Number(puaLoss.toFixed(2)),
      monthlyWorkHoursReal: Number(monthlyWorkHoursReal.toFixed(1)),
      monthlyIncomeAdjusted: Number(monthlyIncomeAdjusted.toFixed(0))
    },
    dimensions,
    verdict: copy.verdict,
    adviceDo: copy.adviceDo,
    adviceDont: copy.adviceDont,
    talismanTitle: copy.talismanTitle
  };
}
