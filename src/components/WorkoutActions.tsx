
"use client";

import { useState } from "react";

export default function WorkoutActions({ workout }: { workout: any }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToPlan = () => {
    const currentPlan = JSON.parse(
      localStorage.getItem("fitlog_plan") || "[]"
    );

    const alreadyAdded = currentPlan.some(
      (item: any) =>
        String(item.id) === String(workout.id)
    );

    if (!alreadyAdded) {
      currentPlan.push(workout);

      localStorage.setItem(
        "fitlog_plan",
        JSON.stringify(currentPlan)
      );

      window.dispatchEvent(
        new Event("fitlog_storage_update")
      );
    }

    showToast("Added to today's plan!");
  };

  const handleSaveForLater = () => {
    const currentSaved = JSON.parse(
      localStorage.getItem("fitlog_saved") || "[]"
    );

    const alreadySaved = currentSaved.some(
      (item: any) =>
        String(item.id) === String(workout.id)
    );

    if (!alreadySaved) {
      currentSaved.push(workout);

      localStorage.setItem(
        "fitlog_saved",
        JSON.stringify(currentSaved)
      );

      window.dispatchEvent(
        new Event("fitlog_storage_update")
      );
    }

    showToast("Saved for later!");
  };

  return (
    <div className="relative">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-xl shadow-lg uppercase text-xs tracking-wider animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleAddToPlan}
          className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-3.5 rounded-xl uppercase text-xs tracking-wider flex items-center gap-2 transition cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
            ></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>

          Add to today&apos;s plan
        </button>

        <button
          onClick={handleSaveForLater}
          className="bg-[#16181d] border border-zinc-700 hover:bg-zinc-800 text-white font-extrabold px-6 py-3.5 rounded-xl uppercase text-xs tracking-wider flex items-center gap-2 transition cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
          </svg>

          Save for later
        </button>
      </div>
    </div>
  );
}
