import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
        query: (email: string) => `/user/single/${email}`,
        providesTags: (result, error, email) => [{ type: "User", id: email }],
    }),

    getAllUsers: builder.query({
      query: (searchParams) => {
        const queryString = new URLSearchParams(searchParams).toString();
        return {
          url: `/user${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserByEmailQuery, useGetAllUsersQuery} = userApi;
