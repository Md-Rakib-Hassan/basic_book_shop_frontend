import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBook: builder.query({
            
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item) => {
                        params.append(item.name, item.value);
                    })
                }
                return {
                    url: `/book`,
                    method: 'GET',
                    params: params,
                }

            }
        }),
        getSpecificBook: builder.query({
            query:(id)=>`/book/${id}`
        }),
        addBook: builder.mutation({
            query: (book) => ({
                url: '/book',
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['Book'],
        }),
    })
})

export const { useGetBookQuery, useGetSpecificBookQuery, useAddBookMutation} = bookApi;