import React from 'react';
import Navbar from '@/components/Navbar';
import CardJS from '@/components/Javascript/Card';

export default function JavascriptMainPage() {
  return (
    <>
      <Navbar />
      <main className="mt-24 px-4">
        <CardJS />
      </main>
    </>
  );
}
