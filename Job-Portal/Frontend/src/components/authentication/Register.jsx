import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

import {
  Mail,
  Lock,
  User,
  Phone,
  Upload,
  BriefcaseBusiness,
  Eye,
  EyeOff,
} from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    // Password Match Validation
    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Password Length Validation
    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";

      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#EAF7F5] via-white to-[#dff7f3]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

        
          <div className="hidden lg:flex flex-col justify-center">

            <div className="mb-6 inline-flex items-center gap-3 bg-[#34C6B3]/10 border border-[#34C6B3]/20 rounded-full px-5 py-3 w-fit">
              <BriefcaseBusiness className="text-[#34C6B3]" />
              <span className="font-semibold text-[#34C6B3]">
                Join HireLoom
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight text-black">
              Start Your
              <span className="text-[#34C6B3]"> Career Journey </span>
              With Us.
            </h1>

            <p className="text-gray-600 text-lg leading-8 mt-6 max-w-xl">
              Create your account and discover amazing job opportunities,
              connect with recruiters, and build your professional future.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <div className="bg-white shadow-md border border-gray-100 rounded-3xl px-6 py-5 w-40">
                <h2 className="text-3xl font-bold text-[#34C6B3]">
                  10K+
                </h2>

                <p className="text-gray-500 mt-1">
                  Active Jobs
                </p>
              </div>

              <div className="bg-white shadow-md border border-gray-100 rounded-3xl px-6 py-5 w-40">
                <h2 className="text-3xl font-bold text-[#34C6B3]">
                  5K+
                </h2>

                <p className="text-gray-500 mt-1">
                  Companies
                </p>
              </div>

              <div className="bg-white shadow-md border border-gray-100 rounded-3xl px-6 py-5 w-40">
                <h2 className="text-3xl font-bold text-[#34C6B3]">
                  20K+
                </h2>

                <p className="text-gray-500 mt-1">
                  Candidates
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="w-full">

            <form
              onSubmit={submitHandler}
              className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-[2rem] p-6 sm:p-10"
            >

              {/* Heading */}
              <div className="text-center mb-8">

                <h1 className="text-4xl font-bold text-black">
                  Create Account
                </h1>

                <p className="text-gray-500 mt-3">
                  Register now and start applying for jobs.
                </p>
              </div>

              {/* Fullname */}
              <div className="mb-5">
                <Label className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 mt-2 focus-within:border-[#34C6B3]">
                  <User className="text-[#34C6B3]" size={20} />

                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <Label className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 mt-2 focus-within:border-[#34C6B3]">
                  <Mail className="text-[#34C6B3]" size={20} />

                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="johndoe@gmail.com"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <Label className="text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 mt-2 focus-within:border-[#34C6B3]">
                  <Lock className="text-[#34C6B3]" size={20} />

                  <Input
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="********"
                    className="border-none shadow-none focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <Label className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </Label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 mt-2 focus-within:border-[#34C6B3]">
                  <Lock className="text-[#34C6B3]" size={20} />

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={input.confirmPassword}
                    name="confirmPassword"
                    onChange={changeEventHandler}
                    placeholder="********"
                    className="border-none shadow-none focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>

                {/* Match Message */}
                {input.confirmPassword && (
                  <p
                    className={`text-sm mt-2 ${
                      input.password === input.confirmPassword
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {input.password === input.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-5">
                <Label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </Label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 mt-2 focus-within:border-[#34C6B3]">
                  <Phone className="text-[#34C6B3]" size={20} />

                  <Input
                    type="tel"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="+92 300 1234567"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-6">

                <Label className="text-sm font-semibold text-gray-700">
                  Select Role
                </Label>

                <RadioGroup className="grid grid-cols-2 gap-4 mt-4">

                  <label
                    className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                      input.role === "Student"
                        ? "bg-[#34C6B3] text-white border-[#34C6B3]"
                        : "border-gray-200 hover:border-[#34C6B3]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Job Seeker
                      </span>

                      <Input
                        type="radio"
                        name="role"
                        value="Student"
                        checked={input.role === "Student"}
                        onChange={changeEventHandler}
                        className="w-4 h-4"
                      />
                    </div>
                  </label>

                  <label
                    className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                      input.role === "Recruiter"
                        ? "bg-[#34C6B3] text-white border-[#34C6B3]"
                        : "border-gray-200 hover:border-[#34C6B3]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Employer
                      </span>

                      <Input
                        type="radio"
                        name="role"
                        value="Recruiter"
                        checked={input.role === "Recruiter"}
                        onChange={changeEventHandler}
                        className="w-4 h-4"
                      />
                    </div>
                  </label>

                </RadioGroup>
              </div>

              {/* Upload */}
              <div className="mb-8">

                <Label className="text-sm font-semibold text-gray-700">
                  Profile Photo
                </Label>

                <label className="flex items-center gap-3 border-2 border-dashed border-[#34C6B3]/40 rounded-2xl p-5 mt-3 cursor-pointer hover:bg-[#34C6B3]/5 transition-all">

                  <Upload className="text-[#34C6B3]" />

                  <span className="text-gray-600 text-sm">
                    Upload your profile picture
                  </span>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={ChangeFilehandler}
                    className="hidden"
                  />
                </label>

                {input.file && (
                  <p className="text-sm text-[#34C6B3] mt-3">
                    Selected: {input.file.name}
                  </p>
                )}
              </div>


              {/* Button */}
              {loading ? (
                <button
                  disabled
                  className="w-full bg-[#34C6B3]/70 text-white py-4 rounded-2xl font-semibold"
                >
                  Creating Account...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#34C6B3] hover:bg-black text-black hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Create Account
                </button>
              )}

              {/* Login */}
              <p className="text-center text-gray-500 mt-7">

                Already have an account?

                <Link
                  to="/login"
                  className="text-[#34C6B3] font-semibold ml-2 hover:underline"
                >
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
