import { z } from "zod";

export const calcInputSchema = z.object({
  salaryMonthly: z.coerce.number().min(1000).max(500000),
  stockValueMonthly: z.coerce.number().min(0).max(500000),
  socialSecurityLevel: z.enum(["full", "standard", "minimum"]),
  benefits: z.object({
    meals: z.boolean(),
    gym: z.boolean(),
    restroomFree: z.boolean(),
    transportSubsidy: z.boolean()
  }),
  workStartHour: z.coerce.number().min(0).max(23),
  workEndHour: z.coerce.number().min(0).max(23),
  workPattern: z.enum(["double_weekend", "single_weekend", "no_weekend"]),
  intensity: z.coerce.number().min(1).max(10),
  hiddenOvertimeEnabled: z.boolean(),
  commuteOneWayMinutes: z.coerce.number().min(0).max(240),
  commuteMode: z.enum(["walk", "subway", "taxi"]),
  wfhDaysPerWeek: z.coerce.number().min(0).max(5),
  puaItems: z.array(z.string()),
  colleagueRelationship: z.enum(["supportive", "neutral", "toxic"]),
  infraScore: z.coerce.number().min(1).max(10)
});

export type CalcInputSchema = z.infer<typeof calcInputSchema>;
