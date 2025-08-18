import type { MyPluginMessage, PluginMessage } from '../types';

export const postPluginMessage = <T extends MyPluginMessage['type']>(
  message: PluginMessage<T>,
): void => {
  parent.postMessage({ pluginMessage: message }, '*');
};
