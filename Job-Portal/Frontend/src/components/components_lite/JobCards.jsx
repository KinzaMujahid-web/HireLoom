// import React, { useEffect, useState } from "react";
// import {
//   MapPin,
//   BriefcaseBusiness,
//   Clock3,
//   Wallet,
//   BadgeCheck,
//   Building2,
//   ImageOff,
// } from "lucide-react";

// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { useParams } from "react-router-dom";

// import {
//   JOB_API_ENDPOINT,
//   APPLICATION_API_ENDPOINT,
// } from "@/utils/data";

// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "@/redux/jobSlice";
// import { toast } from "sonner";
// import Navbar from "./Navbar";

// const Description = () => {
//   const params = useParams();
//   const jobId = params.id;

//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);

//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const isInitiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;

//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//   // APPLY JOB
//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         setIsApplied(true);

//         const updateSingleJob = {
//           ...singleJob,
//           applications: [
//             ...(singleJob?.applications || []),
//             { applicant: user?._id },
//           ],
//         };

//         dispatch(setSingleJob(updateSingleJob));

//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         error?.response?.data?.message || "Something went wrong"
//       );
//     }
//   };

//   // FETCH SINGLE JOB
//   useEffect(() => {
//     const fetchSingleJobs = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await axios.get(
//           `${JOB_API_ENDPOINT}/get/${jobId}`,
//           {
//             withCredentials: true,
//           }
//         );

//         console.log("JOB DATA => ", res.data);

//         // IMPORTANT FIX
//         const fetchedJob =
//           res.data.job ||
//           res.data.singleJob ||
//           res.data.data;

//         if (res.data.success || res.data.status) {
//           dispatch(setSingleJob(fetchedJob));

//           setIsApplied(
//             fetchedJob?.applications?.some(
//               (application) =>
//                 application.applicant === user?._id
//             )
//           );
//         } else {
//           setError("Failed to fetch jobs.");
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);

//         setError(error.message || "An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSingleJobs();
//   }, [jobId, dispatch, user?._id]);

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-500">
//         {error}
//       </div>
//     );
//   }

//   if (!singleJob) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f7f7]">
//       <Navbar />

//       {/* HERO */}
//       <div className="bg-black py-14 md:py-20">
//         <h1 className="text-white text-center text-4xl md:text-5xl font-bold">
//           Job Details
//         </h1>
//       </div>

//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 bg-white rounded-3xl p-5 md:p-8 shadow-sm">

//             {/* TOP SECTION */}
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

//               {/* COMPANY + TITLE */}
//               <div className="flex gap-4">

//                 {/* COMPANY LOGO */}
//                 <Avatar className="w-16 h-16 border-2 border-gray-200 shadow-md">
//                   <AvatarImage
//                     src={
//                       singleJob?.company?.logo ||
//                       singleJob?.companyId?.logo
//                     }
//                     alt="Company Logo"
//                     className="object-cover"
//                   />

//                   <AvatarFallback className="bg-[#34C6B3] text-black font-bold">
//                     {singleJob?.company?.name?.charAt(0) ||
//                       singleJob?.companyId?.name?.charAt(0) || (
//                         <ImageOff size={20} />
//                       )}
//                   </AvatarFallback>
//                 </Avatar>

//                 {/* JOB INFO */}
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Building2
//                       size={18}
//                       className="text-[#34C6B3]"
//                     />

//                     <p className="text-gray-500 text-sm font-medium">
//                       {singleJob?.company?.name ||
//                         singleJob?.companyId?.name ||
//                         "Company Name"}
//                     </p>
//                   </div>

//                   <h1 className="text-2xl md:text-3xl font-bold mt-2">
//                     {singleJob?.title}
//                   </h1>

//                   <div className="flex flex-wrap gap-3 mt-4">

//                     <Badge className="bg-[#34C6B3]/20 text-black hover:bg-[#34C6B3]/20 rounded-full px-4 py-1">
//                       {singleJob?.jobType}
//                     </Badge>

//                     <Badge className="bg-black text-white hover:bg-black rounded-full px-4 py-1">
//                       {singleJob?.location}
//                     </Badge>

//                     <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-1">
//                       {singleJob?.position} Positions
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               {/* APPLY BUTTON */}
//               <div>
//                 <Button
//                   onClick={
//                     isApplied ? null : applyJobHandler
//                   }
//                   disabled={isApplied}
//                   className={`px-8 py-6 rounded-xl text-base font-semibold ${
//                     isApplied
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-[#34C6B3] hover:bg-black text-black hover:text-white"
//                   }`}
//                 >
//                   {isApplied
//                     ? "Already Applied"
//                     : "Apply Job"}
//                 </Button>
//               </div>
//             </div>

//             {/* DETAIL CARDS */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

//               {/* LOCATION */}
//               <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
//                 <div className="bg-[#34C6B3] p-3 rounded-full">
//                   <MapPin className="text-black" size={20} />
//                 </div>

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Location
//                   </p>

//                   <h2 className="font-semibold">
//                     {singleJob?.location}
//                   </h2>
//                 </div>
//               </div>

//               {/* JOB TYPE */}
//               <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
//                 <div className="bg-[#34C6B3] p-3 rounded-full">
//                   <BriefcaseBusiness
//                     className="text-black"
//                     size={20}
//                   />
//                 </div>

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Job Type
//                   </p>

//                   <h2 className="font-semibold">
//                     {singleJob?.jobType}
//                   </h2>
//                 </div>
//               </div>

//               {/* SALARY */}
//               <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
//                 <div className="bg-[#34C6B3] p-3 rounded-full">
//                   <Wallet className="text-black" size={20} />
//                 </div>

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Salary
//                   </p>

//                   <h2 className="font-semibold">
//                     {singleJob?.salary} PKR
//                   </h2>
//                 </div>
//               </div>

//               {/* DATE */}
//               <div className="bg-[#f4f7f7] rounded-2xl p-4 flex items-center gap-4">
//                 <div className="bg-[#34C6B3] p-3 rounded-full">
//                   <Clock3 className="text-black" size={20} />
//                 </div>

//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     Posted Date
//                   </p>

//                   <h2 className="font-semibold">
//                     {singleJob?.createdAt
//                       ?.split("T")[0]}
//                   </h2>
//                 </div>
//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <div className="mt-10">
//               <h1 className="text-2xl font-bold mb-5">
//                 Job Description
//               </h1>

//               <p className="text-gray-600 leading-8">
//                 {singleJob?.description}
//               </p>
//             </div>

//             {/* REQUIREMENTS */}
//             <div className="mt-10">
//               <h1 className="text-2xl font-bold mb-5">
//                 Requirements
//               </h1>

//               <div className="space-y-4">
//                 {(
//                   Array.isArray(singleJob?.requirements)
//                     ? singleJob?.requirements
//                     : typeof singleJob?.requirements ===
//                       "string"
//                     ? singleJob?.requirements.split(",")
//                     : []
//                 ).map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3"
//                   >
//                     <BadgeCheck
//                       size={20}
//                       className="text-[#34C6B3] mt-1"
//                     />

//                     <p className="text-gray-700">
//                       {item}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="space-y-6">

//             {/* OVERVIEW */}
//             <div className="bg-white rounded-3xl p-6 shadow-sm">
//               <h1 className="text-2xl font-bold mb-6">
//                 Job Overview
//               </h1>

//               <div className="space-y-5">

//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-500">
//                     Experience
//                   </p>

//                   <p className="font-semibold">
//                     {singleJob?.experienceLevel} Years
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-500">
//                     Applicants
//                   </p>

//                   <p className="font-semibold">
//                     {singleJob?.applications?.length || 0}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-500">
//                     Salary
//                   </p>

//                   <p className="font-semibold">
//                     {singleJob?.salary} PKR
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* COMPANY CARD */}
//             <div className="bg-white rounded-3xl p-6 shadow-sm">
//               <h1 className="text-2xl font-bold mb-6">
//                 Company
//               </h1>

//               <div className="flex items-center gap-4">

//                 <Avatar className="w-16 h-16 border border-gray-200">
//                   <AvatarImage
//                     src={
//                       singleJob?.company?.logo ||
//                       singleJob?.companyId?.logo
//                     }
//                     alt="Company Logo"
//                     className="object-cover"
//                   />

//                   <AvatarFallback className="bg-[#34C6B3] text-black font-bold">
//                     {singleJob?.company?.name?.charAt(0) ||
//                       singleJob?.companyId?.name?.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>

//                 <div>
//                   <h2 className="font-bold text-lg">
//                     {singleJob?.company?.name ||
//                       singleJob?.companyId?.name}
//                   </h2>

//                   <p className="text-gray-500">
//                     Hiring Company
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* APPLY CARD */}
//             <div className="bg-[#34C6B3] rounded-3xl p-6">
//               <h1 className="text-2xl font-bold text-black">
//                 Ready To Apply?
//               </h1>

//               <p className="text-black/70 mt-3 leading-7">
//                 Apply now and start your career
//                 journey with this opportunity.
//               </p>

//               <Button
//                 onClick={
//                   isApplied ? null : applyJobHandler
//                 }
//                 disabled={isApplied}
//                 className={`w-full mt-6 rounded-xl py-6 text-base ${
//                   isApplied
//                     ? "bg-gray-500"
//                     : "bg-black hover:bg-white text-white hover:text-black"
//                 }`}
//               >
//                 {isApplied
//                   ? "Already Applied"
//                   : "Apply Now"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Description;





import React from "react";
import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Building2,
  Bookmark,
  BookMarked,
  Banknote,
} from "lucide-react";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";

const JobCards = ({ job }) => {
   if (!job) return null;
  // Destructure properties from the job object.
  const {
    company,
    title,
    description,
    position,
    salary,
    location,
    jobType,
    _id,
  } = job;
  
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="relative bg-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full"
    >
      {/* Upper tag */}
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs sm:text-sm text-gray-600">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>

        {/* <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          {isBookmarked ? (
            <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </Button> */}
      </div>

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Company Logo */}
        <div className="flex justify-center sm:justify-start">
          <Button
            className="p-7 sm:p-8 rounded-2xl"
            variant="outline"
            size="icon"
          >
            <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
        </div>

        {/* Job and company Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-black leading-tight">
            {job.title}
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-gray-600">
            <Building2 size={18} />
            <p className="text-sm sm:text-base md:text-lg">
              {job?.company?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        {/* Location */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <div className="bg-[#34C6B3] p-2 rounded-full shrink-0">
            <MapPin size={18} className="text-black" />
          </div>

          <div className="overflow-hidden">
            <p className="text-xs text-gray-500">Location</p>

            <span className="font-medium text-sm sm:text-base">
              {job.location}
            </span>
          </div>
        </div>

        {/* Job Type */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <div className="bg-[#34C6B3] p-2 rounded-full shrink-0">
            <BriefcaseBusiness size={18} className="text-black" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Job Type</p>

            <span className="font-medium text-sm sm:text-base">
              {job.jobType}
            </span>
          </div>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <div className="bg-[#34C6B3] p-2 rounded-full shrink-0">
            <Banknote size={18} className="text-black" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Salary</p>

            <span className="font-medium text-sm sm:text-base">
              {job.salary} PKR
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <div className="bg-[#34C6B3] p-2 rounded-full shrink-0">
            <Clock3 size={18} className="text-black" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Posted</p>

            <span className="font-medium text-sm sm:text-base">
              {job.createdAt
                ? new Date(job.createdAt).toLocaleDateString()
                : "6 days ago"}
            </span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-between mt-6">
        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full text-xs sm:text-sm text-center">
          {job.experienceLevel} Year Experience
        </Badge>

        <Badge className="bg-[#34C6B3]/20 text-[#34C6B3] hover:bg-[#34C6B3]/20 px-4 py-2 rounded-full text-xs sm:text-sm text-center">
          {job.position} Positions
        </Badge>
      </div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <p className="text-gray-500 text-sm sm:text-lg text-center sm:text-left">
          {job.applications?.length || 0} applicants
        </p>

        <button className="text-blue-600 font-semibold text-sm sm:text-base hover:translate-x-1 transition-all">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default JobCards;