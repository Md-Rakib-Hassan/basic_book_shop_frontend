import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // initiate a new payment
    initPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/init",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    // add money directly (DB insert only, no gateway)
    addMoneyToWallet: builder.mutation({
      query: (data) => ({
        url: "/payment/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    withdraw: builder.mutation({
      query: (data) => ({
        url: "/payment/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    // get one payment by transactionId
    getPaymentByTransactionId: builder.query({
      query: (transactionId) => `/payment/${transactionId}`,
      providesTags: ['Pins','Payment','Requests'],
    }),

    // update payment status (admin only)
    updatePaymentStatus: builder.mutation({
      query: ({ transactionId, status }) => ({
        url: `/payment/${transactionId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    // get payments of a user
    getPaymentsByUser: builder.query({
      query: (userId) => `/payment/user/${userId}`,
      providesTags: ['Pins','Payment','Requests'],
    }),

    
     getAllTransactions: builder.query({
  query: ({
    page = 1,
    limit = 10,
    search = "",
    status = "",
    dateFrom = "",
    dateTo = "",
    sortBy = "createdAt",
    order = "desc",
  }) =>
    `/payment/all?page=${page}&limit=${limit}&search=${search}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}&sortBy=${sortBy}&order=${order}`,
}),




  }),
});

export const {
  useInitPaymentMutation,
  useAddMoneyToWalletMutation,
  useGetPaymentByTransactionIdQuery,
  useUpdatePaymentStatusMutation,
  useGetPaymentsByUserQuery,
  useGetAllTransactionsQuery,
  useWithdrawMutation
} = paymentApi;
