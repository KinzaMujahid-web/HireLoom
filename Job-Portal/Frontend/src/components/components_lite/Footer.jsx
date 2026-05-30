import React from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#34C6B3] text-black pt-10 pb-8 px-6">
      <div className="max-w-7xl  mx-10">

       
        <div className="flex flex-wrap justify-between">

         
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BriefcaseBusiness className="w-8 h-8" />

              <h1 className="text-xl font-bold">
                HireLoom
              </h1>
            </div>

            <p className=" text-black/80 max-w-md">
              Connecting talented professionals with amazing opportunities.
              Your dream job is just a click away.
            </p>

            {/* Contact Info */}
            <div className="mt-8 flex flex-col gap-3">

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5" />

                <span>
                  contact@jobportal.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5" />

                <span>
                  +92 300 1234567
                </span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5" />

                <span >
                  Rawalpindi, Pakistan
                </span>
              </div>
            </div>
          </div>




          {/* Job Seekers */}
          <div>
            <h2 className="text-xl font-bold mb-5">
              For Job Seekers
            </h2>

            <div className="flex flex-col gap-4 text-lg">
              <h3>Browse Jobs</h3>
              <h3>Create Account</h3>
              <h3>Edit Profile</h3>
              <h3>Submit Applications</h3>
            </div>
          </div>

          {/* Employers */}
          <div>
            <h2 className="text-xl font-bold mb-5">
              For Employers
            </h2>

            <div className="flex flex-col gap-4 text-lg">
             <h3>Post a Job</h3>
              <h3> Employer Signup</h3>
              <h3>Create Company</h3>
              <h3> Manage Jobs</h3>
      
            </div>
          </div>
        </div>

     
        <div className="border-t border-black/20 my-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-base text-black/70 text-center md:text-left">
            © 2026 HireLoom. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-base">
            <Link
              to={"/PrivacyPolicy"}
              className="hover:text-white transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <span>|</span>

            <Link
              to={"/TermsofService"}
              className="hover:text-white transition-all duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
