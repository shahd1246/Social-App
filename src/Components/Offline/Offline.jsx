import React from "react";

export default function Offline() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-neutral-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M8.5 8.5A7.5 7.5 0 0119 12m-14 0a7.5 7.5 0 014.5-3.5M6 16.5a4.5 4.5 0 0112 0M9 19.5h.01M12 19.5h.01M15 19.5h.01"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
          You're Offline
        </h2>

        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
          Oops! It looks like you're not connected to the internet.
        </p>

        <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-8">
          Please check your connection and try again.
        </p>

        {/* Button */}
        <button className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-80 transition">
          Try Again
        </button>
      </div>
    </div>
  );
}
