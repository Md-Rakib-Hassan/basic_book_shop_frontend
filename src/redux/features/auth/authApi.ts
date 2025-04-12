import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        signup: builder.mutation({
            query: (formData) => ({
                url: '/auth/register',
                method: 'POST',
                body: formData,
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation} = authApi;