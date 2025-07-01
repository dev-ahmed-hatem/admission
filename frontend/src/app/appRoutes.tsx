import Base from "@/pages/Base";
import Error from "@/pages/Error";
import SectionView from "@/pages/SectionView";
import EmployeesList from "@/pages/applicants/ApplicantsList";
import ProjectsList from "@/pages/projects/ProjectsList";
import { FaUser, FaCalendarCheck, FaMoneyBill, FaFile } from "react-icons/fa";
import { FaDiagramProject, FaCalendarDays } from "react-icons/fa6";
import { GiReceiveMoney, GiPayMoney, GiMoneyStack } from "react-icons/gi";
import { LuNotebookPen } from "react-icons/lu";
import { MdAssignment } from "react-icons/md";
import { RouteObject } from "react-router";
import TasksList from "@/pages/tasks/TasksList";
import AttendancePage from "@/pages/attendance/AttendancePage";
import FinancialsPage from "@/pages/financials/FinancialsPage";
import FilesPage from "@/pages/files/FilesPage";
import SalariesPage from "@/pages/financials/Salaries";
import FinancialRecords from "@/pages/financials/FinancialRecords";
import NotesPage from "@/pages/notes/NotesPage";
import SchedulesPage from "@/pages/schedules/SchedulesPage";
import LoginPage from "@/pages/LoginPage";
import AuthProvider from "@/providers/AuthProvider";
import AdmissionsPage from "@/pages/admissions/AdmissionsPage";
import RegistrationFormPage from "@/pages/admissions/RegistrationFormPage";

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
    path: "*",
    element: <Error notFound={true} />,
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
    ],
  },
];

export default appRoutes;
