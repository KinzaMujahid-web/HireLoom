import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import {
  Building2,
  ArrowLeft,
  BriefcaseBusiness,
} from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  // create new company
  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black">
              Create Company
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Add your company and continue setup
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-3xl bg-[#34C6B3]/20">
            <Building2
              size={40}
              className="text-[#34C6B3]"
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-black px-8 py-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-[#34C6B3] flex items-center justify-center text-black text-3xl font-bold">
                {companyName
                  ? companyName.charAt(0).toUpperCase()
                  : "C"}
              </div>

              <div>
                <h2 className="text-white text-3xl font-bold">
                  {companyName || "Company Name"}
                </h2>

                <p className="text-gray-300 mt-2">
                  Company profile setup
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <div className="space-y-8">
              {/* Company Name */}
              <div>
                <Label className="text-base font-semibold text-black">
                  Company Name
                </Label>

                <div className="relative mt-3">
                  <Building2
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) =>
                      setCompanyName(e.target.value)
                    }
                    className="h-14 pl-12 rounded-2xl border-gray-200 focus-visible:ring-[#34C6B3]"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#f4f7f7] rounded-3xl p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#34C6B3] p-4 rounded-2xl">
                    <BriefcaseBusiness
                      className="text-black"
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl">
                      {companyName || "Your Company"}
                    </h3>

                    <p className="text-gray-500">
                      Company will appear like this
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate("/admin/companies")
                  }
                  className="h-14 rounded-2xl px-8 border-gray-300 text-base"
                >
                  <ArrowLeft size={18} />
                  Back
                </Button>

                <Button
                  onClick={registerNewCompany}
                  disabled={loading}
                  className="h-14 rounded-2xl px-8 bg-[#34C6B3] hover:bg-black text-black hover:text-white text-base font-semibold flex-1"
                >
                  {loading
                    ? "Creating..."
                    : "Continue Setup"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;