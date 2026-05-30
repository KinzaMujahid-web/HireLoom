import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Briefcase, ToggleLeft, ToggleRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  // Filter jobs
  useEffect(() => {
    const filtered = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    }) || [];
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  // Toggle active/inactive job status
  const handleToggle = async (jobId, currentStatus) => {
    try {
      const res = await axios.patch(
        `${JOB_API_ENDPOINT}/toggle/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.status) {
        setFilterJobs((prev) =>
          prev.map((job) =>
            job._id === jobId
              ? { ...job, isActive: res.data.isActive }
              : job
          )
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Toggle failed!");
      console.error(error);
    }
  };


  if (!allAdminJobs) {
    return (
      <div className="flex justify-center items-center py-20 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-[#f8fbfb]">
        <div>
          <h1 className="text-2xl font-bold text-black">Posted Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all job postings</p>
        </div>
        <div className="bg-[#34C6B3]/20 text-black px-4 py-2 rounded-full text-sm font-semibold">
          {filterJobs?.length || 0} Jobs
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-5 text-gray-500">
            Your recently posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-[#f4f7f7] hover:bg-[#f4f7f7]">
              <TableHead className="font-bold text-black pl-6">Company</TableHead>
              <TableHead className="font-bold text-black">Role</TableHead>
              <TableHead className="font-bold text-black">Created Date</TableHead>
              <TableHead className="font-bold text-black">Status</TableHead> {/* ✅ New column */}
              <TableHead className="font-bold text-black text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-52 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#34C6B3]/20 p-5 rounded-full mb-4">
                      <Briefcase size={40} className="text-[#34C6B3]" />
                    </div>
                    <h1 className="text-xl font-bold">No Jobs Found</h1>
                    <p className="text-gray-500 mt-2">Posted jobs will appear here.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-[#f8fbfb] transition-all duration-200"
                >

                  <TableCell className="pl-6 py-5 font-semibold text-black">
                    {job?.company?.name}
                  </TableCell>


                  <TableCell className="text-gray-700 font-medium">
                    {job.title}
                  </TableCell>


                  <TableCell>
                    <div className="bg-[#34C6B3]/10 w-fit px-4 py-2 rounded-full text-sm font-medium">
                      {job.createdAt?.split("T")[0]}
                    </div>
                  </TableCell>


                  <TableCell>
                    <button
                      onClick={() => handleToggle(job._id, job.isActive)}
                      className="flex items-center gap-2 transition-all"
                    >
                      {job.isActive !== false ? (
                        <>
                          <ToggleRight size={28} className="text-[#34C6B3]" />
                          <span className="text-sm font-medium text-[#34C6B3]">
                            Active
                          </span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={28} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-400">
                            Inactive
                          </span>
                        </>
                      )}
                    </button>
                  </TableCell>


                  <TableCell className="text-right pr-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 rounded-2xl border shadow-lg p-3">


                        <div
                          onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#34C6B3]/10 cursor-pointer transition-all"
                        >
                          <div className="bg-[#34C6B3]/20 p-2 rounded-full">
                            <Edit2 size={16} className="text-[#34C6B3]" />
                          </div>
                          <span className="font-medium">Edit Job</span>
                        </div>


                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#34C6B3]/10 cursor-pointer transition-all mt-1"
                        >
                          <div className="bg-[#34C6B3]/20 p-2 rounded-full">
                            <Eye size={16} className="text-[#34C6B3]" />
                          </div>
                          <span className="font-medium">Applicants</span>
                        </div>

                      </PopoverContent>
                    </Popover>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;