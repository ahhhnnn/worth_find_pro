"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SectionCard } from "@/components/SectionCard";
import { calculateKScore } from "@/lib/scoring";
import { calcInputSchema, CalcInputSchema } from "@/lib/schema";
import { useCalcStore } from "@/lib/store";

const puaOptions = ["日报", "周报", "月报", "半夜传音", "临时改需求"];
const benefitOptions = [
  ["benefits.meals", "包三餐"],
  ["benefits.gym", "健身房"],
  ["benefits.restroomFree", "厕所自由"],
  ["benefits.transportSubsidy", "交通补贴"]
] as const;

export default function CalcPage() {
  const router = useRouter();
  const { form: defaultValues, setForm, setResult } = useCalcStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CalcInputSchema>({
    resolver: zodResolver(calcInputSchema),
    defaultValues
  });

  const watchedPuaItems = watch("puaItems");
  const watchedBenefits = watch("benefits");
  const intensity = watch("intensity") ?? 5;

  const onSubmit = (values: CalcInputSchema) => {
    setForm(values);
    const result = calculateKScore(values);
    setResult(result);
    router.push("/result");
  };

  const errorText = Object.values(errors)[0]?.message?.toString();

  const togglePua = (item: string, checked: boolean) => {
    const next = checked
      ? [...(watchedPuaItems ?? []), item]
      : (watchedPuaItems ?? []).filter((v) => v !== item);
    setValue("puaItems", next, { shouldValidate: true });
  };

  const pct = `${((Number(intensity) - 1) / 9) * 100}%`;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 md:px-8">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-block border border-vermilion px-2 py-0.5 font-title text-sm tracking-[0.3em] text-vermilion">
            四柱排盘
          </span>
          <span className="h-px flex-1 bg-gold opacity-40" />
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* 第一柱·金 */}
        <SectionCard title="第一柱·金：财帛宫">
          <label className="block text-sm text-ink-light">
            月薪（元）
            <input type="number" className="scroll-input mt-1" {...register("salaryMonthly")} />
          </label>
          <label className="block text-sm text-ink-light">
            期权/股票折算（月）
            <input type="number" className="scroll-input mt-1" {...register("stockValueMonthly")} />
          </label>
          <label className="block text-sm text-ink-light">
            五险一金档位
            <select className="scroll-select mt-1" {...register("socialSecurityLevel")}>
              <option value="full">足额缴纳（金钟罩）</option>
              <option value="standard">标准缴纳</option>
              <option value="minimum">最低缴纳（布衣）</option>
            </select>
          </label>
          <div>
            <p className="mb-2 text-sm text-ink-light">福利加持</p>
            <div className="grid grid-cols-2 gap-2">
              {benefitOptions.map(([name, label]) => {
                const key = name.split(".")[1] as keyof typeof watchedBenefits;
                const checked = !!watchedBenefits?.[key];
                return (
                  <label key={name} className={`check-tag${checked ? " checked" : ""}`}>
                    <input
                      type="checkbox"
                      {...register(name)}
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>
        </SectionCard>

        {/* 第二柱·火 */}
        <SectionCard title="第二柱·火：劳厄宫">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-ink-light">
              上班时间（时）
              <input type="number" className="scroll-input mt-1" {...register("workStartHour")} />
            </label>
            <label className="block text-sm text-ink-light">
              下班时间（时）
              <input type="number" className="scroll-input mt-1" {...register("workEndHour")} />
            </label>
          </div>
          <label className="block text-sm text-ink-light">
            闭关模式
            <select className="scroll-select mt-1" {...register("workPattern")}>
              <option value="double_weekend">双休</option>
              <option value="single_weekend">大小周</option>
              <option value="no_weekend">单休/无休</option>
            </select>
          </label>
          <div>
            <p className="text-sm text-ink-light">心魔强度：<span className="font-title text-vermilion">{intensity}</span> / 10</p>
            <input
              type="range"
              min={1}
              max={10}
              className="scroll-range"
              style={{ "--pct": pct } as React.CSSProperties}
              {...register("intensity")}
            />
            <div className="mt-1 flex justify-between text-xs text-ink-muted">
              <span>清风明月</span><span>炼狱修罗</span>
            </div>
          </div>
          <label className={`check-tag${watch("hiddenOvertimeEnabled") ? " checked" : ""}`}>
            <input type="checkbox" {...register("hiddenOvertimeEnabled")} />
            包含下班后回微信（隐形工时）
          </label>
        </SectionCard>

        {/* 第三柱·水 */}
        <SectionCard title="第三柱·水：迁移宫">
          <label className="block text-sm text-ink-light">
            单程通勤时长（分钟）
            <input type="number" className="scroll-input mt-1" {...register("commuteOneWayMinutes")} />
          </label>
          <label className="block text-sm text-ink-light">
            通勤方式
            <select className="scroll-select mt-1" {...register("commuteMode")}>
              <option value="walk">步行</option>
              <option value="subway">地铁</option>
              <option value="taxi">打车</option>
            </select>
          </label>
          <label className="block text-sm text-ink-light">
            每周 WFH 天数
            <input type="number" className="scroll-input mt-1" {...register("wfhDaysPerWeek")} />
          </label>
        </SectionCard>

        {/* 第四柱·土 */}
        <SectionCard title="第四柱·土：环境宫">
          <div>
            <p className="mb-2 text-sm text-ink-light">PUA 行为（多选）</p>
            <div className="grid grid-cols-2 gap-2">
              {puaOptions.map((item) => {
                const checked = watchedPuaItems?.includes(item) ?? false;
                return (
                  <label
                    key={item}
                    className={`check-tag${checked ? " checked" : ""}`}
                    onClick={() => togglePua(item, !checked)}
                  >
                    <input type="checkbox" readOnly checked={checked} />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>
          <label className="block text-sm text-ink-light">
            同事关系
            <select className="scroll-select mt-1" {...register("colleagueRelationship")}>
              <option value="supportive">互帮互助</option>
              <option value="neutral">一般般</option>
              <option value="toxic">勾心斗角</option>
            </select>
          </label>
          <label className="block text-sm text-ink-light">
            洞天福地评分（1-10）
            <input type="number" className="scroll-input mt-1" {...register("infraScore")} />
          </label>
        </SectionCard>

        {errorText ? <p className="text-sm text-vermilion">{errorText}</p> : null}

        <button type="submit" className="seal-btn w-full mt-2">
          演卦出签
        </button>
      </form>
    </main>
  );
}
