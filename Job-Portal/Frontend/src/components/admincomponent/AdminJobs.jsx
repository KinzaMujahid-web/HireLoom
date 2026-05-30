import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";

import {
  Search,
  Plus,
  BriefcaseBusiness,
} from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  // Update Redux search text 
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">


        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">


          <div className="bg-black px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">


            <div className="flex items-center gap-5">
              <div className="bg-[#34C6B3] p-4 rounded-2xl">
                <BriefcaseBusiness
                  className="text-black"
                  size={30}
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white">
                  Admin Jobs
                </h1>

                <p className="text-gray-300 mt-2">
                  Manage and monitor all posted jobs
                </p>
              </div>
            </div>

            {/* Posting a new job */}
            <Button
              onClick={() =>
                navigate("/admin/jobs/create")
              }
              className="bg-[#34C6B3] hover:bg-white hover:text-black text-black font-semibold rounded-xl px-6 py-6 text-base transition-all"
            >
              <Plus className="mr-2 w-5 h-5" />
              Post New Job
            </Button>
          </div>


          <div className="p-6 border-b border-gray-100">
            {/* search for a job */}
            <div className="relative max-w-md">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Search by company or job title..."
                className="pl-11 h-12 rounded-2xl border-gray-300 focus-visible:ring-[#34C6B3]"
              />
            </div>
          </div>

          {/* jobs table */}
          <div className="p-6">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;