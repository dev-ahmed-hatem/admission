import { Applicant } from "@/types/applicants";
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
  }),
});

export const {
  useCreateRequestMutation,
  useGetApplicationQuery,
  useLazyGetApplicationQuery,
  useGetApplicantsQuery,
  useSetApplicantStatusMutation,
  useDeleteApplicantMutation,
} = applicantsEndpoints;
