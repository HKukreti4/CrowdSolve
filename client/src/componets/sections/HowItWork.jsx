import React from 'react';

function HowItWorks() {
  return (
    <section className="bg-gray-100 py-12 text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        <div className="p-4">
          <h3 className="font-bold mb-2">1. Post a Problem</h3>
          <p>Share issues you're facing with location and images for better context.</p>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">2. Suggest Solutions</h3>
          <p>Community members can propose solutions to help solve the problem.</p>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">3. Upvote & Discuss</h3>
          <p>Upvote the best solutions and engage in discussions to improve ideas.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
