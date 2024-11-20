import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  HomeLayout,
  Landing,
  Login,
  Register,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin
} from './pages'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <Landing />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index:true,
            element: <AddJob />
          },
          {
            path: "stats",
            element: <Stats />
          },
          {
            path: "all-jobs",
            element: <AllJobs />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "admin",
            element: <Admin />
          },
        ]
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />
}

export default App