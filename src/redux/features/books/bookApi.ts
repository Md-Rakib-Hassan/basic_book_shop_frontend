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
        })
    })
})

export const { useGetBookQuery, useGetSpecificBookQuery} = bookApi;