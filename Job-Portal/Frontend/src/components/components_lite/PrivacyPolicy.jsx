import React from "react";
import Navbar from "../components_lite/Navbar";
import {
  ShieldCheck,
  Database,
  Lock,
  Users,
  RefreshCcw,
  Mail,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f7]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HERO SECTION */}
        <div className="bg-black rounded-3xl overflow-hidden shadow-xl">

          <div className="px-8 md:px-12 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10">

            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">

                <div className="bg-[#34C6B3] p-4 rounded-2xl">
                  <ShieldCheck className="text-black" size={34} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Privacy Policy
                </h1>
              </div>

              <p className="text-gray-300 text-lg leading-8">
                Your privacy is important to us. This policy explains how
                Job Portal collects, uses, and protects your personal
                information while using our platform.
              </p>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-[#34C6B3] rounded-3xl px-8 py-8 text-center min-w-62.5 shadow-lg">
              <h2 className="text-5xl font-bold text-black">100%</h2>
              <p className="text-black font-semibold mt-2">
                Secure & Protected
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10 grid gap-8">

          {/* SECTION */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <Users className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                1. Introduction
              </h2>
            </div>

            <p className="text-gray-600 leading-8">
              This Privacy Policy outlines how we collect, use, and protect
              your information when you use our Job Portal platform.
            </p>
          </div>

          {/* INFORMATION WE COLLECT */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <Database className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                2. Information We Collect
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* PERSONAL */}
              <div className="bg-[#f4f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Personal Information
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li>• Full Name</li>
                  <li>• Email Address</li>
                  <li>• Phone Number</li>
                  <li>• Resume / CV</li>
                </ul>
              </div>

              {/* USAGE */}
              <div className="bg-[#f4f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Usage Data
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li>• IP Address</li>
                  <li>• Browser Type</li>
                  <li>• Pages Visited</li>
                  <li>• Time Spent on Pages</li>
                </ul>
              </div>

            </div>
          </div>

          {/* HOW WE USE */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <Lock className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                3. How We Use Your Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              {[
                "Provide and maintain our services",
                "Notify users about updates",
                "Customer support",
                "Improve platform performance",
                "Monitor usage activity",
                "Prevent technical issues",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f4f7f7] rounded-2xl p-5 text-gray-700 font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <ShieldCheck className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                4. Data Security
              </h2>
            </div>

            <p className="text-gray-600 leading-8">
              We implement appropriate technical and organizational security
              measures to protect your personal information from unauthorized
              access, misuse, or disclosure.
            </p>
          </div>

          {/* SHARING */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <Users className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                5. Sharing Your Information
              </h2>
            </div>

            <ul className="space-y-4 text-gray-600">
              <li>
                • We do not sell or rent your personal information.
              </li>

              <li>
                • We may share data with trusted service providers.
              </li>

              <li>
                • Information may be shared if required by law.
              </li>
            </ul>
          </div>

          {/* RIGHTS */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <RefreshCcw className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                6. Your Rights
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-[#f4f7f7] p-6 rounded-2xl text-center">
                <h3 className="font-bold text-black mb-2">
                  Access
                </h3>

                <p className="text-gray-600 text-sm">
                  Access your personal information
                </p>
              </div>

              <div className="bg-[#f4f7f7] p-6 rounded-2xl text-center">
                <h3 className="font-bold text-black mb-2">
                  Correction
                </h3>

                <p className="text-gray-600 text-sm">
                  Request correction of your data
                </p>
              </div>

              <div className="bg-[#f4f7f7] p-6 rounded-2xl text-center">
                <h3 className="font-bold text-black mb-2">
                  Deletion
                </h3>

                <p className="text-gray-600 text-sm">
                  Request deletion of your information
                </p>
              </div>

            </div>
          </div>

          {/* CHANGES */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C6B3]/20 p-3 rounded-xl">
                <RefreshCcw className="text-[#34C6B3]" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-black">
                7. Changes to This Policy
              </h2>
            </div>

            <p className="text-gray-600 leading-8">
              We may update this Privacy Policy periodically. Any changes
              will be posted on this page with updated information.
            </p>
          </div>

          {/* CONTACT */}
          <div className="bg-black rounded-3xl p-10 text-center shadow-xl">

            <div className="bg-[#34C6B3] p-4 rounded-2xl w-fit mx-auto mb-6">
              <Mail className="text-black" size={30} />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Contact Us
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto leading-8">
              If you have any questions regarding this Privacy Policy,
              feel free to contact our support team anytime.
            </p>

            <div className="mt-6 inline-block bg-[#34C6B3] text-black font-bold px-6 py-3 rounded-2xl">
              support@jobportal.com
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;