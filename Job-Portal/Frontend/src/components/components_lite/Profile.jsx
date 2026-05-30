import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import { Button } from "../ui/button";

import {
  Contact,
  Mail,
  Pen,
  Download,
  User2,
  BriefcaseBusiness,
  MapPin,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {

  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job);


  const isResume = user?.profile?.resume;

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      {/* HERO */}
      <div className="bg-black py-14 md:py-20">
        <h1 className="text-white text-center text-4xl md:text-5xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-300 text-center mt-4 text-sm md:text-base">
          Manage your personal information and applications
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          {/* TOP SECTION */}
          <div className="bg-[#34C6B3] h-32 relative">
            <Button
              onClick={() => setOpen(true)}
              className="absolute top-5 right-5 bg-black hover:bg-white hover:text-black text-white rounded-xl"
            >
              <Pen size={18} className="mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* PROFILE INFO */}
          <div className="px-6 md:px-10 pb-10 relative">

            {/* AVATAR */}
            <div className="-mt-16">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                />

                <AvatarFallback className="bg-black text-white text-4xl font-bold">
                  {user?.fullname
                    ?.charAt(0)
                    ?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* USER INFO */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

              {/* LEFT */}
              <div className="flex-1">

                <h1 className="text-3xl font-bold text-black">
                  {user?.fullname}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                  <User2 size={18} />
                  <p>Job Seeker</p>
                </div>

                <p className="text-gray-600 mt-5 leading-8 max-w-3xl">
                  {user?.profile?.bio ||
                    "No bio added yet."}
                </p>

                {/* CONTACT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                  {/* EMAIL */}
                  <div className="bg-[#f4f7f7] rounded-2xl p-5 flex items-center gap-4">
                    <div className="bg-[#34C6B3] p-3 rounded-full">
                      <Mail
                        className="text-black"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Email Address
                      </p>

                      <a
                        href={`mailto:${user?.email}`}
                        className="font-semibold break-all"
                      >
                        {user?.email}
                      </a>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="bg-[#f4f7f7] rounded-2xl p-5 flex items-center gap-4">
                    <div className="bg-[#34C6B3] p-3 rounded-full">
                      <Contact
                        className="text-black"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Phone Number
                      </p>

                      <a
                        href={`tel:${user?.phoneNumber}`}
                        className="font-semibold"
                      >
                        {user?.phoneNumber ||
                          "Not Added"}
                      </a>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="bg-[#f4f7f7] rounded-2xl p-5 flex items-center gap-4">
                    <div className="bg-[#34C6B3] p-3 rounded-full">
                      <MapPin
                        className="text-black"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Location
                      </p>

                      <p className="font-semibold">
                        {user?.profile?.location ||
                          "Not Added"}
                      </p>
                    </div>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="bg-[#f4f7f7] rounded-2xl p-5 flex items-center gap-4">
                    <div className="bg-[#34C6B3] p-3 rounded-full">
                      <BadgeCheck
                        className="text-black"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Experience
                      </p>

                      <p className="font-semibold">
                        {user?.profile?.experience ||
                          "Fresher"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="bg-[#f4f7f7] rounded-3xl p-6 mt-8">

                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap
                      className="text-[#34C6B3]"
                      size={24}
                    />

                    <h1 className="text-2xl font-bold">
                      Education
                    </h1>
                  </div>

                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">
                        Degree:
                      </span>{" "}
                      {user?.profile?.education
                        ?.degree || "Not Added"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Institute:
                      </span>{" "}
                      {user?.profile?.education
                        ?.institute || "Not Added"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Passing Year:
                      </span>{" "}
                      {user?.profile?.education
                        ?.passingYear || "Not Added"}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full lg:w-[320px] space-y-6">

                {/* SKILLS */}
                <div className="bg-[#f4f7f7] rounded-3xl p-6">

                  <div className="flex items-center gap-2 mb-5">
                    <BriefcaseBusiness
                      className="text-[#34C6B3]"
                      size={22}
                    />

                    <h1 className="text-xl font-bold">
                      Skills
                    </h1>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {user?.profile?.skills?.length >
                      0 ? (
                      user.profile.skills.map(
                        (item, index) => (
                          <Badge
                            key={index}
                            className="bg-black text-white hover:bg-black px-4 py-2 rounded-full"
                          >
                            {item}
                          </Badge>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">
                        No skills added
                      </p>
                    )}
                  </div>
                </div>


                {/* RESUME */}
                <div className="bg-[#34C6B3] rounded-3xl p-6">

                  <h1 className="text-2xl font-bold text-black">
                    Resume
                  </h1>

                  <p className="text-black/70 mt-3 leading-7">
                    Download your uploaded resume.
                  </p>

                  {isResume ? (

                    <a
                      href={user?.profile?.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button>
                        View Resume
                      </Button>
                    </a>
                  ) : (
                    <div className="mt-6 bg-white rounded-xl p-4 text-center text-gray-600">
                      No Resume Uploaded
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APPLIED JOBS */}
        <div className="bg-white rounded-3xl shadow-sm mt-10 p-6 md:p-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Applied Jobs
              </h1>

              <p className="text-gray-500 mt-2">
                Track all jobs you applied for
              </p>
            </div>

            <div className="bg-[#34C6B3]/20 text-black px-5 py-2 rounded-full font-semibold">
              {allAppliedJobs?.length || 0} Applications  {/* ✅ */}
            </div>
          </div>

          <AppliedJob />
        </div>
      </div>

      {/* MODAL */}
      <EditProfileModal
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Profile;