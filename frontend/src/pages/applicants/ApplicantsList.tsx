import { useEffect, useState } from "react";
import { Table, Input, Avatar, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { tablePaginationConfig } from "../../utils/antd";
import Loading from "@/components/Loading";
import Error from "../Error";
import { ColumnsType } from "antd/es/table";
import { Applicant, INSTITUTES, PRIMARY_DIVISIONS } from "@/types/applicants";
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
    sorter: true,
  },
  {
    title: "المعهد",
    dataIndex: "institute",
    key: "institute",
    filters: INSTITUTES.map((institute) => ({
      text: institute,
      value: institute,
    })),
  },
  {
    title: "البرنامج",
    dataIndex: "enrollment",
    key: "enrollment",
    filters: [
      ...PRIMARY_DIVISIONS.map((division) => ({
        text: division,
        value: division,
      })),
      { text: "المستوى الأول", value: "المستوى الأول" },
    ],
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
    sorter: true,
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
  },
];

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [controls, setControls] = useState<{
    sort_by: string;
    order: string;
    filters: { division: string[]; institute: string[]; status: string[] };
  } | null>(null);

  // Search Function
  const onSearch = (value: string) => {
    setSearch(value);
  };

  // handling applicants
  const { data, isLoading, isFetching, isError, refetch } =
    useGetApplicantsQuery({
      page,
      search,
      sort_by: controls?.sort_by,
      order: controls?.order === "descend" ? "-" : "",
      ...controls?.filters,
    });

  useEffect(() => {
    refetch();
  }, [search, page, controls]);

  if (isLoading) return <Loading />;
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
        onChange={(pagination, filters: any, sorter: any) => {
          setControls({
            ...(sorter.column?.key && { sort_by: sorter.column.key }),
            ...(sorter.order && { order: sorter.order }),
            filters: Object.fromEntries(
              Object.entries(filters).map(([filter, values]) => [
                filter,
                (values as string[])?.join(),
              ])
            ),
          });
        }}
        scroll={{ x: "max-content" }}
        className="clickable-table  calypso-header"
      />
    </>
  );
};

export default EmployeesList;
