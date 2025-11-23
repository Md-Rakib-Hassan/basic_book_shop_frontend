import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Send a contact message
    sendMessage: builder.mutation<{ _id: string; name: string; email: string; message: string }, { name: string; email: string; message: string }>({
      query: (payload) => ({
        url: `/contact`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Contacts'], // optional, in case you want to refetch messages
    }),

    // Get all contact messages (admin only)
    getAllMessages: builder.query<
      { _id: string; name: string; email: string; message: string; createdAt: string; updatedAt: string }[],
      void
    >({
      query: () => `/contact`,
      providesTags: ['Contacts'],
    }),

  }),
});

export const {
  useSendMessageMutation,
  useGetAllMessagesQuery,
} = contactApi;
