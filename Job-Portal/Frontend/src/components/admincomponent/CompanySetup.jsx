import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";
import { Avatar, AvatarImage } from "../ui/avatar";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);

  const [previewLogo, setPreviewLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // input change handler
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // file change handler
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({
        ...input,
        file,
      });

      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // set company data
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description:
          singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: null,
      });

      setPreviewLogo(singleCompany?.logo || "");
    }
  }, [singleCompany]);


  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">


        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="rounded-xl px-5 py-5 border-gray-300 hover:bg-black hover:text-white transition-all"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>

          <h1 className="text-3xl font-bold text-black">
            Company Setup
          </h1>
        </div>

        {/* card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">


          <div className="bg-black px-8 py-10 flex flex-col md:flex-row items-center gap-6">

            {/* logo */}
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
              <AvatarImage
                src={previewLogo}
                alt="company-logo"
              />
            </Avatar>

            {/* information */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {input.name || "Company Name"}
              </h1>

              <p className="text-gray-300 mt-2">
                Update your company information and
                branding details.
              </p>
            </div>
          </div>

          {/* form */}
          <form
            onSubmit={submitHandler}
            className="p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Company name */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Building2 size={16} />
                  Company Name
                </Label>

                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* location */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <MapPin size={16} />
                  Location
                </Label>

                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Enter location"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* website */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Globe size={16} />
                  Website
                </Label>

                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* logo */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Upload size={16} />
                  Upload Logo
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="h-12 rounded-xl cursor-pointer"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <FileText size={16} />
                  Description
                </Label>

                <textarea
                  rows={5}
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Write company description..."
                  className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#34C6B3] resize-none"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-8">
              {loading ? (
                <Button className="w-full h-12 rounded-xl bg-[#34C6B3] text-black hover:bg-[#2cb29f]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#34C6B3] text-black hover:bg-black hover:text-white transition-all text-base font-semibold"
                >
                  Update Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;