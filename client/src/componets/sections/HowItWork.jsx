import React from "react";

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v4a2 2 0 002 2h14a2 2 0 002-2V7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 11V3m8 8V3m-4 8v-4"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            1. Post a Problem
          </h3>
          <p className="text-gray-600 text-sm">
            Share issues you're facing with detailed descriptions, location
            data, and images to provide better context.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            2. Suggest Solutions
          </h3>
          <p className="text-gray-600 text-sm">
            Contribute actionable solutions and advice to help others overcome
            challenges effectively.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            3. Upvote & Discuss
          </h3>
          <p className="text-gray-600 text-sm">
            Engage in discussions and upvote the best solutions to highlight
            helpful contributions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
