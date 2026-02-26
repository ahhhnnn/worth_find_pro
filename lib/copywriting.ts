import { RatingLevel } from "@/lib/types";

interface CopyBundle {
  verdict: string;
  adviceDo: string;
  adviceDont: string;
  talismanTitle: string;
}

const fallback: CopyBundle = {
  verdict: "天机混沌，暂无法判定，建议再排一卦。",
  adviceDo: "宜：先喝口热水，校准输入。",
  adviceDont: "忌：带情绪填表。",
  talismanTitle: "护体清心符"
};

const copyMap: Record<RatingLevel, CopyBundle[]> = {
  大罗金仙: [
    {
      verdict: "此工位灵气充沛，薪时比惊人，建议焊死。",
      adviceDo: "宜：稳住节奏，少立 Flag。",
      adviceDont: "忌：主动卷入无效宫斗。",
      talismanTitle: "急急如律令·涨薪符"
    }
  ],
  元婴老怪: [
    {
      verdict: "此宗门性价比上佳，进可攻退可守。",
      adviceDo: "宜：精进主业，维持边界。",
      adviceDont: "忌：被虚名诱导加班。",
      talismanTitle: "稳中有升·聚灵符"
    }
  ],
  筑基散修: [
    {
      verdict: "尚可糊口，但道心不稳，需谨慎修行。",
      adviceDo: "宜：保留简历活性，月度复盘。",
      adviceDont: "忌：把透支当奋斗。",
      talismanTitle: "守拙待机·护身符"
    }
  ],
  凡人牛马: [
    {
      verdict: "施主，你这份工像在做慈善。",
      adviceDo: "宜：先谈边界，再谈奉献。",
      adviceDont: "忌：无偿接盘额外职责。",
      talismanTitle: "诸邪退散·防裁员符"
    }
  ],
  万年尸王: [
    {
      verdict: "此地煞气极重，继续久留恐伤元神。",
      adviceDo: "宜：尽快寻找下家，保命优先。",
      adviceDont: "忌：幻想画饼能兑现。",
      talismanTitle: "速速还俗·保命符"
    }
  ]
};

export function generateCopyByRating(rating: RatingLevel): CopyBundle {
  const list = copyMap[rating];
  if (!list || list.length === 0) return fallback;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx] ?? fallback;
}
