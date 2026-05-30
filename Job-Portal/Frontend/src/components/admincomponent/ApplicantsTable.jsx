import React from "react";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "../ui/table";

import {
  Popover, PopoverContent, PopoverTrigger
} from "../ui/popover";

import {
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock3,
  Download,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

import { useDispatch } from "react-redux";
import { updateApplicantStatus } from "@/redux/applicationSlice";

const ApplicantsTable = ({ data }) => {

  const dispatch = useDispatch();

  // Function to update applicant status
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);


        dispatch(updateApplicantStatus({ id, status }));
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Function to return status badge styles
  const getStatusStyle = (status) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">

      <Table>
        {/* table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* table body */}
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item._id}>

              <TableCell>
                <div className="flex items-center gap-3">

                  <Avatar>
                    <AvatarImage src={item?.applicant?.profile?.profilePhoto} />
                    <AvatarFallback>
                      {item?.applicant?.fullname?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-bold">{item?.applicant?.fullname}</p>
                    <p className="text-sm text-gray-500">{item?.applicant?.email}</p>
                  </div>

                </div>
              </TableCell>

              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              {/* Resume */}
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a href={item?.applicant?.profile?.resume} target="_blank">
                    <Download size={16} /> Resume
                  </a>
                ) : (
                  "No Resume"
                )}
              </TableCell>

              <TableCell>
                {item?.createdAt?.split("T")[0]}
              </TableCell>

              <TableCell>
                <span className={`px-3 py-1 rounded-full ${getStatusStyle(item?.status)}`}>
                  {item?.status || "Pending"}
                </span>
              </TableCell>

              {/* status popover */}
              <TableCell className="text-right">

                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>

                  <PopoverContent className="w-40">

                    <button onClick={() => statusHandler("Accepted", item._id)}>
                      <CheckCircle2 /> Accept
                    </button>

                    <button onClick={() => statusHandler("Rejected", item._id)}>
                      <XCircle /> Reject
                    </button>

                    <button onClick={() => statusHandler("Pending", item._id)}>
                      <Clock3 /> Pending
                    </button>

                  </PopoverContent>
                </Popover>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
};

export default ApplicantsTable;