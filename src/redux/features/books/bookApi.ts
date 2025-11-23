import { baseApi } from "../../api/baseApi";

// Utility: build query params from args
const buildParams = (args?: { name: string; value: string | number }[]) => {
  const params = new URLSearchParams();
  if (args) {
    args.forEach((item) => {
      params.append(item.name, String(item.value));
    });
  }
  return params;
};

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getBook: builder.query({
      query: (args?: { name: string; value: string | number }[]) => ({
        url: "/book",
        method: "GET",
        params: buildParams(args),
      }),
      providesTags: ["Books"],
    }),

    getAllBook: builder.query({
      query: (args?: { name: string; value: string | number }[]) => ({
        url: "/book",
        method: "GET",
        params: buildParams(args),
      }),
      providesTags: ["Books"],
    }),

    
    getAcademicBooks: builder.query({
      query: (args?: { name: string; value: string | number }[]) => {
        const params = buildParams(args);
        params.append("category", "Academic"); // always academic
        return { url: "/book", method: "GET", params };
      },
      providesTags: ["Books"],
    }),

    getFreeBooks: builder.query({
      query: (args?: { name: string; value: string | number }[]) => {
        const params = buildParams(args);
        params.append("price", "0"); 
        return { url: "/book", method: "GET", params };
      },
      providesTags: ["Books"],
    }),

   
    getSpecificBook: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

   
    addBook: builder.mutation({
      query: (book) => ({
        url: "/book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    
    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    
    getBookDetails: builder.mutation({
      query: (isbn: string) => ({
        url: "/book/details",
        method: "POST",
        body: { isbn },
      }),
    }),

    
    updateBookRating: builder.mutation({
      query: ({ bookId, rating }) => ({
        url: `/book/rating/${bookId}`,
        method: "PATCH",
        body: { Rating: rating },
      }),
      invalidatesTags: ["Books"],
    }),

  
    getMyBooks: builder.query({
      query: () => ({
        url: "/book/me",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

 
    getAcademicFilters: builder.query({
      query: () => ({
        url: "/book/academic/filters",
        method: "GET",
      }),
    }),


    updateBookApproval: builder.mutation({
      query: ({ bookId, approved }) => ({
        url: `/book/approval/${bookId}`,
        method: "PATCH",
        body: { approved },
      }),
      invalidatesTags: ["Books"], 
    }),

  }),
});

export const {
  useGetBookQuery,
  useGetAcademicBooksQuery,
  useGetSpecificBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookDetailsMutation,
  useUpdateBookRatingMutation,
  useGetMyBooksQuery,
  useGetAcademicFiltersQuery,
  useGetFreeBooksQuery,
  useUpdateBookApprovalMutation,
  useGetAllBookQuery,
} = bookApi;
