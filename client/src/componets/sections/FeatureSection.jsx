import React from 'react';

function FeatureSection() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Why CrowdSolve?</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-xs p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold mb-2">Community Driven</h3>
          <p>Work together to solve problems and share knowledge with others.</p>
        </div>
        <div className="max-w-xs p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold mb-2">Easy Problem Posting</h3>
          <p>Post problems quickly with location, images, and descriptions.</p>
        </div>
        <div className="max-w-xs p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold mb-2">Solutions & Upvotes</h3>
          <p>Suggest solutions and upvote the best ideas from the community.</p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
