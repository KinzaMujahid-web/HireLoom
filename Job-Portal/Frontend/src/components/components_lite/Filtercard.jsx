import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Faisalabad",
      "Islamabad",
      "Lahore",
      "Sargodha",
      "Multan",
      "Rawalpindi",
      "Chiniot",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "Editor",
      "Marketing",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const dispatch = useDispatch();

  const { allJobs } = useSelector((store) => store.jobs);

  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // SEARCH
  useEffect(() => {
    dispatch(setSearchedQuery(searchValue));
  }, [searchValue, dispatch]);

  // Radio button handler
  const handleChange = (value) => {
    if (selectedValue === value) {
      setSelectedValue("");
      dispatch(setSearchedQuery(""));
    } else {
      setSelectedValue(value);
      dispatch(setSearchedQuery(value));
    }
  };

  //Dynamic count
  const getCount = (item, type) => {
    if (!allJobs) return 0;

    return allJobs.filter((job) => {

      // Location
      if (type === "Location") {
        return (
          job?.location &&
          job.location.toLowerCase().includes(item.toLowerCase())
        );
      }

      // Technology
      if (type === "Technology") {
        return (
          job?.title &&
          job.title.toLowerCase().includes(item.toLowerCase())
        );
      }

      // Experience
      if (type === "Experience") {
        const exp = Number(job?.experienceLevel);

        if (item === "0-3 years") {
          return exp >= 0 && exp <= 3;
        }

        if (item === "3-5 years") {
          return exp >= 3 && exp <= 5;
        }

        if (item === "5-7 years") {
          return exp >= 5 && exp <= 7;
        }

        if (item === "7+ years") {
          return exp >= 7;
        }
      }

      // Salary
      if (type === "Salary") {
        const salary = Number(job?.salary);

        if (item === "0-50k") {
          return salary >= 0 && salary <= 50000;
        }

        if (item === "50k-100k") {
          return salary > 50000 && salary <= 100000;
        }

        if (item === "100k-200k") {
          return salary > 100000 && salary <= 200000;
        }

        if (item === "200k+") {
          return salary > 200000;
        }
      }

      return false;
    }).length;
  };

  return (
    <div className="w-full bg-[#EAF7F5] rounded-3xl p-5 shadow-md border border-[#34C6B3]/20">

      {/* Search */}
      <div>
        <h1 className="font-bold text-lg text-black mb-4">
          Search by Job Title
        </h1>

        <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Job title or company"
            className="bg-transparent outline-none border-none w-full ml-3 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-7">
        <RadioGroup
          value={selectedValue}
          className="space-y-7"
        >
          {filterData.map((data, index) => (
            <div key={index}>

              
              <h2 className="font-bold text-lg text-black mb-4">
                {data.filterType}
              </h2>

              {/* items */}
              <div className="space-y-3">
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;

                  return (
                    <div
                      key={itemId}
                      className="flex items-center justify-between"
                    >

                     
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          checked={selectedValue === item}
                          onClick={() => handleChange(item)}
                          className="border-gray-400 text-[#34C6B3] cursor-pointer"
                        />

                        <label
                          htmlFor={itemId}
                          onClick={() => handleChange(item)}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>

                      {/* count */}
                      <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-500 min-w-7 text-center">
                        {getCount(item, data.filterType)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;