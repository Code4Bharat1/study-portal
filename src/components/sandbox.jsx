'use client';

import { useEffect } from 'react';
import sdk from '@stackblitz/sdk';

export default function Sandbox({ filesObj, fileToOpen }) {
  const containerId = 'stackblitz-container'; // Avoid spaces in ID
  sdk.embedProject
  useEffect(()=>{
    sdk.embedProject(
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
        // hideExplorer: true,
      }
    )
  })
  return (
    <div id={containerId} className="w-screen h-[calc(100vh-5rem)]" />
  );
}
