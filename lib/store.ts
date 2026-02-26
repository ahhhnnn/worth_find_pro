"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CalcInput, CalcResult } from "@/lib/types";

interface CalcState {
  form: CalcInput;
  result: CalcResult | null;
  setForm: (form: Partial<CalcInput>) => void;
  setResult: (result: CalcResult) => void;
  resetAll: () => void;
}

export const defaultForm: CalcInput = {
  salaryMonthly: 20000,
  stockValueMonthly: 2000,
  socialSecurityLevel: "standard",
  benefits: {
    meals: false,
    gym: false,
    restroomFree: true,
    transportSubsidy: false
  },
  workStartHour: 9,
  workEndHour: 19,
  workPattern: "double_weekend",
  intensity: 6,
  hiddenOvertimeEnabled: true,
  commuteOneWayMinutes: 45,
  commuteMode: "subway",
  wfhDaysPerWeek: 0,
  puaItems: ["日报", "周报"],
  colleagueRelationship: "neutral",
  infraScore: 6
};

export const useCalcStore = create<CalcState>()(
  persist(
    (set) => ({
      form: defaultForm,
      result: null,
      setForm: (patch) => set((state) => ({ form: { ...state.form, ...patch } })),
      setResult: (result) => set(() => ({ result })),
      resetAll: () => set(() => ({ form: defaultForm, result: null }))
    }),
    {
      name: "worth-find-pro-state",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
