import { baseApi } from "../../api/baseApi";

const userReviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
    getUserReviews: builder.query({
      query: (userId) => `/user-review/${userId}`,
    }),
      
    postUserReview: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/user-review/${userId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserReviewsQuery, usePostUserReviewMutation } = userReviewApi;
