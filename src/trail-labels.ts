import type { Language } from "./i18n";

export const difficultyLabels: Record<Language, Record<string, string>> = {
  en: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  "zh-CN": {
    beginner: "初级道",
    intermediate: "中级道",
    advanced: "高级道",
  },
};
