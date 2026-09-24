import React from 'react';

const Banner = () => {
    return (
     <div className="max-w-7xl mx-auto bg-[#16181d] border border-zinc-800 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
                <span className="text-[#ccff00] font-bold text-sm uppercase">
                    WORKOUT LIBRARY
                </span>
               
                <h1 className="text-4xl md:text-6xl font-black uppercase">
                    TRAIN WITH INTENT.LOG <br />EVERY SET.
                   
                </h1>
               
                <p className="text-zinc-400 text-base">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                </p>
               
                <div>
                    <a
                        href="#workouts"
                        className="inline-block bg-[#ccff00] text-black font-bold px-8 py-3 rounded-lg uppercase"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md h-80">
                    <img
                        src="/assets/banner.png"
                        alt="Workout Banner"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
