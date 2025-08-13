export type MyPluginMessage =
  | { type: 'create-rectangles'; payload: { amount: number } }
  | { type: 'get-nodes'; payload: undefined };

export type PluginMessage<
  T extends MyPluginMessage['type'] = MyPluginMessage['type'],
> = Extract<MyPluginMessage, { type: T }>;

export const postPluginMessage = <T extends MyPluginMessage['type']>(
  message: PluginMessage<T>,
): void => {
  parent.postMessage({ pluginMessage: message }, '*');
};
