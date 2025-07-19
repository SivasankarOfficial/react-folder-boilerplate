import { lazy } from "react";
import { RouteObject } from "react-router-dom";
// import PrivateRoute from '../components/PrivateRoute';

// const Home = lazy(() => import('../pages/Home'));
// const About = lazy(() => import('../pages/About'));
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// const Dashboard = lazy(() => import('../pages/Dashboard'));
// const UserProfile = lazy(() => import('../pages/UserProfile'));
// const NotFound = lazy(() => import('../pages/NotFound'));

export const appRoutes: RouteObject[] = [
  //   { path: '/', element: <Home /> },
  //   { path: '/about', element: <About /> },
  //   { path: '/product/:id', element: <ProductDetail /> },
  //   {
  //     path: '/dashboard',
  //     element: (
  //       <PrivateRoute allowedRoles={['admin']}>
  //         <Dashboard />
  //       </PrivateRoute>
  //     ),
  //   },
  //   {
  //     path: '/profile',
  //     element: (
  //       <PrivateRoute allowedRoles={['admin', 'user']}>
  //         <UserProfile />
  //       </PrivateRoute>
  //     ),
  //   },
  //   { path: '*', element: <NotFound /> },
];
