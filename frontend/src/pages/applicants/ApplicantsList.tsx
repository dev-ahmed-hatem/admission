import { useEffect, useState } from "react";
import { Table, Input, Avatar, Space, Tag } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { tablePaginationConfig } from "../../utils/antd";
import {
  useDeleteEmployeesMutation,
  useGetEmployeesQuery,
} from "@/app/api/endpoints/employees";
import Loading from "@/components/Loading";
import Error from "../Error";
import { ColumnsType } from "antd/es/table";
import { TableProps } from "antd/lib";
import SelectedActionsBar from "@/components/SelectedActionBar";
import { useNotification } from "@/providers/NotificationProvider";
import { Applicant } from "@/types/applicants";

const columns: ColumnsType = [
  {
    title: "اسم الطالب",
    dataIndex: "studentArabicName",
    key: "studentArabicName",
    render: (text: string, record) => (
      <Space>
        <Avatar
          className="bg-calypso text-white font-semibold"
          icon={<UserOutlined />}
        >
          {text?.slice(0, 1)}
        </Avatar>
        <span className="flex flex-col">
          <span className="text-base">{text}</span>
          <span className="text-xs text-gray-400">
            رقم قومي: {record.national_id}
          </span>
        </span>
      </Space>
    ),
    sorter: (a, b) => a.arabic_name.localeCompare(b.arabic_name),
  },

  {
    title: "النوع",
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) => (
      <Tag color={gender === "ذكر" ? "blue" : "pink"}>{gender}</Tag>
    ),
    filters: [
      { text: "ذكر", value: "ذكر" },
      { text: "أنثى", value: "أنثى" },
    ],
    onFilter: (value, record) => record.gender === value,
  },

  {
    title: "الجنسية",
    dataIndex: "nationality",
    key: "nationality",
    filters: [
      { text: "مصر", value: "مصر" },
      { text: "السعودية", value: "السعودية" },
      { text: "الإمارات", value: "الإمارات" },
    ],
    onFilter: (value, record) => record.nationality === value,
  },

  {
    title: "نسبة الشهادة",
    dataIndex: "certificatePercentage",
    key: "certificatePercentage",
    render: (value: number) => <span>{value}%</span>,
    sorter: (a, b) =>
      a.certificate_percentage && b.certificate_percentage
        ? a.certificate_percentage - b.certificate_percentage
        : 0,
  },

  {
    title: "الرغبات",
    dataIndex: "preferences",
    key: "preferences",
    render: (preferences?: string[]) => (
      <Space wrap>
        {preferences?.map((pref) => (
          <Tag key={pref} color="geekblue">
            {pref}
          </Tag>
        ))}
      </Space>
    ),
  },
];

export const mockApplicants: Applicant[] = [
  {
    arabic_name: "محمد أحمد علي",
    english_name: "Mohamed Ahmed Ali",
    religion: "مسلم",
    nationality: "مصر",
    gender: "ذكر",
    governorate: "القاهرة",
    city: "مدينة نصر",
    national_id: "29805010123456",
    birthdate: "1998-05-01",
    mobile: "+201012345678",
    email: "mohamed.ali@example.com",
    address: "شارع التحرير - القاهرة",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "البصريات",
    certificate_percentage: 92.5,
    certificate_degree: "جيد جدا",
    certificate_year: 2022,
    preferences: ["علوم الأشعة", "الأجهزة الطبية"],
  },
  {
    arabic_name: "منى سامي حسن",
    english_name: "Mona Sami Hassan",
    religion: "مسيحي",
    nationality: "السعودية",
    gender: "أنثى",
    governorate: "الإسكندرية",
    city: "سموحة",
    national_id: "29906021234567",
    birthdate: "1999-06-02",
    mobile: "+966501234567",
    email: "mona.hassan@example.com",
    address: "حي الروضة - جدة",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "المختبرات",
    certificate_percentage: 88,
    certificate_degree: "جيد",
    certificate_year: 2023,
    preferences: ["المختبرات"],
  },
];

const EmployeesList = () => {
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const notification = useNotification();
  const navigate = useNavigate();

  // Search Function
  const onSearch = (value: string) => {
    setSearch(value);
  };

  // const [
  //   deleteEmployees,
  //   { isError: deleteError, isLoading: deleting, isSuccess: deleted },
  // ] = useDeleteEmployeesMutation();

  // // handling employees
  // const { data, isFetching, isError, refetch } = useGetEmployeesQuery({
  //   page,
  //   search,
  // });

  const rowSelection: TableProps["rowSelection"] = {
    selectedRowKeys: selectedList,
    onChange(selectedRowKeys, selectedRows) {
      setSelectedList(selectedRows.map((row) => row.id));
    },
  };

  // useEffect(() => {
  //   refetch();
  // }, [search, page]);

  // useEffect(() => {
  //   if (deleted) {
  //     notification.success({
  //       message: "تم حذف الموظفين",
  //     });
  //   }
  //   setSelectedList([]);
  // }, [deleted]);

  // useEffect(() => {
  //   if (deleteError) {
  //     notification.error({
  //       message: "حدث خطأ أثناء حذف الموظفين ! برجاء إعادة المحاولة",
  //     });
  //   }
  // }, [deleteError]);

  // if (isFetching) return <Loading />;
  // if (isError) return <Error />;
  return (
    <>
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">الموظفين</h1>

      <div className="flex justify-between flex-wrap mb-4">
        <Input.Search
          placeholder="ابحث عن موظف..."
          onSearch={onSearch}
          className="mb-4 w-full max-w-md h-10"
          defaultValue={search}
          allowClear={true}
          onClear={() => setSearch("")}
        />

        {/* Add Button */}
        <Link
          to={"/employees/add"}
          className="h-10 px-6 flex items-center text-white gap-2 rounded-lg
       bg-green-700 hover:bg-green-600 shadow-[0_2px_0_rgba(0,58,58,0.31)]"
        >
          <PlusOutlined />
          <span>إضافة موظف</span>
        </Link>
      </div>

      {/* Selected Action Bar */}
      <SelectedActionsBar
        selectedCount={selectedList.length}
        onConfirmDelete={() => {
          // deleteEmployees(selectedList);
        }}
        onClearSelection={() => {
          setSelectedList([]);
        }}
        // deleting={deleting}
      />

      {/* Table */}
      <Table
        dataSource={mockApplicants}
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`employee-profile/${record.id}`),
        })}
        rowKey="id"
        pagination={tablePaginationConfig()}
        bordered
        scroll={{ x: "max-content" }}
        className="clickable-table  calypso-header"
        rowSelection={rowSelection}
      />
    </>
  );
};

export default EmployeesList;
