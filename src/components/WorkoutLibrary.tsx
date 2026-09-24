"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-wider text-white">
          THE LIBRARY
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#16181d] border border-zinc-800 rounded-3xl overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-zinc-800"></div>

              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-zinc-800 rounded"></div>
                  <div className="h-5 w-20 bg-zinc-800 rounded"></div>
                </div>

                <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>

                <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between">
                  <div className="h-4 w-14 bg-zinc-800 rounded"></div>
                  <div className="h-4 w-14 bg-zinc-800 rounded"></div>
                  <div className="h-4 w-10 bg-zinc-800 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout: any) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
            >
              <div className="bg-[#16181d] border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition cursor-pointer flex flex-col h-full">
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups?.map(
                        (group: string, index: number) => (
                          <span
                            key={index}
                            className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider"
                          >
                            {group}
                          </span>
                        )
                      )}
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-wide text-white">
                      {workout.name}
                    </h3>

                    <p className="text-zinc-400 text-xs font-medium">
                      {workout.equipment}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span>◷</span>
                      <span>{workout.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span>🔥</span>
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span>★</span>
                      <span className="text-white font-bold">
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
