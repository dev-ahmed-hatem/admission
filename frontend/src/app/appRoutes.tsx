import Base from "@/pages/Base";
import Error from "@/pages/Error";
import SectionView from "@/pages/SectionView";
import EmployeesList from "@/pages/applicants/ApplicantsList";
import { FaUser } from "react-icons/fa";
import { Navigate, RouteObject } from "react-router";
import LoginPage from "@/pages/LoginPage";
import AuthProvider from "@/providers/AuthProvider";
import AdmissionsPage from "@/pages/admissions/AdmissionsPage";
import RegistrationFormPage from "@/pages/admissions/RegistrationFormPage";
import ApplicantProfilePage from "@/pages/applicants/applicant-profile/ApplicantProfileView";

export type AppRoute = RouteObject & {
  key?: string;
  label?: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
};

export const appRoutes: AppRoute[] = [
  {
    path: "/admin",
    element: (
      <AuthProvider>
        <Base />
      </AuthProvider>
    ),
    errorElement: <Base error={true} />,
    children: [
      {
        path: "applicants",
        element: (
          <SectionView
            parentComponent={<EmployeesList />}
            parentUrl="/admin/applicants"
          />
        ),
        icon: <FaUser />,
        label: "المتقدمين",
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Navigate to={"/admissions"} />,
  },
  {
    path: "admissions",
    element: <AdmissionsPage />,
    errorElement: <Base error={true} />,
    children: [
      {
        path: "apply",
        element: <RegistrationFormPage />,
      },
      {
        path: "track-application/",
        element: (
          <div className="padding-container py-7 bg-white">
            <ApplicantProfilePage />
          </div>
        ),
      },
      {
        path: "*",
        element: <Error notFound={true} />,
      },
    ],
  },
];

export default appRoutes;
