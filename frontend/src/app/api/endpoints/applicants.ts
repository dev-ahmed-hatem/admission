import { Applicant, HOME_STATS } from "@/types/applicants";
import api from "../apiSlice";
import { PaginatedResponse } from "@/types/paginatedResponse";
import qs from "query-string";

export const applicantsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation<Applicant, Record<string, any>>({
      query: (data) => ({
        url: "applicants/applicants/",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        formData: true,
      }),
    }),
    getApplication: builder.query<Applicant, string>({
      query: (national_id) => ({
        url: `applicants/application-view/?national_id=${national_id}`,
        method: "GET",
      }),
    }),
    getApplicants: builder.query<
      PaginatedResponse<Applicant>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `/applicants/applicants?${qs.stringify(params || {})}`,
      }),
    }),
    setApplicantStatus: builder.mutation<
      { status: "مقبول" | "مرفوض" },
      { id: string; status: "مرفوض" | "مقبول" }
    >({
      query: (params) => ({
        url: `/applicants/applicants/${params.id}/set_status/`,
        method: "POST",
        data: { status: params.status },
      }),
    }),
    deleteApplicant: builder.mutation<void, string>({
      query: (id) => ({
        url: `/applicants/applicants/${id}/`,
        method: "DELETE",
      }),
    }),
    getHomeStats: builder.query<HOME_STATS, void>({
      query: () => ({
        url: `/applicants/home-stats/`,
        method: "GET",
      }),
    }),
    exportApplicantsExcel: builder.query<Blob, void>({
      query: () => ({
        url: "applicants/export-applicants/",
        responseType: "blob",
        method: "GET",
        responseHandler: (response: any) => response.blob(),
      }),
    }),
    getStudentExam: builder.query<
      { name: string | null; national_id: string | null },
      string
    >({
      query: (national_id) => ({
        url: `applicants/student-exam/?national_id=${national_id}`,
        method: "GET",
      }),
    }),
    recordMark: builder.mutation<void, { mark: number; national_id: string }>({
      query: (data) => ({
        url: `applicants/record-mark/`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetApplicationQuery,
  useLazyGetApplicationQuery,
  useGetApplicantsQuery,
  useSetApplicantStatusMutation,
  useDeleteApplicantMutation,
  useGetHomeStatsQuery,
  useLazyExportApplicantsExcelQuery,
  useLazyGetStudentExamQuery,
  useRecordMarkMutation,
} = applicantsEndpoints;
