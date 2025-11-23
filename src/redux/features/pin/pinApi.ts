import { baseApi } from "../../api/baseApi";

const secretPinApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Generate PIN for a request (owner)
    generatePin: builder.mutation<{ pin: string }, string>({
      query: (requestId) => ({
        url: `/pin/generate/${requestId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Pins','Payment','Requests'], // optional, in case you want to refetch requests
    }),

    // Verify PIN (owner confirms handover)
    verifyPin: builder.mutation<void, { requestId: string; pin: string , returnDate}>({
      query: ({ requestId, pin, returnDate }) => ({
        url: `/pin/verify/${requestId}`,
        method: 'POST',
        body: { pin,returnDate },
      }),
      invalidatesTags: ['Pins','Payment','Requests'],
    }),

    // Get PIN (borrower views the PIN)
    getPin: builder.query<{ pin: string }, string>({
      query: (requestId) => `/pin/${requestId}`,
      providesTags: ['Pins','Payment','Requests'],
    }),

  }),
});

export const {
  useGeneratePinMutation,
  useVerifyPinMutation,
  useGetPinQuery,
} = secretPinApi;
