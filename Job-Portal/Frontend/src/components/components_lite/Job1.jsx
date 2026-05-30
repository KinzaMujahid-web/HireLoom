import React from "react";
import {
  Bookmark,
  BookMarked,
  MapPin,
  Clock3,
  BriefcaseBusiness,
  Banknote,
} from "lucide-react";

import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const Job1 = ({ job }) => {
  if (!job) return null;

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


// Calculate posting time
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      onClick={() => navigate(`/description/${_id}`)}
      className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >

     
      <div className="flex items-center justify-between">

        {/* Time */}
        <span className="bg-[#34C6B3]/15 text-[#34C6B3] text-xs px-3 py-1 rounded-full font-medium">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </span>

      </div>

    
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mt-5">

        {/* Logo */}
        <div className="bg-[#34C6B3] rounded-2xl w-20 h-20 flex items-center justify-center shrink-0">

          {company?.logo ? (
            <Avatar className="w-16 h-16">
              <AvatarImage src={company?.logo} />
            </Avatar>
          ) : (
            <h1 className="text-3xl font-bold text-white">
              {company?.name?.charAt(0)}
            </h1>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
            {title}
          </h1>

          {/* Company */}
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {company?.name}
          </p>

          {/* Job Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 text-gray-600">

            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={16} className="text-[#34C6B3]" />

              <span className="text-sm">
                {position} Positions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#34C6B3]" />

              <span className="text-sm">
                {jobType}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Banknote size={16} className="text-[#34C6B3]" />

              <span className="text-sm">
                {salary} PKR
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#34C6B3]" />

              <span className="text-sm">
                {location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 mt-5 text-sm sm:text-base line-clamp-2 leading-7">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">

            <p className="text-gray-500 text-sm">
              {job?.applications?.length || 0} applicants
            </p>

            <button className="bg-[#34C6B3] hover:bg-black text-black hover:text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 w-full sm:w-fit">
              Job Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job1;