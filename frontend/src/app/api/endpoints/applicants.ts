import { Applicant } from "@/types/applicants";
import api from "../apiSlice";

const applicantsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation<Applicant, Record<string, any>>({
      query: (data) => ({
        url: "applicants/applicants/",
        method: "POST",
        data,
      }),
    }),
    getApplication: builder.query<Applicant, string>({
      query: (national_id) => ({
        url: `applicants/application-view/?national_id=${national_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetApplicationQuery,
  useLazyGetApplicationQuery,
} = applicantsEndpoints;
