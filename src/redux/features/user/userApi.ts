import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
        query: (email: string) => `/user/single/${email}`,
        providesTags: (email) => [{ type: "User", id: email }],
    }),

    getUserById: builder.query({
        query: (id: string) => `/user/info/${id}`,
        providesTags:["User"],
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

export const { useGetUserByEmailQuery, useGetAllUsersQuery,useBlockUserMutation, useUnblockUserMutation, useGetUserByIdQuery} = userApi;
