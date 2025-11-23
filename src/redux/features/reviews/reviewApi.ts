import { baseApi } from '../../api/baseApi';

type TPagination = { page?: number; limit?: number };
type TListParams = TPagination & { sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest'; rating?: number };

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /review/:BookId? page,limit,sortBy,rating
    getReviews: builder.query<
      {
        Reviews: any[];
        AverageRating: number;
        TotalReviews: number;
        Pagination: { page: number; limit: number; totalPages: number };
      },
      { bookId: string; params?: TListParams }
    >({
      query: ({ bookId, params }) => ({
        url: `/review/${bookId}`,
        method: 'GET',
        params,
      }),
      providesTags: (result, _err, { bookId }) => [
        { type: 'ReviewList', id: bookId },
        ...(result?.Reviews?.map((r: any) => ({ type: 'Review' as const, id: r?._id })) || []),
      ],
    }),

    // GET /review/:BookId/summary
    getReviewSummary: builder.query<
      { AverageRating: number; TotalReviews: number; Distribution: Record<number, number> },
      string
    >({
      query: (bookId) => `/review/${bookId}/summary`,
      providesTags: (_res, _err, bookId) => [{ type: 'ReviewSummary', id: bookId }],
    }),

    // GET /review/:BookId/me
    getMyReview: builder.query<any, string>({
      query: (bookId) => `/review/${bookId}/me`,
      providesTags: (res) => (res?._id ? [{ type: 'Review', id: res._id }] : []),
    }),

    // POST /review/:BookId
    addReview: builder.mutation<any, { bookId: string; body: { ReviewData: { Rating: number; ReviewText: string } } }>({
      query: ({ bookId, body }) => ({
        url: `/review/${bookId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_res, _err, { bookId }) => [{ type: 'ReviewList', id: bookId }, { type: 'ReviewSummary', id: bookId }],
    }),

    // PATCH /review/:id
    updateReview: builder.mutation<any, { id: string; body: { Rating?: number; ReviewText?: string } }>({
      query: ({ id, body }) => ({
        url: `/review/${id}`,
        method: 'PATCH',
        body: { ReviewData: body },
      }),
      invalidatesTags: (res) => (res?._id ? [{ type: 'Review', id: res._id }] : []),
    }),

    // DELETE /review/:id
    deleteReview: builder.mutation<{ deleted: true }, { id: string; bookId?: string }>({
      query: ({ id }) => ({
        url: `/review/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { id, bookId }) => [
        { type: 'Review', id },
        ...(bookId ? [{ type: 'ReviewList' as const, id: bookId }, { type: 'ReviewSummary' as const, id: bookId }] : []),
      ],
    }),

   
  }),
  overrideExisting: false,
});

export const {
  useGetReviewsQuery,
  useGetReviewSummaryQuery,
  useGetMyReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
