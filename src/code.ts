figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = async (msg) => {
  await figma.loadAllPagesAsync();

  switch (msg.type) {
    case 'get-nodes':
      // Find all TextNodes whose name matches a translation key
      const nodes = figma.root.findAll(
        (node) => node.type === 'TEXT',
      ) as TextNode[];
      console.log({ nodes });
      break;
    case 'create-rectangles':
      const { amount } = msg.payload;
      const rectSize = 100;
      const gap = 10;

      for (let i = 0; i < amount; i++) {
        const rect = figma.createRectangle();
        rect.resize(rectSize, rectSize);
        rect.x = i * (rectSize + gap);
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
        figma.currentPage.appendChild(rect);
      }
      break;
    default:
      break;
  }
};

figma.on('run', ({ command, parameters }: RunEvent) => {
  switch (command) {
    case 'resize':
      console.log('handleResize', parameters);
      // handleResize(parameters.width, parameters.height)
      break;
    case 'move':
      console.log('handleMove', parameters);
      // handleMove(parameters.dx, parameters.dy)
      break;
    default:
      break;
  }
});
