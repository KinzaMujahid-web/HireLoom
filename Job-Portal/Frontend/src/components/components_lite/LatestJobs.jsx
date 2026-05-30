import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EMPTY_ARRAY = [];

const LatestJobs = (job) => {
  
  const allJobs = useSelector(
    (state) => state.jobs?.allJobs ?? EMPTY_ARRAY
  );

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold  leading-tight">
            Latest & Top
            <span className="text-[#34C6B3]"> Job Openings</span>
          </h2>

          <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Discover trending opportunities from top companies and
            start your professional journey today.
          </p>
        </div>

        {/* Jobs Grid */}
        {allJobs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white rounded-3xl px-10 py-8 text-center shadow-xl">
              <h3 className="text-2xl font-bold text-black">
                No Jobs Available
              </h3>

              <p className="text-gray-500 mt-2">
                Please check back later for new opportunities.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Show Only 3 Latest Jobs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {allJobs.slice(0, 3).map((job, index) => (
                <JobCards
                  key={job?._id || index}
                  job={job}
                />
              ))}
            </div>

            {/* Explore More */}
            <div className="flex justify-center mt-12">
              <Link to={user ? "/browse" : "/login"}>
                <button className="bg-[#34C6B3] text-black px-8 py-3 rounded-2xl font-semibold hover:bg-white transition-all duration-300 shadow-lg">
                  Explore More Jobs →
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;