import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search} from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-10 py-5">
      <div className="text-center w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <span className="px-5 py-2 mx-auto flex justify-center items-center gap-2 rounded-full bg-[#34C6B3] text-black font-semibold w-fit">
            <span className="text-xl">
              <PiBuildingOfficeBold />
            </span>
            No.1 Job Hunt Website
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Find Your Dream Job Today!
          </h2>

          {/* Paragraph */}
          <p className="text-gray-300 text-sm sm:text-base">
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center w-full md:w-[85%] lg:w-[70%] mx-auto shadow-2xl">
            {/* Input */}
            <div className="flex items-center px-5 py-4 w-full border-b md:border-b-0 md:border-r border-gray-300">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job Title or Company"
                className="outline-none text-black w-full"
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={searchjobHandler}
              className="bg-[#34C6B3] hover:bg-[#2fb3a2] text-white rounded-none md:rounded-r-2xl px-8 py-7 w-full md:w-auto"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Job
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#34C6B3] p-4 rounded-full">
                <PiBuildingOfficeBold className="text-black text-xl" />
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-bold">25,850</h3>
                <p className="text-gray-300 text-sm">Jobs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#34C6B3] p-4 rounded-full">
                <PiBuildingOfficeBold className="text-black text-xl" />
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-bold">10,250</h3>
                <p className="text-gray-300 text-sm">Candidates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#34C6B3] p-4 rounded-full">
                <PiBuildingOfficeBold className="text-black text-xl" />
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-bold">18,400</h3>
                <p className="text-gray-300 text-sm">Companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;