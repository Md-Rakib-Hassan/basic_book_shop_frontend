import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"], 
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-order",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetAllOrdersQuery } = orderApi;
