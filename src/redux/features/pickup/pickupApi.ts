import { baseApi } from "../../api/baseApi";

const pickupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupPoints: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/pickup`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['PickupPoints'],
    }),

    getSpecificPickupPoint: builder.query({
      query: (id) => `/pickup/${id}`,
      providesTags: (result, error, id) => [{ type: 'PickupPoints', id }],
    }),

    addPickupPoint: builder.mutation({
      query: (pickupPoint) => ({
        url: '/pickup',
        method: 'POST',
        body: pickupPoint,
      }),
      invalidatesTags: ['PickupPoints'],
    }),

    updatePickupPoint: builder.mutation({
      query: ({ id, ...pickupPoint }) => ({
        url: `/pickup/${id}`,
        method: 'PATCH',
        body: pickupPoint,
      }),
      invalidatesTags: ['PickupPoints'],
    }),

    deletePickupPoint: builder.mutation({
      query: (id) => ({
        url: `/pickup/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PickupPoints'],
    }),
  }),
});

export const {
  useGetPickupPointsQuery,
  useGetSpecificPickupPointQuery,
  useAddPickupPointMutation,
  useUpdatePickupPointMutation,
  useDeletePickupPointMutation,
} = pickupApi;
