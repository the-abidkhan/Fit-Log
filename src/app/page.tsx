import Banner from '@/components/Banner';
import WorkoutLibrary from '@/components/WorkoutLibrary';
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#111111] text-white pt-8 pb-12 px-6 md:px-12">
      <Banner />
      <WorkoutLibrary />
    </div>
  );
}