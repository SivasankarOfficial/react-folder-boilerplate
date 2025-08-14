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
import { mockFreelancerData } from "../constants/freelancer.const";
import { useNavigate } from "react-router-dom";
export const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const StatCard = ({ icon: Icon, title, value, color = "text-gray-600" }: any) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className="h-8 w-8 text-cyan-600" />
      </div>
    </div>
  );

  const ProposalCard = ({ proposal }: any) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{proposal.jobTitle}</h3>
          <p className="text-gray-600">Client: {proposal.client}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            proposal.status === "SUBMITTED"
              ? "bg-yellow-100 text-yellow-800"
              : proposal.status === "ACCEPTED"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {proposal.status}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Proposed: ${proposal.proposedBudget}</span>
        <span>Submitted: {proposal.submittedAt}</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm">
          <Eye className="h-4 w-4" />
          View Details
        </button>
        {proposal.status === "SUBMITTED" && (
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm">
            <Edit className="h-4 w-4" />
            Edit Proposal
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Freelancer Dashboard</h1>
              <p className="text-gray-600">Manage your projects and find new opportunities</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-cyan-600 text-cyan-600 rounded-md hover:bg-cyan-50">
                <Search className="h-4 w-4" />
                Browse Jobs
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
              >
                <User className="h-4 w-4" />
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", name: "Overview", icon: TrendingUp },
              { id: "proposals", name: "My Proposals", icon: FileText },
              { id: "projects", name: "Active Projects", icon: Briefcase },
              { id: "earnings", name: "Earnings", icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-600"
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
                title="Active Projects"
                value={mockFreelancerData.stats.activeProjects}
                color="text-cyan-600"
              />
              <StatCard
                icon={DollarSign}
                title="Total Earnings"
                value={`$${mockFreelancerData.stats.totalEarnings.toLocaleString()}`}
                color="text-green-600"
              />
              <StatCard
                icon={CheckCircle}
                title="Completed Jobs"
                value={mockFreelancerData.stats.completedJobs}
                color="text-indigo-600"
              />
              <StatCard
                icon={Star}
                title="Average Rating"
                value={mockFreelancerData.stats.averageRating}
                color="text-amber-600"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50">
                  <Search className="h-6 w-6 text-cyan-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Browse Jobs</div>
                    <div className="text-sm text-gray-500">Find new opportunities</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50">
                  <User className="h-6 w-6 text-cyan-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Update Profile</div>
                    <div className="text-sm text-gray-500">Improve your visibility</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50">
                  <Settings className="h-6 w-6 text-cyan-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Settings</div>
                    <div className="text-sm text-gray-500">Manage preferences</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Proposal accepted for "WordPress Plugin Development"</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">New message from client for "E-learning Platform"</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Star className="h-5 w-5 text-amber-600" />
                  <span className="text-sm text-gray-700">Received 5-star review from Tech Corp</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "proposals" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Proposals</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search proposals..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
            <div className="grid gap-6">
              {mockFreelancerData.proposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
            {mockFreelancerData.activeProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">Client: {project.client}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">${project.budget}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cyan-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Due: {project.dueDate}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700">
                      Update Progress
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                      Message Client
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
