import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Eye,
  Users,
  DollarSign,
  Star,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Award,
  User,
  FileText,
  Settings,
} from "lucide-react";
import { mockClientData } from "../constants/client.const";

// Client Dashboard Component
const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const StatCard = ({ icon: Icon, title, value, color = "text-gray-600" }: any) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className="h-8 w-8 text-indigo-600" />
      </div>
    </div>
  );

  const JobCard = ({ job }: any) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600 mt-1">{job.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.status === "OPEN"
              ? "bg-green-100 text-green-800"
              : job.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {job.status.replace("_", " ")}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Budget: ${job.budget}</span>
        <span>{job.proposalCount} proposals</span>
        <span>{job.category}</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
          <Eye className="h-4 w-4" />
          View Details
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm">
          <Edit className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="text-gray-600">Manage your projects and find freelancers</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", name: "Overview", icon: TrendingUp },
              { id: "jobs", name: "My Jobs", icon: Briefcase },
              { id: "projects", name: "Active Projects", icon: FileText },
              { id: "reviews", name: "Reviews", icon: Star },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Briefcase}
                title="Active Jobs"
                value={mockClientData.stats.activeJobs}
                color="text-indigo-600"
              />
              <StatCard
                icon={Users}
                title="Total Proposals"
                value={mockClientData.stats.totalProposals}
                color="text-cyan-600"
              />
              <StatCard
                icon={CheckCircle}
                title="Completed Projects"
                value={mockClientData.stats.completedProjects}
                color="text-green-600"
              />
              <StatCard
                icon={DollarSign}
                title="Total Spent"
                value={`$${mockClientData.stats.totalSpent.toLocaleString()}`}
                color="text-amber-600"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Project "Logo Design" completed by Sarah Johnson</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">New proposal received for "E-commerce Website"</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Posted Jobs</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
            <div className="grid gap-6">
              {mockClientData.jobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
            {mockClientData.activeProjects.map((project: any) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">Freelancer: {project.freelancer}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">${project.budget}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Due: {project.dueDate}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                      Message
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
