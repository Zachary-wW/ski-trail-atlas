import type { Language } from "./i18n";

export const difficultyLabels: Record<Language, Record<string, string>> = {
  en: {
    beginner: "Beginner",
    beginner_intermediate: "Beginner–Intermediate",
    park: "Terrain park",
    intermediate: "Intermediate",
    intermediate_advanced: "Intermediate–Advanced",
    advanced: "Advanced",
  },
  "zh-CN": {
    beginner: "初级道",
    beginner_intermediate: "初中级道",
    park: "公园",
    intermediate: "中级道",
    intermediate_advanced: "中高级道",
    advanced: "高级道",
  },
};
