// Mock data
export const mockClientData: any = {
  stats: {
    activeJobs: 5,
    totalProposals: 23,
    completedProjects: 12,
    totalSpent: 15750,
  },
  jobs: [
    {
      id: "1",
      title: "E-commerce Website Development",
      description: "Need a full-stack developer to build an e-commerce platform",
      budget: 2500,
      category: "Web Development",
      status: "OPEN",
      proposalCount: 8,
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design",
      description: "Looking for a designer to create mobile app interfaces",
      budget: 1200,
      category: "Design",
      status: "IN_PROGRESS",
      proposalCount: 5,
      createdAt: "2024-01-18",
    },
  ],
  activeProjects: [
    {
      id: "1",
      title: "Logo Design for Startup",
      freelancer: "Sarah Johnson",
      budget: 800,
      progress: 75,
      dueDate: "2024-02-15",
    },
  ],
};

const mockFreelancerData: any = {
  stats: {
    activeProjects: 3,
    totalEarnings: 8400,
    completedJobs: 15,
    averageRating: 4.8,
  },
  proposals: [
    {
      id: "1",
      jobTitle: "React Frontend Development",
      client: "Tech Corp",
      proposedBudget: 1800,
      status: "SUBMITTED",
      submittedAt: "2024-01-22",
    },
    {
      id: "2",
      jobTitle: "WordPress Plugin Development",
      client: "Digital Agency",
      proposedBudget: 950,
      status: "ACCEPTED",
      submittedAt: "2024-01-20",
    },
  ],
  activeProjects: [
    {
      id: "1",
      title: "E-learning Platform",
      client: "EduTech Solutions",
      budget: 3200,
      progress: 60,
      dueDate: "2024-02-28",
    },
    {
      id: "2",
      title: "CRM Dashboard",
      client: "Business Solutions",
      budget: 2100,
      progress: 40,
      dueDate: "2024-03-10",
    },
  ],
};
