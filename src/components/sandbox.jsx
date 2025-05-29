'use client';

import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

export default function Sandbox({ filesObj, fileToOpen, onLoad }) {
  const containerId = 'stackblitz-container';
  const [loading, setLoading] = useState(true); // <-- loading state

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

            // Save start timestamp in localStorage (always overwrite)
            localStorage.setItem('startTimestamp', Date.now().toString());

            vm.applyFsDiff({ destroy: ['web-c.done'], create: {} });

            setLoading(false)
          }
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to embed StackBlitz project:', err);
        const container = document.getElementById(containerId);
        if (!container) throw new Error('Container element not found');

        sdk.connect(container).then((vm) => {
          const intervalId = setInterval(async () => {
            const files = Object.keys(await vm.getFsSnapshot());
            console.log(files);
            if (files.includes('web-c.done')) {
              clearInterval(intervalId);
              onLoad();

              // Save start timestamp in localStorage (always overwrite)
              localStorage.setItem('startTimestamp', Date.now().toString());

              vm.applyFsDiff({ destroy: ['web-c.done'], create: {} });
            }
          }, 3000);
        });
      });
  }, [filesObj, fileToOpen, onLoad]);

  return (
  <>
  <div id={containerId} className="w-screen h-[calc(100vh-11rem)]" />;
  {loading && (
        <div
    className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
    tabIndex={0}
    onKeyDown={(e) => e.preventDefault()}
    onKeyUp={(e) => e.preventDefault()}
  >
          <span className="text-lg font-semibold text-gray-700">Loading Sidebar, Sandbox & Installing Dependencies</span>
        </div>
      )}
  </>

  )
}
