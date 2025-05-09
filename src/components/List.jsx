import React, { useState } from "react";
import {
  useAddTodoMutation,
  useGetAllTodosQuery,
  useLazyGetOneTodoQuery,
} from "../store/reducers/apiSlice";
import { useDeleteOneTodosMutation } from "../store/reducers/apideleteSlice";

const List = () => {
  const { data, isLoading, error, refetch } = useGetAllTodosQuery();
  const [trigger, result] = useLazyGetOneTodoQuery();
  const [deleteTodoFn] = useDeleteOneTodosMutation();
  const [addTodo] = useAddTodoMutation()

  const [enteredTodo, setEnteredTodo] = useState("");

  const tableHead = data && data.length > 0 ? Object.keys(data[0]) : [];

  const handleStatus = (id) => {
    trigger(id);
    console.log("Edit clicked for:", id);
  };

  const handleDelete = (id) => {
    deleteTodoFn(id);
    console.log("Delete clicked for ID:", id);
  };

  function getStatus(isCompleted) {
    return isCompleted ? "Completed" : "Pending..";
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  function handleAddTodo(){
    addTodo({
      todo: enteredTodo,
      completed: false,
      userId: 124
    })
    // .unwrap()
    //   .then((data)=>{
    //   console.log(data)
    //   refetch() 
  //})
  }

  return (
    <>
      <div className="add-box">
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            {tableHead.map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              {tableHead.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <button
                  onClick={() => handleStatus(item.id)}
                  style={{ marginRight: "5px" }}
                >
                  Status
                </button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                {result?.isLoading && <span>Loading status</span>}
                {result?.data?.id === item.id && (
                  <span>{getStatus(result?.data?.completed)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
