export type MyPluginMessage =
  | { type: 'create-rectangles'; payload: { amount: number } }
  | { type: 'translate-nodes'; payload: Record<string, string> };

export type PluginMessage<
  T extends MyPluginMessage['type'] = MyPluginMessage['type'],
> = Extract<MyPluginMessage, { type: T }>;
