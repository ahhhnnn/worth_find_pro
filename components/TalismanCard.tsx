"use client";

import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { CalcResult } from "@/lib/types";

export function TalismanCard({ result, hideExportBtn }: { result: CalcResult; hideExportBtn?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!ref.current || exporting) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ede0c4"
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `lu-ma-zhen-jing-${Date.now()}.png`;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        style={{
          background: "#ede0c4",
          border: "1.5px solid #9a7d3a",
          padding: "1.5rem",
          position: "relative",
          boxShadow: "inset 0 0 18px rgba(154,125,58,0.10)"
        }}
      >
        {/* 双线内框 */}
        <div style={{
          position: "absolute", inset: "5px",
          border: "1px solid rgba(154,125,58,0.30)",
          pointerEvents: "none"
        }} />
        <p style={{ textAlign: "center", fontSize: "0.75rem", letterSpacing: "0.3em", color: "#9b2335", fontFamily: "serif" }}>
          急急如律令
        </p>
        <h3 style={{ marginTop: "0.75rem", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", color: "#0d0600", fontFamily: "serif" }}>
          {result.talismanTitle}
        </h3>
        <div style={{ margin: "0.75rem 0", borderTop: "1px dashed #9a7d3a" }} />
        <p style={{ fontSize: "0.875rem", lineHeight: "1.8", color: "#3d2b1f", fontFamily: "serif" }}>
          {result.verdict}
        </p>
        <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#9b2335", fontFamily: "serif" }}>
          宜：{result.adviceDo}
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#3d6b5e", fontFamily: "serif" }}>
          忌：{result.adviceDont}
        </p>
        <p style={{ marginTop: "0.75rem", textAlign: "right", fontSize: "0.75rem", color: "#7a6030", fontFamily: "serif" }}>
          禄马真经批 · {new Date().toLocaleDateString("zh-CN")}
        </p>
      </div>

      {!hideExportBtn && (
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="seal-btn w-full gap-2 disabled:opacity-60"
        >
          <Download size={18} />
          {exporting ? "正在生成中..." : "单独导出护身符"}
        </button>
      )}
    </div>
  );
}
