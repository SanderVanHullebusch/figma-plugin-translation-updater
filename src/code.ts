// code.ts can not contain imported (or exported) files!

type MyPluginMessage =
  | { type: 'create-rectangles'; payload: { amount: number } }
  | { type: 'translate-nodes'; payload: Record<string, string> };

type PluginMessage<
  T extends MyPluginMessage['type'] = MyPluginMessage['type'],
> = Extract<MyPluginMessage, { type: T }>;

figma.showUI(__html__, { width: 400, height: 250 });

figma.ui.onmessage = async (msg: PluginMessage) => {
  await figma.loadAllPagesAsync();

  switch (msg.type) {
    case 'translate-nodes':
      const translations: Record<string, string> = msg.payload;
      if (Object.keys(translations).length === 0) {
        figma.notify('Done ✅');
        return;
      }
      console.log({ translations });

      const loadingNotification = figma.notify('Loading...');

      // Find all TextNodes whose name matches a translation key
      const nodes = figma.currentPage.findAll((node) => {
        if (node.type !== 'TEXT') {
          return false;
        }
        // No name (almost impossible)
        if (!node.name) {
          return false;
        }
        // Name should be a key in our translations
        if (!(node.name in translations)) {
          return false;
        }
        // The content can not be empty
        if (translations[node.name] === '') {
          return false;
        }
        //
        return true;
      }) as TextNode[];

      for (const node of nodes) {
        await figma.loadFontAsync(node.fontName as FontName);
        if (node.name === '' || !(node.name in translations)) {
          continue;
        }
        node.characters = translations[node.name] ?? '';
      }

      loadingNotification.cancel();

      figma.notify('Done ✅');
      break;
    default:
      figma.notify('No method for this type defined yet.. 🤷🏻‍♂️');
      break;
  }
};
