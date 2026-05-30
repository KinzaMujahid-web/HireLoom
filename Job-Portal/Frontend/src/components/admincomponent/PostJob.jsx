import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

// submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        input,
        { withCredentials: true }
      );

      if (res.data.status) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">

        <form
          onSubmit={submitHandler}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >

     
          <div className="flex items-center justify-between px-6 py-5 border-b bg-[#f8fbfb]">
            <div className="flex items-center gap-3">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <Briefcase className="text-[#34C6B3]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-black">
                  Post New Job
                </h1>
                <p className="text-gray-500 text-sm">
                  Fill details to create a job posting
                </p>
              </div>
            </div>
          </div>

        
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Title */}
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Frontend Developer"
                className="mt-2 focus-visible:ring-0"
              />
            </div>

            {/* Company */}
            <div>
              <Label>Company</Label>
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Write job description..."
                className="mt-2 focus-visible:ring-0"
              />
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node, MongoDB..."
                className="mt-2 focus-visible:ring-0"
              />
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            {/* Job Type */}
            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            {/* Salary */}
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            {/* Position */}
            <div>
              <Label>Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            {/* Experience */}
            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

          </div>

          {/* Post button */}
          <div className="px-6 pb-6">

            {loading ? (
              <Button className="w-full bg-black text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#34C6B3] hover:bg-[#2fb3a1] text-white font-semibold"
              >
                Post Job
              </Button>
            )}

            {companies.length === 0 && (
              <p className="text-red-500 text-sm mt-3 text-center">
                *Please register a company before posting a job*
              </p>
            )}

          </div>

        </form>
      </div>
    </div>
  );
};

export default PostJob;






















