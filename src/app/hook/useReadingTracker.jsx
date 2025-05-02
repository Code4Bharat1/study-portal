"use client"
import { useEffect } from 'react';

const useReadingTracker = (pageKey) => {
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTime) / 60000); // minutes

      const storedData = JSON.parse(localStorage.getItem('readingStats')) || {};

      storedData[pageKey] = (storedData[pageKey] || 0) + timeSpent;

      localStorage.setItem('readingStats', JSON.stringify(storedData));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      handleBeforeUnload(); // also handle if user navigates to another page
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageKey]);
};

export default useReadingTracker;