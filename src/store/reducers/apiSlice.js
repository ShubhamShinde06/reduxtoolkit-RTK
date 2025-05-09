import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

/* method -1
const apiSlice = createApi({
  reducerPath: "api", // ✅ important to add reducerPath
  baseQuery: async (url) => {
    const response = await axios.get(url);
    const todos = response?.data?.todos;
    return { data: todos };
  }, // ✅ you need to define baseQuery (even a dummy one)
  endpoints: function (builder) {
    return {
      getAllTodos: builder.query({
        query: () => {
            return "https://dummyjson.com/todos"
        }
      }),
      getOneTodo: builder.query({
        query: (id) => {
            return `https://dummyjson.com/todos/${id}`
        }
      }),
    };
  },
});
*/

const apiSlice = createApi({
    reducerPath: "api", // ✅ important to add reducerPath
    //keepUnusedDataFor: 5,
    tagTypes: ['AddTodo', 'GetAllTododTag'],
    baseQuery: fetchBaseQuery({baseUrl: "https://dummyjson.com"}),// ✅ you need to define baseQuery (even a dummy one)
    endpoints: function (builder) {
      return {
        getAllTodos: builder.query({
          //keepUnusedDataFor: 5,
          query: () => {
              return "/todos"
          },
          providesTags:['GetAllTododTag'],
          transformResponse: function(data){
            return data?.todos || []
          }
        }),

        getOneTodo: builder.query({
          query: (id) => {
              return `/todos/${id}`
          }
        }),

        addTodo: builder.mutation({
          query: (params) => {
            return{
              url: '/todos/add',
              method: 'POST',
              body: params
            }
          },
          invalidatesTags: ['GetAllTododTag']
        })

      };
    },
  });

// ✅ RTK Query automatically generates a hook: useGetAllTodosQuery

export const { useGetAllTodosQuery, useLazyGetOneTodoQuery, useAddTodoMutation } = apiSlice;

export default apiSlice;
