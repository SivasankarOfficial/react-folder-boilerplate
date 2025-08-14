import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Star,
  Send,
  FileText,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock data based on schema
export const mockJobs: any = [
  {
    id: "1",
    title: "Full Stack Web Developer for E-commerce Platform",
    description:
      "Looking for an experienced full-stack developer to build a modern e-commerce platform using React, Node.js, and PostgreSQL. The project includes user authentication, payment integration, inventory management, and admin dashboard.",
    budget: 5000,
    category: "Web Development",
    status: "OPEN",
    createdAt: "2025-07-25T10:00:00Z",
    postedBy: {
      name: "Sarah Johnson",
      profile: {
        profileImage: null,
      },
    },
    proposals: [
      { id: "1", status: "SUBMITTED" },
      { id: "2", status: "SUBMITTED" },
      { id: "3", status: "ACCEPTED" },
    ],
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description:
      "Need a talented designer to create wireframes and high-fidelity designs for a fitness tracking mobile app. Must have experience with mobile design patterns and accessibility standards.",
    budget: 2500,
    category: "Design",
    status: "OPEN",
    createdAt: "2025-07-28T14:30:00Z",
    postedBy: {
      name: "Michael Chen",
      profile: {
        profileImage: null,
      },
    },
    proposals: [
      { id: "4", status: "SUBMITTED" },
      { id: "5", status: "REJECTED" },
    ],
  },
  {
    id: "3",
    title: "Content Writing for Tech Blog",
    description:
      "Seeking a technical writer to create 10 in-depth articles about emerging technologies, AI, and software development trends. Each article should be 1500-2000 words with proper research and citations.",
    budget: 1200,
    category: "Writing",
    status: "IN_PROGRESS",
    createdAt: "2025-07-20T09:15:00Z",
    postedBy: {
      name: "Emily Rodriguez",
      profile: {
        profileImage: null,
      },
    },
    proposals: [{ id: "6", status: "ACCEPTED" }],
  },
];
interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  createdAt: string; // or Date, depending on your mock data
}

export const JobsPage = ({ onViewJob, onSubmitProposal }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<any>("newest");

  const categories = ["Web Development", "Design", "Writing", "Marketing", "Data Science"];

  const filteredJobs: Job[] = mockJobs
    .filter(
      (job: Job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job: Job) => selectedCategory === "" || job.category === selectedCategory)
    .sort((a: Job, b: Job) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "budget-high") return b.budget - a.budget;
      if (sortBy === "budget-low") return a.budget - b.budget;
      return 0;
    });

  const getStatusColor = (status: any) => {
    switch (status) {
      case "OPEN":
        return "text-green-600 bg-green-100";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-100";
      case "COMPLETED":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Project</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and expertise</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or keywords..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job: any) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.replace("_", " ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted {formatDate(job.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {job.postedBy.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">${job.budget.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Fixed Price</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{job.category}</span>
                  <span className="text-sm text-gray-600">
                    {job.proposals.length} proposal{job.proposals.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onViewJob(job)}
                    className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    View Details
                  </button>
                  {job.status === "OPEN" && (
                    <button
                      onClick={() => onSubmitProposal(job)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Submit Proposal
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No jobs found</h3>
            <p className="text-gray-400">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
