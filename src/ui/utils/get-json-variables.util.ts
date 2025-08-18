import { TTranslations } from '../types';

const VAR_REF = /{{\s*([^}]+?)\s*}}/g;

export const getJsonVariables = (translations: TTranslations): string[] => {
  const matches: string[] = [];

  for (const value of Object.values(translations)) {
    for (const m of value.matchAll(VAR_REF)) {
      matches.push(m[1].trim());
    }
  }

  return [...new Set(matches)];
};
