// src/routes/appRoutes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import React from "react";
// import { ClientDashboard } from "../pages/ClientDashboard";
import { Role } from "../constants/roles";
import { FreelancerDashboard } from "../pages/Freelancer-dashboard";
import { ProfileCreation } from "../pages/profile-creation";
import { JobsPage } from "../pages/JobPage";
import { SubmitProposalPage } from "../pages/Proposal-submition";
import { PostNewJob } from "../pages/PostNewJob";
import { PageNotFound } from "../pages/404";

// Lazy-loaded components
const SkillBridgeLandingPage = lazy(() => import("../pages/SkillBridgeLanding"));
const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ClientDashboard = lazy(() => import("../pages/ClientDashboard"));

export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />, // Wrap with layout
    children: [
      {
        path: "/",
        element: <SkillBridgeLandingPage />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute allowedRoles={[Role.FREELANCER, Role.CLIENT]}>
            <ProfileCreation />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <PrivateRoute allowedRoles={[Role.CLIENT, Role.FREELANCER]}>
            <JobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <PrivateRoute allowedRoles={[Role.CLIENT, Role.FREELANCER]}>
            <PostNewJob />
          </PrivateRoute>
        ),
      },

      {
        path: "/prposal",
        element: (
          <PrivateRoute allowedRoles={[Role.FREELANCER]}>
            <SubmitProposalPage />
          </PrivateRoute>
        ),
      },

      // Add more layout-based routes here
    ],
  },
  {
    path: "/freelancer/dashboard/:id",
    element: (
      <PrivateRoute allowedRoles={[Role.FREELANCER]}>
        <FreelancerDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/client/dashboard/:id",
    element: (
      <PrivateRoute allowedRoles={[Role.CLIENT]}>
        <ClientDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
