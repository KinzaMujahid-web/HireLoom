import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

import { Users, BriefcaseBusiness, Search } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch applicants data
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  const applications = applicants?.applications || [];

  // normalize status
  const getStatus = (status) => {
    return status?.toLowerCase() || "pending";
  };

  //  counts fixed
  const counts = {
    all: applications.length,
    pending: applications.filter(
      (i) => !i?.status || i?.status === "Pending"
    ).length,
    accepted: applications.filter((i) => i?.status === "Accepted").length,
    rejected: applications.filter((i) => i?.status === "Rejected").length,
  };


  // filter logic
  const filteredApplicants =
    applicants?.applications?.filter((item) => {
      const status = item?.status?.toLowerCase() || "pending";

      if (filterStatus === "All") return true;
      if (filterStatus === "Pending") return status === "pending";

      return status === filterStatus.toLowerCase();
    }) || [];

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

          {/* HEADER */}
          <div className="bg-black px-8 py-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-[#34C6B3] p-4 rounded-2xl">
                <Users className="text-black" size={30} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white">
                  Job Applicants
                </h1>
                <p className="text-gray-300 mt-2">
                  View all candidates
                </p>
              </div>
            </div>

            <div className="bg-[#34C6B3] px-6 py-5 rounded-2xl text-center">
              <p className="text-black text-sm">Total</p>
              <h1 className="text-3xl font-bold text-black">
                {applicants?.applications?.length || 0}
              </h1>
            </div>
          </div>

          {/* job information */}
          <div className="px-8 py-6 border-b flex items-center gap-4">
            <BriefcaseBusiness className="text-[#34C6B3]" />
            <h2 className="text-xl font-bold">
              {applicants?.title || "Job Position"}
            </h2>
          </div>

          <div className="px-6 pt-6 flex gap-3 flex-wrap">
            {/* all applicants */}
            <button
              onClick={() => setFilterStatus("All")}
              className={`px-4 py-2 rounded-xl ${filterStatus === "All"
                ? "bg-[#34C6B3] text-black"
                : "bg-gray-100"
                }`}
            >
              All ({counts.all})
            </button>
            {/* pending applicants */}
            <button
              onClick={() => setFilterStatus("Pending")}
              className={`px-4 py-2 rounded-xl ${filterStatus === "Pending"
                ? "bg-yellow-400 text-black"
                : "bg-yellow-100"
                }`}
            >
              Pending ({counts.pending})
            </button>
            {/* accepted applicants */}
            <button
              onClick={() => setFilterStatus("Accepted")}
              className={`px-4 py-2 rounded-xl ${filterStatus === "Accepted"
                ? "bg-green-500 text-white"
                : "bg-green-100"
                }`}
            >
              Accepted ({counts.accepted})
            </button>
            {/* rejected applicants */}
            <button
              onClick={() => setFilterStatus("Rejected")}
              className={`px-4 py-2 rounded-xl ${filterStatus === "Rejected"
                ? "bg-red-500 text-white"
                : "bg-red-100"
                }`}
            >
              Rejected ({counts.rejected})
            </button>

          </div>

          {/* Table */}
          <div className="p-6">
            {loading ? (
              <p>Loading...</p>
            ) : filteredApplicants.length === 0 ? (
              <div className="text-center py-10">
                <Search className="mx-auto text-gray-400" size={40} />
                <h2>No Applicants Found</h2>
              </div>
            ) : (
              <ApplicantsTable data={filteredApplicants} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Applicants;




