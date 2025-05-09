import apiSlice from "./apiSlice";

const apiDeleteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteOneTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAllTodos", // ✅ should match the query endpoint name
            undefined,
            (draft) => {
              return draft.filter((todo) => todo.id !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useDeleteOneTodosMutation } = apiDeleteSlice;

export default apiDeleteSlice;


/* do not create muti api
const apiDeleteSlice = createApi({
    reducerPath: "apiDelete", // ✅ important to add reducerPath
    baseQuery: fetchBaseQuery({baseUrl: "https://dummyjson.com"}),// ✅ you need to define baseQuery (even a dummy one)
    endpoints: function (builder) {
      return {
        deleteOneTodos: builder.mutation({
          query: (id) => {
              return {
                url: `/todos/${id}`,
                method: "DELETE"
              }
          },
          transformResponse: function(data){
            return data?.todos || []
          }
        }),
      };
    },
  });


export const { useDeleteOneTodosMutation } = apiDeleteSlice;

export default apiDeleteSlice;
*/
