import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query:(bookId)=>`/review/${bookId}`
        })
    })
})

export const { useGetReviewsQuery} = reviewApi;