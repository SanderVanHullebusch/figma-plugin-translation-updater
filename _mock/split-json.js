// split-json.ts
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const inputFile = 'translations.json';
const outputDir = 'split';

/* --- FUNCTIONS --- */
const flattenObject = (data, parentKey = '', separator = '.') => {
  return Object.keys(data).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !Array.isArray(data[key])
    ) {
      Object.assign(acc, flattenObject(data[key], newKey, separator));
    } else {
      acc[newKey] = data[key];
    }
    return acc;
  }, {});
};

// Create output directory if it doesn't exist
mkdirSync(outputDir, { recursive: true });

// Read and parse input files
const data = JSON.parse(readFileSync(inputFile, 'utf-8'));

// Loop through top-level keys and write separate files
Object.entries(data).forEach(([key, value]) => {
  const filePath = join(outputDir, `${key}.json`);

  const flattened = flattenObject(value);

  writeFileSync(filePath, JSON.stringify(flattened, null, 2), 'utf-8');
});
