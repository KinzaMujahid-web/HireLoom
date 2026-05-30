import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Search,
  Plus,
  Building2,
} from "lucide-react";

import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();

  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  // Get companies
  const { companies } = useSelector(
    (store) => store.company
  );

  // Update Redux search text
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-black py-14 md:py-20">

        <div className="max-w-6xl mx-auto px-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">


            <div>

              <h1 className="text-white text-4xl md:text-5xl font-bold">
                Companies
              </h1>

              <p className="text-gray-300 mt-4 text-sm md:text-base max-w-2xl leading-7">
                Manage all your registered companies,
                edit details, and organize hiring
                companies easily.
              </p>
            </div>


            <div className="bg-[#34C6B3] rounded-3xl px-8 py-6 min-w-55">

              <div className="flex items-center gap-4">

                <div className="bg-black p-4 rounded-2xl">
                  <Building2
                    className="text-white"
                    size={28}
                  />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-black">
                    {companies?.length || 0}
                  </h1>

                  <p className="text-black/70 text-sm">
                    Total Companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-10">


        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Search */}
            <div className="relative w-full lg:w-105">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Search company by name..."
                className="pl-11 h-12 rounded-2xl border-gray-200 focus-visible:ring-[#34C6B3]"
              />
            </div>

            {/* adding new company */}
            <Button
              onClick={() =>
                navigate("/admin/companies/create")
              }
              className="bg-[#34C6B3] hover:bg-black text-black hover:text-white rounded-2xl px-7 py-6 text-base font-semibold transition-all duration-300"
            >
              <Plus size={20} className="mr-2" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;