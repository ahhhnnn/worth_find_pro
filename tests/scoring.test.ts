import { calculateKScore } from "@/lib/scoring";
import { defaultForm } from "@/lib/store";

describe("calculateKScore", () => {
  it("returns high rating for high salary low loss", () => {
    const result = calculateKScore({
      ...defaultForm,
      salaryMonthly: 90000,
      stockValueMonthly: 10000,
      commuteOneWayMinutes: 10,
      puaItems: [],
      intensity: 3,
      workPattern: "double_weekend",
      hiddenOvertimeEnabled: false
    });

    expect(result.kScore).toBeGreaterThan(3);
    expect(result.rating).toBe("大罗金仙");
  });

  it("returns low rating for low salary high loss", () => {
    const result = calculateKScore({
      ...defaultForm,
      salaryMonthly: 6000,
      stockValueMonthly: 0,
      commuteOneWayMinutes: 120,
      puaItems: ["日报", "周报", "月报", "半夜传音", "临时改需求"],
      intensity: 10,
      workPattern: "no_weekend",
      hiddenOvertimeEnabled: true,
      colleagueRelationship: "toxic"
    });

    expect(result.kScore).toBeLessThan(1);
    expect(["凡人牛马", "万年尸王"]).toContain(result.rating);
  });

  it("keeps commute loss minimum floor", () => {
    const result = calculateKScore({
      ...defaultForm,
      commuteOneWayMinutes: 0,
      commuteMode: "taxi",
      wfhDaysPerWeek: 5
    });

    expect(result.breakdown.commuteLoss).toBeGreaterThanOrEqual(0.8);
  });
});
