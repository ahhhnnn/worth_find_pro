import { generateCopyByRating } from "@/lib/copywriting";

describe("generateCopyByRating", () => {
  it("returns copy bundle for each rating", () => {
    const ratings = ["大罗金仙", "元婴老怪", "筑基散修", "凡人牛马", "万年尸王"] as const;
    ratings.forEach((rating) => {
      const copy = generateCopyByRating(rating);
      expect(copy.verdict.length).toBeGreaterThan(0);
      expect(copy.talismanTitle.length).toBeGreaterThan(0);
    });
  });
});
