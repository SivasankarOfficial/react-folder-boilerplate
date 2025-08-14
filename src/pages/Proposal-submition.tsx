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

export const SubmitProposalPage = ({ job, onBack, onSubmit }: any) => {
  const [proposal, setProposal] = useState({
    content: "",
    proposedBudget: job?.budget || 0,
    timeline: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!proposal.content.trim()) {
      newErrors.content = "Proposal description is required";
    } else if (proposal.content.length < 100) {
      newErrors.content = "Proposal should be at least 100 characters long";
    }

    if (!proposal.proposedBudget || proposal.proposedBudget <= 0) {
      newErrors.proposedBudget = "Please enter a valid budget";
    }

    if (!proposal.timeline.trim()) {
      newErrors.timeline = "Project timeline is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const proposalData = {
      id: Date.now().toString(),
      content: proposal.content,
      proposedBudget: proposal.proposedBudget,
      timeline: proposal.timeline,
      coverLetter: proposal.coverLetter,
      jobId: job.id,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
    };

    onSubmit(proposalData);
    setIsSubmitting(false);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">Job not found</h3>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-700 mb-4 flex items-center gap-2">
            ← Back to Jobs
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Proposal</h1>
          <p className="text-gray-600">Craft a compelling proposal to win this project</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Job Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.category}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Budget</span>
                  <div className="text-xl font-bold text-indigo-600">${job.budget.toLocaleString()}</div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Posted by</span>
                  <div className="font-medium">{job.postedBy.name}</div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Posted</span>
                  <div className="text-sm">{new Date(job.createdAt).toLocaleDateString()}</div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Proposals</span>
                  <div className="text-sm">{job.proposals.length} submitted</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
              </div>
            </div>
          </div>

          {/* Proposal Form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Your Proposal</h3>

                {/* Cover Letter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Introduce yourself and explain why you're the perfect fit for this project..."
                    value={proposal.coverLetter}
                    onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                  />
                </div>

                {/* Proposal Content */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Proposal <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.content ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Describe your approach to this project, your relevant experience, and what makes your proposal unique. Include specific details about how you'll deliver the requirements..."
                    value={proposal.content}
                    onChange={(e) => setProposal({ ...proposal, content: e.target.value })}
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                  <p className="mt-1 text-sm text-gray-500">{proposal.content.length} characters (minimum 100)</p>
                </div>

                {/* Budget and Timeline */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Bid <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.proposedBudget ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="0"
                        value={proposal.proposedBudget}
                        onChange={(e) => setProposal({ ...proposal, proposedBudget: Number(e.target.value) })}
                      />
                    </div>
                    {errors.proposedBudget && <p className="mt-1 text-sm text-red-600">{errors.proposedBudget}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.timeline ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="e.g., 2-3 weeks"
                      value={proposal.timeline}
                      onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
                    />
                    {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Proposal
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
