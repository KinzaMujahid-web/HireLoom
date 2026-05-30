import React, { useEffect } from "react";
import Navbar from "./Navbar";
import JobCards from "./JobCards";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {

  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const dispatch = useDispatch();


  // FILTER LOGIC
  const filteredJobs = allJobs.filter((job) => {

    if (!searchedQuery) return true;

    return (
      job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())
    );
  });

  console.log("QUERY:", searchedQuery);
console.log("ALL JOBS:", allJobs);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">

        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        <div className="grid grid-cols-3 gap-4">

          {filteredJobs.length === 0 ? (
            <span>No Jobs Found</span>
          ) : (
            filteredJobs.map((job) => (
              <JobCards
                key={job._id}
                job={job}
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Browse;