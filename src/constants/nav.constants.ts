import { Briefcase, MessageSquare, Users } from "lucide-react";

// Top-level navigation items (role defined once per group)
export const navItems: any[] = [
  {
    name: "Find Work",
    href: "#",
    hasDropdown: true,
    role: "FREELANCER", // entire group is for freelancer
    dropdown: [
      { name: "Browse Jobs", icon: Briefcase, href: "#" },
      { name: "Saved Jobs", icon: Users, href: "#" },
      { name: "My Proposals", icon: MessageSquare, href: "#" },
    ],
  },
  {
    name: "Find Talent",
    href: "#",
    hasDropdown: true,
    role: "CLIENT", // entire group is for client
    dropdown: [
      { name: "Post a Job", icon: Briefcase, href: "#" },
      { name: "Browse Freelancers", icon: Users, href: "#" },
      { name: "My Hires", icon: MessageSquare, href: "#" },
    ],
  },
  {
    name: "Browse Categories",
    href: "#",
    hasDropdown: false,
    role: "FREELANCER", // or include multiple roles with role: ["freelancer", "client"]
  },
  {
    name: "How it Works",
    href: "#",
    hasDropdown: false,
    role: "FREELANCER",
  },
];
