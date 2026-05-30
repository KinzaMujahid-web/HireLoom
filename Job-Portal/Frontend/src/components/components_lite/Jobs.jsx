import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    if (!allJobs) return;

    let filteredJobs = [...allJobs];

    // SEARCH + FILTER
    if (searchedQuery && searchedQuery.trim() !== "") {
      filteredJobs = filteredJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();

        // TEXT SEARCH
        const matchesText =
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.jobType?.toLowerCase().includes(query) ||
          job.company?.name?.toLowerCase().includes(query);

        // EXPERIENCE FILTER
        const exp = Number(job.experienceLevel);

        const matchesExperience =
          (query === "0-3 years" && exp >= 0 && exp <= 3) ||
          (query === "3-5 years" && exp >= 3 && exp <= 5) ||
          (query === "5-7 years" && exp >= 5 && exp <= 7) ||
          (query === "7+ years" && exp >= 7);

        // SALARY FILTER
        const salary = Number(job.salary);

        const matchesSalary =
          (query === "0-50k" &&
            salary >= 0 &&
            salary <= 50000) ||
          (query === "50k-100k" &&
            salary > 50000 &&
            salary <= 100000) ||
          (query === "100k-200k" &&
            salary > 100000 &&
            salary <= 200000) ||
          (query === "200k+" && salary > 200000);

        return (
          matchesText ||
          matchesExperience ||
          matchesSalary
        );
      });
    }

    // SORTING
    if (sortType === "latest") {
      filteredJobs.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortType === "salaryHigh") {
      filteredJobs.sort(
        (a, b) => Number(b.salary) - Number(a.salary)
      );
    }

    if (sortType === "salaryLow") {
      filteredJobs.sort(
        (a, b) => Number(a.salary) - Number(b.salary)
      );
    }

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery, sortType]);

  return (
    <div className="min-h-screen bg-[#f5f7f7]">
      <Navbar />

      
      <div className="w-full bg-black py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            Jobs
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[320px]">
            <div className="sticky top-5">
              <Filter />
            </div>
          </div>

          {/* Jobs Section */}
          <div className="flex-1">

            {/* Top Bar */}
            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              
              <p className="text-gray-500 text-sm md:text-base">
                Showing{" "}
                <span className="font-semibold text-black">
                  {filterJobs.length}
                </span>{" "}
                results
              </p>

              <select
                value={sortType}
                onChange={(e) =>
                  setSortType(e.target.value)
                }
                className="border border-gray-200 rounded-lg px-4 py-2 outline-none text-sm bg-white"
              >
                <option value="latest">
                  Sort by latest
                </option>

                <option value="salaryHigh">
                  Salary High to Low
                </option>

                <option value="salaryLow">
                  Salary Low to High
                </option>
              </select>
            </div>

            {/* Jobs List */}
            {filterJobs.length <= 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-black">
                  No Jobs Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try changing filters or search keyword
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;