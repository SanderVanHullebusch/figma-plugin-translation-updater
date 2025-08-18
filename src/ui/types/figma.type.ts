import { TTranslations } from './translations.type';

export type MyPluginMessage =
  | { type: 'create-rectangles'; payload: { amount: number } }
  | { type: 'translate-nodes'; payload: TTranslations };

export type PluginMessage<
  T extends MyPluginMessage['type'] = MyPluginMessage['type'],
> = Extract<MyPluginMessage, { type: T }>;
