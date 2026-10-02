import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error({ error }) {
  return (
    <div>
      <div className=" flex  z-50 fixed inset-0 items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center  sm:p-0">
        <div className="fixed inset-0  transition-opacity" aria-hidden="true">
          <div className="absolute  z-0 inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          ​
        </span>
        <div
          className="inline-block z-10 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Error
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  There was an error processing your request.
                </p>
                <p className=" text-gray-500">{error}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
