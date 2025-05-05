import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
        query: (email: string) => `/user/single/${email}`,
        providesTags: (email) => [{ type: "Books", id: email }],
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

    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    
  }),
});

export const { useGetUserByEmailQuery, useGetAllUsersQuery,useBlockUserMutation, useUnblockUserMutation} = userApi;
