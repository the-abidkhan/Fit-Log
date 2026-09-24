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
      (item: any) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      showToast("Already added in your plan!");
      return;
    }

    currentPlan.push(workout);

    localStorage.setItem(
      "fitlog_plan",
      JSON.stringify(currentPlan)
    );

    window.dispatchEvent(
      new Event("fitlog_storage_update")
    );

    showToast("Added to today's plan!");
  };

  const handleSaveForLater = () => {
    const currentSaved = JSON.parse(
      localStorage.getItem("fitlog_saved") || "[]"
    );

    const alreadySaved = currentSaved.some(
      (item: any) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      showToast("Already saved for later!");
      return;
    }

    currentSaved.push(workout);

    localStorage.setItem(
      "fitlog_saved",
      JSON.stringify(currentSaved)
    );

    window.dispatchEvent(
      new Event("fitlog_storage_update")
    );

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
          <span>＋</span>
          Add to today&apos;s plan
        </button>

        <button
          onClick={handleSaveForLater}
          className="bg-[#16181d] border border-zinc-700 hover:bg-zinc-800 text-white font-extrabold px-6 py-3.5 rounded-xl uppercase text-xs tracking-wider flex items-center gap-2 transition cursor-pointer"
        >
          <span>♡</span>
          Save for later
        </button>
      </div>
    </div>
  );
}