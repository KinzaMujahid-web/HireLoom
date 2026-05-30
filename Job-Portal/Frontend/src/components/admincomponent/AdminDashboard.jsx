import React, { useEffect, useMemo } from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { setCompanies } from "@/redux/companyslice";
import {
  BriefcaseBusiness,
  Users,
  Building2,
  BarChart2,
  Plus,
} from "lucide-react";

import { Bar } from "react-chartjs-2";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const adminJobs = useSelector((state) => state.jobs?.allAdminJobs ?? []);
  const companies = useSelector((state) => state.company?.companies ?? []);

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5011/api/job/getadminjobs",
          { withCredentials: true }
        );
        if (res.data?.status) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5011/api/company/get",
          { withCredentials: true }
        );
        if (res.data?.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, [dispatch]);

  const totalJobs = adminJobs.length;
  const activeJobs = adminJobs.filter((j) => j.isActive).length;

  const allApplications = useMemo(
    () => adminJobs.flatMap((job) => job.applications || []),
    [adminJobs]
  );
  const totalApplicants = allApplications.length;

  const totalCompanies = companies.length;


  const recentJobs = useMemo(
    () =>
      [...adminJobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    [adminJobs]
  );

  /* CHART DATA */
  const jobsByMonth = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const counts = Array(12).fill(0);

    adminJobs.forEach((job) => {
      const m = new Date(job.createdAt).getMonth();
      counts[m]++;
    });

    return {
      labels: months,
      data: counts,
    };
  }, [adminJobs]);


  const stats = [
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: BriefcaseBusiness,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Applications",
      value: totalApplicants,
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Total Companies",
      value: totalCompanies,
      icon: Building2,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Total Jobs Posted",
      value: totalJobs,
      icon: BarChart2,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Employer Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome {user?.fullname || "Admin"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${s.iconBg} flex items-center justify-center`}
                >
                  <Icon size={20} className={s.iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* YOUR ACTIVE JOBS */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Your Active Jobs
              </h2>
              <button
                onClick={() => navigate("/admin/jobs")}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                View All
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {recentJobs.length === 0 ? (
                <p className="text-sm text-gray-400">No jobs posted yet.</p>
              ) : (
                recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      {job.isActive && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {job.location}
                      {job.jobType ? ` • ${job.jobType}` : ""}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {(job.applications || []).length} applicants
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="text-xs text-blue-600 hover:underline font-medium"
                      >
                        View Applications
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


          {/* BAR */}
          <div className="bg-white p-6 rounded-2xl">
            <h2 className="font-bold mb-4">Jobs per Month</h2>
            <Bar
              data={{
                labels: jobsByMonth.labels,
                datasets: [
                  {
                    label: "Jobs",
                    data: jobsByMonth.data,
                    backgroundColor: "#34C6B3",
                  },
                ],
              }}
            />
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-xl border border-gray-100 p-6 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => navigate("/admin/companies")}
          >
            <h2 className="text-base font-semibold text-gray-900">
              Company Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your company information and branding
            </p>
          </div>

          <div
            className="bg-white rounded-xl border border-gray-100 p-6 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => navigate("/admin/jobs")}
          >
            <h2 className="text-base font-semibold text-gray-900">
              Manage Jobs
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Edit, close, or delete your job postings
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;