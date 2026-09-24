"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const loadWorkouts = () => {
      try {
        const storageKey =
          activeTab === "plan" ? "fitlog_plan" : "fitlog_saved";

        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
          const data = JSON.parse(savedData);

          if (Array.isArray(data)) {
            setWorkouts(data);
          } else {
            setWorkouts([]);
          }
        } else {
          setWorkouts([]);
        }
      } catch (error) {
        console.error("Error loading workouts:", error);
        setWorkouts([]);
      }
    };

    loadWorkouts();

    window.addEventListener("fitlog_storage_update", loadWorkouts);

    return () => {
      window.removeEventListener("fitlog_storage_update", loadWorkouts);
    };
  }, [activeTab]);

  const handleRemove = (id: string | number) => {
    const storageKey =
      activeTab === "plan" ? "fitlog_plan" : "fitlog_saved";

    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
      return;
    }

    try {
      const data = JSON.parse(savedData);

      const updatedList = data.filter(
        (item: any) => String(item.id) !== String(id)
      );

      localStorage.setItem(storageKey, JSON.stringify(updatedList));

      setWorkouts(updatedList);

      window.dispatchEvent(new Event("fitlog_storage_update"));
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  const totalExercises = workouts.length;

  const totalMinutes = workouts.reduce(
    (sum, item) => sum + (Number(item.duration) || 0),
    0
  );

  const totalCalories = workouts.reduce(
    (sum, item) => sum + (Number(item.caloriesBurned) || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-wider">
          MY PLAN
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#16181d] border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-400 uppercase font-semibold">
            Exercises
          </p>

          <p className="text-4xl font-black text-[#ccff00] mt-2">
            {totalExercises}
          </p>
        </div>

        <div className="bg-[#16181d] border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-400 uppercase font-semibold">
            Minutes
          </p>

          <p className="text-4xl font-black text-white mt-2">
            {totalMinutes}
          </p>
        </div>

        <div className="bg-[#16181d] border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-400 uppercase font-semibold">
            Calories
          </p>

          <p className="text-4xl font-black text-white mt-2">
            {totalCalories}
          </p>
        </div>
      </div>

      <div className="flex gap-2 bg-[#16181d] p-1 rounded-xl border border-zinc-800 w-fit mb-6">
      <button
  onClick={() => setActiveTab("plan")}
  className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
    activeTab === "plan"
      ? "bg-[#ccff00] text-black"
      : "text-zinc-400 hover:text-white"
  }`}
>
  Today's Plan
</button>

<button
  onClick={() => setActiveTab("saved")}
  className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
    activeTab === "saved"
      ? "bg-[#ccff00] text-black"
      : "text-zinc-400 hover:text-white"
  }`}
>
  Saved
</button>
      </div>

      {workouts.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center bg-[#16181d]/30">
          <h3 className="text-xl font-black uppercase tracking-wide text-white">
            NOTHING HERE YET
          </h3>

          <p className="text-zinc-400 text-sm mt-2 mb-6">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="bg-[#ccff00] text-black text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider hover:opacity-90 transition inline-block"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <div
              key={`${workout.id}-${index}`}
              className="bg-[#16181d] border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-24 h-16 object-cover rounded-xl"
                />

                <div>
                  <h4 className="text-lg font-black uppercase text-white">
                    {workout.name}
                  </h4>

                  <p className="text-xs text-zinc-400 font-medium">
                    {workout.equipment}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-zinc-300 mt-2 font-semibold">
                    <span>{workout.duration} min</span>

                    <span>{workout.caloriesBurned} kcal</span>

                    <span>⭐ {workout.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="border border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <button className="bg-[#ccff00] text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5">
                    ✓ Mark as Done
                  </button>
                )}

                <button
                  onClick={() => handleRemove(workout.id)}
                  className="text-zinc-500 hover:text-red-400 p-2 font-bold text-lg transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
