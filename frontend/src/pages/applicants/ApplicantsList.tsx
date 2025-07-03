import { useEffect, useState } from "react";
import { Table, Input, Avatar, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { tablePaginationConfig } from "../../utils/antd";
import Loading from "@/components/Loading";
import Error from "../Error";
import { ColumnsType } from "antd/es/table";
import { Applicant } from "@/types/applicants";
import { useGetApplicantsQuery } from "@/app/api/endpoints/applicants";

const columns: ColumnsType = [
  {
    title: "اسم الطالب",
    dataIndex: "arabic_name",
    key: "arabic_name",
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
    title: "المعهد",
    dataIndex: "institute",
    key: "institute",
    render: (institute: string) => institute,
    // filters: [
    //   { text: "ذكر", value: "ذكر" },
    //   { text: "أنثى", value: "أنثى" },
    // ],
    // onFilter: (value, record) => record.gender === value,
  },

  {
    title: "المجموع",
    dataIndex: "total_mark",
    key: "total_mark",
    render: (value, record) => (
      <span>
        {record.total_mark} من {record.total_out_of}
      </span>
    ),
  },

  {
    title: "نسبة الشهادة",
    dataIndex: "certificate_percentage",
    key: "certificate_percentage",
    render: (value: number) => <span>{value}%</span>,
    sorter: (a, b) =>
      a.certificate_percentage && b.certificate_percentage
        ? a.certificate_percentage - b.certificate_percentage
        : 0,
  },

  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (status: Applicant["status"]) => (
      <Tag
        color={
          status === "قيد المراجعة"
            ? "geekblue"
            : status === "مقبول"
            ? "green"
            : "red"
        }
      >
        {status}
      </Tag>
    ),
    filters: [
      { text: "قيد المراجعة", value: "قيد المراجعة" },
      { text: "مقبول", value: "مقبول" },
      { text: "مرفوض", value: "مرفوض" },
    ],
    onFilter: (value, record) => record.status === value,
  },
];

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Search Function
  const onSearch = (value: string) => {
    setSearch(value);
  };

  // handling applicants
  const { data, isFetching, isError, refetch } = useGetApplicantsQuery({
    page,
    search,
  });

  useEffect(() => {
    refetch();
  }, [search, page]);

  if (isFetching) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">المتقدمين</h1>

      <div className="flex justify-between flex-wrap mb-4">
        <Input.Search
          placeholder="ابحث عن طالب..."
          onSearch={onSearch}
          className="mb-4 w-full max-w-md h-10"
          defaultValue={search}
          allowClear={true}
          onClear={() => setSearch("")}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={data?.data}
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`applicant-profile/${record.national_id}`),
        })}
        rowKey="national_id"
        pagination={tablePaginationConfig({
          total: data?.count,
          current: data?.page,
          onChange(page) {
            setPage(page);
          },
        })}
        bordered
        scroll={{ x: "max-content" }}
        className="clickable-table  calypso-header"
      />
    </>
  );
};

export default EmployeesList;
