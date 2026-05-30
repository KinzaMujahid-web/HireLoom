import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  BriefcaseBusiness,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);


  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      return toast.error("Please select a role");
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        toast.success(res.data.message);


        if (res.data.user.role === "Recruiter") {
          navigate("/admin/Admindashboard");
        }


        else {
          navigate("/");
        }
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
      if (user.role === "Recruiter") {
        navigate("/admin/Admindashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#EAF7F5] via-white to-[#EAF7F5]">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[35px] overflow-hidden shadow-2xl border border-[#34C6B3]/20">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center bg-[#34C6B3] text-black p-12 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-black text-white p-4 rounded-2xl">
                  <BriefcaseBusiness size={34} />
                </div>

                <h1 className="text-4xl font-extrabold">
                  HireLoom
                </h1>
              </div>

              <h2 className="text-5xl font-black leading-tight mb-6">
                Welcome
                <br />
                Back
              </h2>

              <p className="text-lg leading-8 text-black/80">
                Login to continue exploring amazing opportunities,
                manage applications, and grow your professional career.
              </p>

              <div className="mt-12 space-y-5">
                <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl">
                  Explore thousands of verified jobs
                </div>

                <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl">
                  Apply with one click
                </div>

                <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl">
                  Secure and modern platform
                </div>
              </div>
            </div>
          </div>


          <div className="w-full px-5 sm:px-8 md:px-12 py-10 md:py-14">

            {/* Mobile Heading */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <BriefcaseBusiness className="text-[#34C6B3]" />
                <h1 className="text-3xl font-extrabold">
                  HireLoom
                </h1>
              </div>

              <p className="text-gray-600">
                Login to continue your journey
              </p>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-black">
                Sign In
              </h1>

              <p className="text-gray-500 mt-2">
                Please login to your account
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="space-y-6"
            >

              {/* Email */}
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>

                <div className="mt-2 flex items-center bg-[#F4F7F7] border border-gray-200 rounded-2xl px-4 h-14 focus-within:border-[#34C6B3] transition-all">
                  <Mail className="text-gray-400" size={20} />

                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="johndoe@gmail.com"
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <div className="mt-2 flex items-center bg-[#F4F7F7] border border-gray-200 rounded-2xl px-4 h-14 focus-within:border-[#34C6B3] transition-all">
                  <LockKeyhole
                    className="text-gray-400"
                    size={20}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Enter password"
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="text-gray-500 hover:text-black transition-all"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>


                </div>
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#34C6B3] hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

              </div>

              {/* ROLE */}
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Select Role
                </Label>

                <RadioGroup className="grid grid-cols-2 gap-4 mt-3">

                  {/* STUDENT */}
                  <label
                    className={`flex items-center justify-center gap-3 rounded-2xl border-2 cursor-pointer py-4 transition-all ${input.role === "Student"
                      ? "border-[#34C6B3] bg-[#34C6B3]/10"
                      : "border-gray-200 bg-white"
                      }`}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="Student"
                      checked={input.role === "Student"}
                      onChange={changeEventHandler}
                      className="hidden"
                    />

                    <span className="font-semibold">
                      Job Seeker
                    </span>
                  </label>

                  {/* Employer */}
                  <label
                    className={`flex items-center justify-center gap-3 rounded-2xl border-2 cursor-pointer py-4 transition-all ${input.role === "Recruiter"
                      ? "border-[#34C6B3] bg-[#34C6B3]/10"
                      : "border-gray-200 bg-white"
                      }`}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="Recruiter"
                      checked={input.role === "Recruiter"}
                      onChange={changeEventHandler}
                      className="hidden"
                    />

                    <span className="font-semibold">
                      Employer
                    </span>
                  </label>
                </RadioGroup>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300 ${loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#34C6B3] hover:bg-black hover:text-white text-black"
                  }`}
              >
                {/* Login */}
                {loading ? "Logging In..." : "Login"}
              </button>

              {/* REGISTER */}
              <div className="text-center pt-2">
                <p className="text-gray-600">

                  Don't have an account?
                </p>

                <Link to="/register">
                  <button
                    type="button"
                    className="mt-4 w-full border-2 border-[#34C6B3] text-[#34C6B3] hover:bg-[#34C6B3] hover:text-black h-14 rounded-2xl font-bold transition-all duration-300"
                  >
                    Create New Account
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
