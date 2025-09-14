import React from "react";
import FeatureSection from "./../componets/sections/FeatureSection";

import HowItWorks from "./../componets/sections/HowItWork";
import CTA from "./../componets/sections/CTA";
import Footer from "./../componets/footer/Footer";
import RootLayout from "../layouts/RootLayout";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    // <div className="font-sans text-gray-800">
    //   {/* <Header />
    //   <FeatureSection />
    //   <HowItWorks />
    //   <CTA /> */}

    // </div>

    <div className="min-h-screen flex flex-col bg-gradient-to-br mt-16 from-blue-50 to-indigo-100">
      {/* hero section  */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-indigo-700">
            Solve Problems Together
          </h2>
          <p className="text-gray-600 text-lg">
            CrowdSolve is a community-driven platform where you can post
            challenges, share solutions, and collaborate with others. Empower
            each other and make problem-solving faster, smarter, and more
            inclusive.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <NavLink
              to="/problems"
              className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-semibold"
            >
              Explore Problems
            </NavLink>
            <NavLink
              to="/problem/post"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors font-semibold"
            >
              Post a Problem
            </NavLink>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1663050693651-0bb7b8ba44f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbSUyMGFuZCUyMGNvbGxhYm9yYXRpb258ZW58MHx8MHx8fDA%3Da"
            alt="Teamwork and collaboration"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7S13.5 8 12 8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                JWT Authentication
              </h3>
              <p className="text-gray-600 text-sm">
                Securely log in and sign up with token-based authentication to
                protect user data and privacy.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m2 2a2 2 0 100-4 2 2 0 000 4zm-8-2a2 2 0 100-4 2 2 0 000 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Post Problems
              </h3>
              <p className="text-gray-600 text-sm">
                Easily describe issues with images and location details, making
                them accessible to the community.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16l4-4 4 4m0 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Share Solutions
              </h3>
              <p className="text-gray-600 text-sm">
                Contribute actionable solutions to help others overcome problems
                and foster collaboration.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12v6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Engage & Upvote
              </h3>
              <p className="text-gray-600 text-sm">
                Interact with solutions through comments and upvotes to
                highlight the best ideas and insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  how it work  */}
      <HowItWorks />
    </div>
  );
};





export default Home;
