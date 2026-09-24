"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("fitlog_storage_update", updateCounts);
    return () => {
      window.removeEventListener("fitlog_storage_update", updateCounts);
    };
  }, []);

  return (
    <div className="bg-[#111111] border-b border-zinc-800 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto navbar px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
              <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-zinc-900 border border-zinc-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/" className={`rounded-lg ${pathname === "/" ? "text-[#ccff00] font-semibold bg-zinc-800" : "text-zinc-300 hover:bg-zinc-800"}`}>
                  Workout
                </Link>
              </li>
              <li>
                <Link href="/my-plan" className={`rounded-lg ${pathname === "/my-plan" ? "text-[#ccff00] font-semibold bg-zinc-800" : "text-zinc-300 hover:bg-zinc-800"}`}>
                  My Plan
                </Link>
              </li>
            </ul>
          </div>  
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider text-white hover:opacity-90">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span>FITLOG</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            <li>
              <Link
                href="/"
                className={`rounded-full px-5 py-2 transition-all ${
                  pathname === "/"
                    ? "text-[#ccff00] font-semibold bg-zinc-900 border border-zinc-800"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                Workout
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={`rounded-full px-5 py-2 transition-all ${
                  pathname === "/my-plan"
                    ? "text-[#ccff00] font-semibold bg-zinc-900 border border-zinc-800"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <Link href="/my-plan" className="btn btn-sm bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 rounded-full px-4 flex items-center gap-2">
            <span>Plan</span>
            <span className="text-[#ccff00] font-bold text-xs bg-zinc-800 px-2 py-0.5 rounded-full">
              {planCount}
            </span>
          </Link>
          <Link href="/my-plan" className="btn btn-sm bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 rounded-full px-4 flex items-center gap-2">
            <span>Saved</span>
            <span className="text-[#ccff00] font-bold text-xs bg-zinc-800 px-2 py-0.5 rounded-full">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}