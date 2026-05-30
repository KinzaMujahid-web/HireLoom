import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User2,
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      }

      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="w-full bg-[#34C6B3] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <Link to={"/"} className="flex items-center gap-2">
              <BriefcaseBusiness className="text-black w-5 h-5" />

              <h1 className="text-xl font-semibold text-black">
                HireLoom
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-6 text-sm font-medium text-black">
              {user && user.role === "Recruiter" ? (
                <>
                  <li>
                    <Link to={"/admin/adminDashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/admin/companies"}>Companies</Link>
                  </li>

                  <li>
                    <Link to={"/admin/jobs"}>Jobs</Link>
                  </li>
                
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/Home"}>Home</Link>
                  </li>


                  <li>
                   <Link to={"/Jobs"}>Jobs</Link>
               
                  </li>

                  <li>
                    <Link to={"/Creator"}>About Us</Link>
                  </li>
                </>
              )}
            </ul>

            {/* Desktop Auth */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to={"/login"}>
                  <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-all">
                    Login
                  </button>
                </Link>

                <Link to={"/register"}>
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all">
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border border-black">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80 bg-[#34C6B3] text-black border-none">
                  <div className="flex items-center gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                      />
                    </Avatar>

                    <div>
                      <h3 className="font-medium text-black">
                        {user?.fullname}
                      </h3>

                      <p className="text-sm text-black">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-black">
                    {user && user.role === "Student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />

                        <Button
                          variant="link"
                          className="text-black hover:text-white"
                        >
                          <Link to={"/Profile"}>Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />

                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-black hover:text-white"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-3">
            {/* If User Logged In */}
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border border-black w-9 h-9">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-72 bg-[#34C6B3] text-black border-none">
                  <div className="flex items-center gap-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                      />
                    </Avatar>

                    <div>
                      <h3 className="font-medium text-black">
                        {user?.fullname}
                      </h3>

                      <p className="text-sm text-black">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-3 text-black">
                    {user && user.role === "Student" && (
                      <div className="flex items-center gap-2">
                        <User2 />

                        <Button
                          variant="link"
                          className="text-black hover:text-white p-0"
                        >
                          <Link to={"/Profile"}>Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <LogOut />

                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-black hover:text-white p-0"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              /* If User Logged Out */
              <Link to={"/login"}>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all">
                  Get Started
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(!open)}>
              {open ? (
                <X className="text-black w-6 h-6" />
              ) : (
                <Menu className="text-black w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-4 text-black font-medium">
            {user && user.role === "Recruiter" ? (
              <>
               <Link to={"/admin/adminDashboard"}>Dashboard</Link>
                <Link to={"/admin/companies"}>Companies</Link>
                <Link to={"/admin/jobs"}>Jobs</Link>
              </>
            ) : (
              <>
                <Link to={"/Home"}>Home</Link>
                <Link to={"/Jobs"}>Jobs</Link>
                <Link to={"/Creator"}>About Us</Link>
               
              </>
            )}

            {/* If User Logout */}
            {!user && (
              <div className="flex flex-col gap-3 mt-2">
                <Link to={"/login"}>
                  <button className="w-full bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-all">
                    Login
                  </button>
                </Link>

                <Link to={"/register"}>
                  <button className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all">
                    Register
                  </button>
                </Link>
              </div>
            )}
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;