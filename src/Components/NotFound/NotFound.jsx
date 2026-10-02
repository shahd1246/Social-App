import React from "react";
import {  useNavigate } from "react-router-dom";

import {  ArrowLeft } from "@gravity-ui/icons";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-150 flex-col items-center justify-center bg-slate-50 px-5 text-center">
      {/* 404 */}
      <h1 className="text-8xl font-extrabold  tracking-tight text-blue-600 sm:text-9xl">
        404
      </h1>

      {/* Text */}
      <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or doesn't exist.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
