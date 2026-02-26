import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 pb-20 pt-8 md:px-10">

      {/* 主卷轴 */}
      <section className="scroll-card relative rounded-sm p-8 md:p-14">
        {/* 水墨山水装饰 */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-10"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M160 180 Q140 120 120 100 Q100 80 80 90 Q60 100 40 140 Q20 160 10 180" stroke="#0d0600" strokeWidth="1.5" fill="none"/>
          <path d="M180 180 Q170 130 150 110 Q130 90 110 100 Q90 110 70 150" stroke="#0d0600" strokeWidth="1" fill="none"/>
          <path d="M30 60 Q50 40 70 50 Q90 60 80 80" stroke="#0d0600" strokeWidth="1" fill="none"/>
          <path d="M120 30 Q140 10 160 20 Q180 30 170 50" stroke="#0d0600" strokeWidth="1" fill="none"/>
          <circle cx="50" cy="45" r="3" fill="#0d0600" opacity="0.4"/>
          <circle cx="145" cy="25" r="2" fill="#0d0600" opacity="0.3"/>
        </svg>

        {/* 篆刻标题装饰 */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block border border-vermilion px-2 py-0.5 font-title text-sm tracking-[0.3em] text-vermilion">
            天机阁
          </span>
          <span className="h-px flex-1 bg-gold opacity-40" />
        </div>

        <h1 className="font-title text-5xl leading-tight text-ink md:text-7xl">禄马真经</h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-8 text-ink-light md:text-lg">
          施主，贫道观你印堂发黑，恐是工价太低？<br />
          用玄学话术，做理性计算，算清这份工作的真实禄位。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/calc" className="seal-btn">
            起卦测算
          </Link>
          <button className="ghost-btn" type="button">
            查看百晓生榜（V1.1）
          </button>
        </div>
      </section>

      {/* 竹简特性列表 */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["本地测算", "输入数据仅在本地计算，不绑定身份信息。"],
          ["多维去魅", "薪资、工时、通勤、PUA 一次看清。"],
          ["一键分享", "生成护身符海报，晒给同门道友。"]
        ].map(([title, text]) => (
          <article key={title} className="scroll-card rounded-sm p-5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-0.5 bg-vermilion" aria-hidden />
              <h2 className="font-title text-base text-ink">{title}</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-light">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
