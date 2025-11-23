import { baseApi } from "../../api/baseApi";

const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all requests (optionally with filters)
    getRequests: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/request`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['Pins','Payment','Requests'],
    }),

  getRequestByUserAndBook: builder.query({
  query: (bookId) => `/request/history/${bookId}`,
  providesTags: ['Pins','Payment','Requests'],
}),

    // Get request by ID
    getRequestById: builder.query({
      query: (id: string) => `/request/${id}`,
      providesTags: ['Pins','Payment','Requests'],
    }),

    getMyRequest: builder.query({
      query: () => ({
        url: "/request/me",
        method: "GET",
      }),
      providesTags: ['Pins','Payment','Requests'],
    }),

    getIncomingRequest: builder.query({
      query: () => ({
        url: "/request/incoming",
        method: "GET",
      }),
      providesTags: ['Pins','Payment','Requests'],
    }),

    // Create new request
    createRequest: builder.mutation({
      query: (requestData) => ({
        url: `/request`,
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

   
updateRequestStatus: builder.mutation({
      query: ({ requestId, status }) => ({
        url: `/request/status/${requestId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Pins','Payment','Requests'], // so queries like getMyRequest are refetched
    }),

    

    // Delete request (if needed)
    deleteRequest: builder.mutation({
      query: (id: string) => ({
        url: `/request/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    updatePaymentStatus: builder.mutation({
  query: ({ requestId }) => ({
    url: `/request/payment/${requestId}`,
    method: 'PATCH',
  }),
  invalidatesTags: ['Pins','Payment','Requests'], // ensures refetch for updated request data
    }),
    
  claimbedDeposit:builder.mutation({
  query: ({ requestId }) => ({
    url: `/request/claim/${requestId}`,
    method: 'PATCH',
  }),
  invalidatesTags: ['Pins','Payment','Requests'], // ensures refetch for updated request data
    }),

  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useDeleteRequestMutation,
  useGetRequestByUserAndBookQuery,
  useGetMyRequestQuery,
  useGetIncomingRequestQuery,
  useUpdateRequestStatusMutation,
  useUpdatePaymentStatusMutation,
  useClaimbedDepositMutation
} = requestApi;
