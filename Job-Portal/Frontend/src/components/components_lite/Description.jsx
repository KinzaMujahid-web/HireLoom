import React, { useEffect, useState } from "react";
import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Wallet,
  BadgeCheck,
  Building2,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useParams } from "react-router-dom";

import {
  JOB_API_ENDPOINT,
  APPLICATION_API_ENDPOINT,
} from "@/utils/data";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] =
    useState(isInitiallyApplied);

  // APPLY JOB Handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updateSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updateSingleJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.response.data.message);
    }
  };

  // Fetch single job
  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              (application) =>
                application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);

        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!singleJob) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />


      <div className="bg-black py-14 md:py-20">
        <h1 className="text-white text-center text-4xl md:text-5xl font-bold">
          Job Details
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white rounded-3xl p-5 md:p-8 shadow-sm">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

              {/* Company+title */}
              <div className="flex gap-4">

                <div className="w-16 h-16 rounded-full bg-[#34C6B3] flex items-center justify-center text-black text-2xl font-bold border">
                  {singleJob?.title?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Building2
                      size={18}
                      className="text-[#34C6B3]"
                    />

                    <p className="text-gray-500 text-sm">
                      {singleJob?.company?.name}
                    </p>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mt-2">
                    {singleJob?.title}
                  </h1>

                  <div className="flex flex-wrap gap-3 mt-4">

                    <Badge className="bg-[#34C6B3]/20 text-black hover:bg-[#34C6B3]/20 rounded-full px-4 py-1">
                      {singleJob?.jobType}
                    </Badge>

                    <Badge className="bg-black text-white hover:bg-black rounded-full px-4 py-1">
                      {singleJob?.location}
                    </Badge>

                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-1">
                      {singleJob?.position} Positions
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div>
                <Button
                  onClick={
                    isApplied
                      ? null
                      : applyJobHandler
                  }
                  disabled={isApplied}
                  className={`px-8 py-6 rounded-xl text-base font-semibold ${isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#34C6B3] hover:bg-black text-black hover:text-white"
                    }`}
                >
                  {isApplied
                    ? "Already Applied"
                    : "Apply Job"}
                </Button>
              </div>
            </div>

            {/* Job details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-[#34C6B3] p-3 rounded-full">
                  <MapPin className="text-black" size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <h2 className="font-semibold">
                    {singleJob?.location}
                  </h2>
                </div>
              </div>

              <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-[#34C6B3] p-3 rounded-full">
                  <BriefcaseBusiness
                    className="text-black"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Job Type
                  </p>

                  <h2 className="font-semibold">
                    {singleJob?.jobType}
                  </h2>
                </div>
              </div>

              <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-[#34C6B3] p-3 rounded-full">
                  <Wallet className="text-black" size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Salary
                  </p>

                  <h2 className="font-semibold">
                    {singleJob?.salary} PKR
                  </h2>
                </div>
              </div>

              <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-[#34C6B3] p-3 rounded-full">
                  <Clock3 className="text-black" size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Posted Date
                  </p>

                  <h2 className="font-semibold">
                    {singleJob?.createdAt.split("T")[0]}
                  </h2>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h1 className="text-2xl font-bold mb-5">
                Job Description
              </h1>

              <p className="text-gray-600 leading-8">
                {singleJob?.description}
              </p>
            </div>

            <div className="mt-10">
              <h1 className="text-2xl font-bold mb-5">
                Education
              </h1>

              <p className="text-gray-600 leading-8">
                {singleJob?.education}
              </p>
            </div>

            {/* Requirments */}
            <div className="mt-10">
              <h1 className="text-2xl font-bold mb-5">
                Requirements
              </h1>

              <div className="space-y-4">
                {(
                  Array.isArray(singleJob?.requirements)
                    ? singleJob?.requirements
                    : typeof singleJob?.requirements === "string"
                      ? singleJob?.requirements.split(",")
                      : []
                ).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <BadgeCheck
                      size={20}
                      className="text-[#34C6B3] mt-1"
                    />

                    <p className="text-gray-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10">
              <h1 className="text-2xl font-bold mb-5">
                Tags
              </h1>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#34C6B3]/20 text-black hover:bg-[#34C6B3]/20 rounded-full px-4 py-2">
                  {singleJob?.jobType}
                </Badge>

                <Badge className="bg-black text-white hover:bg-black rounded-full px-4 py-2">
                  {singleJob?.location}
                </Badge>

                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-2">
                  {singleJob?.experienceLevel} Years
                </Badge>
              </div>
            </div>
          </div>


          <div className="space-y-6">

            {/* JOB overview */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-6">
                Job Overview
              </h1>

              <div className="space-y-5">

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    Experience
                  </p>

                  <p className="font-semibold">
                    {singleJob?.experienceLevel} Years
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    Applicants
                  </p>

                  <p className="font-semibold">
                    {singleJob?.applications?.length}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    Job Type
                  </p>

                  <p className="font-semibold">
                    {singleJob?.jobType}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    Salary
                  </p>

                  <p className="font-semibold">
                    {singleJob?.salary} PKR
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {singleJob?.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Company detail */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-6">
                Company
              </h1>

              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={singleJob?.company?.logo}
                  />
                </Avatar>

                <div>
                  <h2 className="font-bold text-lg">
                    {singleJob?.company?.name}
                  </h2>

                  <p className="text-gray-500">
                    Hiring Company
                  </p>
                </div>
              </div>
            </div>

            {/* Apply card */}
            <div className="bg-[#34C6B3] rounded-3xl p-6">
              <h1 className="text-2xl font-bold text-black">
                Ready To Apply?
              </h1>

              <p className="text-black/70 mt-3 leading-7">
                Apply now and start your career
                journey with this opportunity.
              </p>

              <Button
                onClick={
                  isApplied ? null : applyJobHandler
                }
                disabled={isApplied}
                className={`w-full mt-6 rounded-xl py-6 text-base ${isApplied
                  ? "bg-gray-500"
                  : "bg-black hover:bg-white text-white hover:text-black"
                  }`}
              >
                {isApplied
                  ? "Already Applied"
                  : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;



