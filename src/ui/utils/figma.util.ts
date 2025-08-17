import type { MyPluginMessage, PluginMessage } from '../../shared';

export const postPluginMessage = <T extends MyPluginMessage['type']>(
  message: PluginMessage<T>,
): void => {
  parent.postMessage({ pluginMessage: message }, '*');
};
