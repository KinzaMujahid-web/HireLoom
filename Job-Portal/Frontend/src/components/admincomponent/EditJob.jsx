
import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  // Existing job data fetching
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/${id}`,
          { withCredentials: true }
        );

        if (res.data.status) {
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: Array.isArray(job.requirements)
              ? job.requirements.join(", ")
              : job.requirements || "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experience: job.experienceLevel || "",
            position: job.position || 0,
            companyId: job.company?._id || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load job details");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // selecting company to edit
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  // Update submit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${id}`,
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

  if (fetching) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center py-40 text-lg font-semibold">
          Loading job details...
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-black">Edit Job</h1>
                <p className="text-gray-500 text-sm">Update job details</p>
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
                    <SelectValue
                      placeholder={
                        companies.find((c) => c._id === input.companyId)?.name ||
                        "Select company"
                      }
                    />
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

          {/* Update button */}
          <div className="px-6 pb-6">
            {loading ? (
              <Button className="w-full bg-black text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Job...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#34C6B3] hover:bg-[#2fb3a1] text-white font-semibold"
              >
                Update Job
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditJob;