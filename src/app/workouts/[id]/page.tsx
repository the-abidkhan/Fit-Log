import WorkoutActions from "@/components/WorkoutActions";

async function getWorkoutDetail(id: string) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    return null;
  }
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black uppercase text-red-500">
            Workout Not Found
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            Could not load details for this workout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-8 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-[#16181d] border border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center p-0 h-[480px]">
          <img
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wide">
              {workout.name}
            </h1>

            <p className="text-zinc-400 text-sm mt-2">
              {workout.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups?.map(
              (group: string, index: number) => (
                <span
                  key={index}
                  className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded uppercase tracking-wider"
                >
                  {group}
                </span>
              )
            )}
          </div>

          <div className="bg-[#16181d] border border-zinc-800 rounded-2xl divide-y divide-zinc-800 text-sm">
            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Equipment
              </span>

              <span className="font-bold text-white">
                {workout.equipment}
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Difficulty
              </span>

              <span className="font-bold text-white">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Sets
              </span>

              <span className="font-bold text-white">
                {workout.sets}
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Reps
              </span>

              <span className="font-bold text-white">
                {workout.reps}
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Duration
              </span>

              <span className="font-bold text-white">
                {workout.duration} min
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Calories
              </span>

              <span className="font-bold text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Rating
              </span>

              <span className="font-bold text-white">
                {workout.rating}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider text-sm mb-3 text-white">
              Instructions
            </h3>

            <ol className="space-y-2 text-sm text-zinc-300">
              {workout.instructions?.map(
                (step: string, index: number) => (
                  <li
                    key={index}
                    className="flex gap-3 leading-relaxed"
                  >
                    <span className="text-white font-bold">
                      {index + 1}.
                    </span>

                    <span>{step}</span>
                  </li>
                )
              )}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}