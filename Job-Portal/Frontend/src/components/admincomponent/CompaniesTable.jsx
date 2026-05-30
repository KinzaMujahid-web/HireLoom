import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import {
  Edit2,
  MoreHorizontal,
  Building2,
  Trash2,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_ENDPOINT } from "@/utils/data";


const CompaniesTable = () => {

  // Get companies and search text
  const {
    companies,
    searchCompanyByText,
  } = useSelector((store) => store.company);

  const navigate = useNavigate();

  const [filterCompany, setFilterCompany] =
    useState(companies);

  // Filter companies
  useEffect(() => {
    const filteredCompany =
      companies?.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }

        return company.name
          ?.toLowerCase()
          .includes(
            searchCompanyByText.toLowerCase()
          );
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);


  if (!companies) {
    return (
      <div className="flex justify-center items-center py-20 text-lg font-semibold">
        Loading...
      </div>
    );
  }


  // delete a company
  const deleteCompanyHandler = async (companyId) => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_ENDPOINT}/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setFilterCompany((prev) =>
          prev.filter(
            (company) => company._id !== companyId
          )
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-[#f8fbfb]">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Registered Companies
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your company profiles
          </p>
        </div>

        <div className="bg-[#34C6B3]/20 text-black px-4 py-2 rounded-full text-sm font-semibold">
          {filterCompany?.length || 0} Companies
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <Table>

          <TableCaption className="py-5 text-gray-500">
            Your recently registered companies
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-[#f4f7f7] hover:bg-[#f4f7f7]">

              <TableHead className="font-bold text-black pl-6">
                Company
              </TableHead>

              <TableHead className="font-bold text-black">
                Created Date
              </TableHead>

              <TableHead className="font-bold text-black text-right pr-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {filterCompany?.length === 0 ? (

              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-52 text-center"
                >
                  <div className="flex flex-col items-center justify-center">

                    <div className="bg-[#34C6B3]/20 p-5 rounded-full mb-4">
                      <Building2
                        size={40}
                        className="text-[#34C6B3]"
                      />
                    </div>

                    <h1 className="text-xl font-bold">
                      No Companies Added
                    </h1>

                    <p className="text-gray-500 mt-2">
                      Your registered companies will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>

            ) : (

              filterCompany?.map((company) => (

                <TableRow
                  key={company._id}
                  className="hover:bg-[#f8fbfb] transition-all duration-200"
                >

                  {/* Company */}
                  <TableCell className="pl-6 py-5">

                    <div className="flex items-center gap-4">

                      <Avatar className="w-14 h-14 border shadow-sm">

                        <AvatarImage
                          src={company?.logo}
                        />

                        <AvatarFallback className="bg-black text-white font-bold text-lg">
                          {company?.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h1 className="font-bold text-lg text-black">
                          {company?.name}
                        </h1>

                        <p className="text-gray-500 text-sm">
                          Hiring Company
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>

                    <div className="bg-[#34C6B3]/10 w-fit px-4 py-2 rounded-full text-sm font-medium">
                      {company?.createdAt?.split("T")[0]}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right pr-6">

                    <Popover>

                      <PopoverTrigger asChild>

                        <button className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                      </PopoverTrigger>


                      <PopoverContent className="w-44 rounded-2xl border shadow-lg p-3">

                        {/* edit */}
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#34C6B3]/10 cursor-pointer transition-all"
                        >
                          <div className="bg-[#34C6B3]/20 p-2 rounded-full">
                            <Edit2
                              size={16}
                              className="text-[#34C6B3]"
                            />
                          </div>

                          <span className="font-medium">
                            Edit Company
                          </span>
                        </div>

                        {/* Delete */}
                        <div
                          onClick={() =>
                            deleteCompanyHandler(company._id)
                          }
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 cursor-pointer transition-all mt-2"
                        >
                          <div className="bg-red-100 p-2 rounded-full">
                            <Trash2
                              size={16}
                              className="text-red-500"
                            />
                          </div>

                          <span className="font-medium text-red-500">
                            Delete Company
                          </span>
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

export default CompaniesTable;