import React from "react";
import FeatureSection from "./../componets/sections/FeatureSection";
import Header from "./../componets/header/Header";
import HowItWorks from "./../componets/sections/HowItWork";
import CTA from "./../componets/sections/CTA";
import Footer from "./../componets/footer/Footer";
import RootLayout from "../layouts/RootLayout";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <FeatureSection />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default Home;
