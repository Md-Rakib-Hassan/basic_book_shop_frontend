import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/book`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['Books'], 
    }),

    getSpecificBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),

    addBook: builder.mutation({
      query: (book) => ({
        url: '/book',
        method: 'POST',
        body: book,
      }),
    }),

    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: book,
      }),
      invalidatesTags:['Books'],
    }),

    deleteBook: builder.mutation({
        query: (id) => ({
            url: `/book/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Books'],
}),


    
  }),
});

export const {
  useGetBookQuery,
  useGetSpecificBookQuery,
  useAddBookMutation,
    useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
