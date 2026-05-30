import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../components_lite/Navbar';
import Footer from '../components_lite/Footer.jsx';
import { Button } from "../ui/button";



const Creator = () => {

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#34C6B3] text-black">
        {/* Navbar Space */}
        <div className="pt-20 px-6 py-16">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4">
                About Our Platform
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Connecting Talent With
                <span className="block text-white">Dream Opportunities</span>
              </h1>

              <p className="text-lg leading-8 max-w-2xl">
                Our Job Portal helps students, fresh graduates, and professionals
                find the right career opportunities while helping companies hire
                the best talent quickly and efficiently.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to={"/login"}>
                  <Button className="bg-black text-white px-10 py-6 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300">
                    Explore Jobs
                  </Button>
                </Link>

              </div>
            </div>

            {/* Right Side Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#34C6B3] rounded-2xl p-6 text-center">
                  <h2 className="text-3xl font-bold">25K+</h2>
                  <p className="mt-2 font-medium">Active Jobs</p>
                </div>

                <div className="bg-black text-white rounded-2xl p-6 text-center">
                  <h2 className="text-3xl font-bold">10K+</h2>
                  <p className="mt-2 font-medium">Candidates</p>
                </div>

                <div className="bg-black text-white rounded-2xl p-6 text-center">
                  <h2 className="text-3xl font-bold">18K+</h2>
                  <p className="mt-2 font-medium">Companies</p>
                </div>

                <div className="bg-[#34C6B3] rounded-2xl p-6 text-center">
                  <h2 className="text-3xl font-bold">95%</h2>
                  <p className="mt-2 font-medium">Success Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Our Platform?
              </h2>

              <p className="text-lg max-w-3xl mx-auto">
                We provide modern solutions for job seekers and recruiters with a
                simple, fast, and user-friendly experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#34C6B3] flex items-center justify-center text-2xl mb-6">
                  💼
                </div>

                <h3 className="text-2xl font-bold mb-4">Easy Job Search</h3>

                <p className="leading-7 text-gray-700">
                  Quickly find jobs based on your skills, interests, and preferred
                  locations.
                </p>
              </div>

              <div className="bg-black text-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center text-2xl mb-6">
                  🚀
                </div>

                <h3 className="text-2xl font-bold mb-4">Career Growth</h3>

                <p className="leading-7 text-gray-300">
                  Discover opportunities that help you build and grow your career.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#34C6B3] flex items-center justify-center text-2xl mb-6">
                  🌍
                </div>

                <h3 className="text-2xl font-bold mb-4">Trusted Companies</h3>

                <p className="leading-7 text-gray-700">
                  Connect with top companies and recruiters from different
                  industries.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>

              <p className="text-lg">
                Passionate people working together to make recruitment easier.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-6 text-center shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-[#34C6B3] mb-5"></div>

                  <h3 className="text-xl font-bold">Team Member</h3>

                  <p className="text-gray-600 mt-2">UI/UX Designer</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="max-w-5xl mx-auto mt-24 bg-black text-white rounded-3xl p-10 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready To Start Your Career Journey?
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of users who trust our platform to find jobs and hire
              talented candidates.
            </p>
            <Link to={"/login"}>


              <button className="bg-[#34C6B3] text-black px-8 py-4 rounded-2xl font-bold hover:bg-white transition-all duration-300">
                Get Started Today
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Creator;
