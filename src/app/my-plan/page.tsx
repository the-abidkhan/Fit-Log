"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const MyPlan = dynamic(() => import('@/components/MyPlan'), { ssr: false });

const Page = () => {
  return (
    <div>
      <MyPlan />
    </div>
  );
};

export default Page;