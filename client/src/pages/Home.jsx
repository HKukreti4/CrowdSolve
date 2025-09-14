import FeatureSection from "../componets/sections/FeatureSection";
import HowItWorks from "./../componets/sections/HowItWork";

import { NavLink } from "react-router-dom";

const Home = () => {
  return (
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
      <FeatureSection />
      {/*  how it work  */}
      <HowItWorks />
    </div>
  );
};

export default Home;
