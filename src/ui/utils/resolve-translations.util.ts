import { getJsonVariables } from './get-json-variables.util';

type Translations = Record<string, string>;

const T_REF = /\$t\(([^)]+)\)/g; // $t(ns:key)
const VAR_REF = /{{\s*([^}]+?)\s*}}/g; // {{var}}
const TAGS = /<[^>]+>/g; // matches any HTML-like tag

export const resolveTranslations = (
  translations: Translations,
): Translations => {
  const cache: Record<string, string> = {};

  const initialVariables = getJsonVariables(translations);
  if (initialVariables.length > 0) {
    console.log(`${initialVariables.length} variables to be resolved ⏳`);
  }

  const cleanHtml = (input: string): string => {
    return input
      .replace(/<br\s*\/?>/gi, '\n') // <br> or <br/> → newline
      .replace(/<\/?b>/gi, '**') // <b> or </b> → markdown bold marker (optional)
      .replace(/<\/?strong>/gi, '**') // <strong> → markdown bold marker
      .replace(TAGS, ''); // drop all remaining tags
  };

  const resolveKey = (key: string, seen: Set<string> = new Set()): string => {
    if (cache[key] !== undefined) return cache[key];
    if (seen.has(key)) return translations[key] ?? ''; // break cycles
    seen.add(key);

    const raw = translations[key];
    if (raw == null) return '';

    let out = cleanHtml(raw);

    // Resolve repeatedly until no change (cap iterations for safety)
    for (let i = 0; i < 10; i++) {
      const before = out;

      // 1) $t(ns:key)
      out = out.replace(T_REF, (_, ref: string) => {
        const refKey = ref.replace(/:/g, '.');
        return resolveKey(refKey, new Set(seen));
      });

      // 2) {{var}}
      out = out.replace(VAR_REF, (_, name: string) => {
        const curlyKey = `{{${name}}}`;
        if (translations[curlyKey] !== undefined)
          return resolveKey(curlyKey, new Set(seen));
        if (translations[name] !== undefined)
          return resolveKey(name, new Set(seen));
        return curlyKey;
      });

      if (out === before) break;
    }

    cache[key] = out;
    return out;
  };

  const resolved: Translations = {};
  for (const key of Object.keys(translations)) {
    resolved[key] = resolveKey(key);
  }

  // Get unresolved variables
  const unresolvedVariables = getJsonVariables(resolved);
  if (unresolvedVariables.length > 0) {
    console.log(
      `${unresolvedVariables.length} variables couldn't be resolved ❌`,
    );
  } else {
    console.log('All variabled resolved ✅');
  }

  return resolved;
};
