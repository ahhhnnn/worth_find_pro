"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useCalcStore } from "@/lib/store";
import { ResultRadarChart } from "@/components/ResultRadarChart";
import { TalismanCard } from "@/components/TalismanCard";

export default function ResultPage() {
  const { result, resetAll } = useCalcStore();
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExportAll = async () => {
    if (!exportRef.current || exporting) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#f5e6c8"
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `lu-ma-result-${Date.now()}.png`;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  if (!result) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4">
        <div className="scroll-card rounded-sm p-8 text-center">
          <p className="font-title text-lg text-ink">尚未排盘</p>
          <Link href="/calc" className="seal-btn mt-6 inline-flex">
            去测算
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-6 md:px-8">
      {/* 可导出区域 */}
      <div ref={exportRef} style={{ background: "#f5e6c8", padding: "1.5rem" }}>
        {/* 天命批注主卡 */}
        <section className="scroll-card rounded-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block border border-vermilion px-2 py-0.5 font-title text-sm tracking-[0.3em] text-vermilion">
              天命批注
            </span>
            <span className="h-px flex-1 bg-gold opacity-40" />
          </div>
          <p className="font-title text-6xl text-vermilion leading-none">{result.rating}</p>
          <p className="mt-3 font-title text-xl text-ink">禄位指数 K = {result.kScore}</p>
          <p className="mt-3 text-base leading-7 text-ink-light">{result.verdict}</p>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="scroll-card rounded-sm p-4">
            <h2 className="flex items-center gap-2 font-title text-base text-ink mb-2">
              <span className="inline-block h-4 w-0.5 bg-vermilion" aria-hidden />
              八卦雷达
            </h2>
            <ResultRadarChart dimensions={result.dimensions} />
          </article>

          <article className="scroll-card rounded-sm p-4">
            <h2 className="flex items-center gap-2 font-title text-base text-ink mb-3">
              <span className="inline-block h-4 w-0.5 bg-vermilion" aria-hidden />
              因子分解
            </h2>
            <ul className="space-y-2 text-sm text-ink-light">
              {[
                ["实际时薪", `${result.breakdown.actualHourly} 元`],
                ["福利系数", result.breakdown.benefitFactor],
                ["心情修正", result.breakdown.moodFactor],
                ["通勤损耗", result.breakdown.commuteLoss],
                ["PUA 折损", result.breakdown.puaLoss],
                ["实际月工时", result.breakdown.monthlyWorkHoursReal]
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-gold/20 pb-1">
                  <span className="text-ink-light">{k}</span>
                  <span className="font-medium text-ink">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-l-2 border-vermilion bg-parchment-dark px-3 py-2 text-sm text-ink">
              宜：{result.adviceDo}
            </p>
            <p className="mt-2 border-l-2 border-ink bg-parchment-dark px-3 py-2 text-sm text-ink-light">
              忌：{result.adviceDont}
            </p>
          </article>
        </section>

        <section className="mt-4">
          <h2 className="flex items-center gap-2 font-title text-base text-ink mb-3">
            <span className="inline-block h-4 w-0.5 bg-vermilion" aria-hidden />
            护身符
          </h2>
          <TalismanCard result={result} hideExportBtn />
        </section>
      </div>

      {/* 操作按钮（不导出） */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Link href="/calc" className="ghost-btn justify-center">
          重新排盘
        </Link>
        <button
          type="button"
          onClick={handleExportAll}
          disabled={exporting}
          className="seal-btn justify-center gap-2 disabled:opacity-60"
        >
          <Download size={16} />
          {exporting ? "生成中..." : "导出完整结果"}
        </button>
        <button type="button" onClick={resetAll} className="ghost-btn justify-center">
          清空数据
        </button>
      </div>
    </main>
  );
}
