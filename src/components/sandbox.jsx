'use client';

import { useEffect } from 'react';
import sdk from '@stackblitz/sdk';

export default function Sandbox({ filesObj, fileToOpen, onLoad }) {
  const containerId = 'stackblitz-container';

  useEffect(() => {
    sdk
      .embedProject(
        containerId,
        {
          files: filesObj,
          title: 'Code4Bharat Sandbox',
          description: 'Try MERN right in your Browser',
          template: 'node',
        },
        {
          openFile: fileToOpen,
          view: 'console',
          hideDevTools: false,
          theme: 'light',
        }
      )
      .then((vm) => {
        const intervalId = setInterval(async () => {
          const files = Object.keys(await vm.getFsSnapshot());
          console.log(files);
          if (files.includes('web-c.done')) {
            clearInterval(intervalId);
            onLoad();
            vm.applyFsDiff({ destroy: ['web-c.done'], create: {} })
          }
        }, 2000); // check every second
      })
      .catch((err) => {
        console.error('Failed to embed StackBlitz project:', err);
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        sdk.connect(container).then((vm) => {
          const intervalId = setInterval(async () => {
            const files = Object.keys(await vm.getFsSnapshot());
            console.log(files);
            if (files.includes('web-c.done')) {
              clearInterval(intervalId);
              onLoad();
              vm.applyFsDiff({ destroy: ['web-c.done'], create: {} })
            }
          }, 2000); // check every second
        })
      });
  }, [filesObj, fileToOpen, onLoad]);

  return <div id={containerId} className="w-screen h-[calc(100vh-5rem)]" />;
}
