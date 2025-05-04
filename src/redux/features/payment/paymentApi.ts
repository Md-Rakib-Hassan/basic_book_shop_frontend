import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (orderData) => ({
        url: "/payment/init",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
