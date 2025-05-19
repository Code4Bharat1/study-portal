'use client';

import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

export default function HtmlSandbox({data}) {
  const containerId = 'StackBlitz VM'; // ID of the embed container
  useEffect(() => {
    sdk.embedProject(
      containerId,
      {
        files: {
          'index.html': '',
          'test.js': `${data.tests}`,
          'Instructions.md': `${data.instructions}`,
          'package.json': `{
  "name": "code4bharat-trybox",
  "scripts": {
    "test": "node test.js",
    "start": "servor --reload"
  },
  "dependencies": {
    "cheerio": "^1.0.0",
    "htmlhint": "^1.1.4",
    "servor": "^4.0.2"
  }
}
`

        },
        title: 'Code4Bharat Sandbox',
        description: 'Try MERN right in your Browser',
        template: 'node',
      },
      {
        openFile: 'index.html',
        view: 'console',
        hideDevTools: false,
        theme: 'light',
        hideExplorer: true,  
        settings: {
          compile: {trigger: 'save'}
        },
        openFile: "index.html,Instructions.md"
      }
    );
  }, [data.tests, data.instructions]);

  const onButton = async () => {
    const vm = await sdk.connect(document.getElementById(containerId));

    const snapshot = await vm.getFsSnapshot();
    console.log(snapshot);
  };
  return (
      <div id={containerId} className="w-screen h-[calc(100vh-5rem)]" />
  );
}
