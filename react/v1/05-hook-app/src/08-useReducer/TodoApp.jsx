import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodos } from "../hooks";

export const TodoApp = () => {
  // useTodo
  // todos, handleDeleteTodo, handleToggleTodo, handleNewAddTodo
  const {todos, todosCount, pendingCount, handleDeleteTodo, handleToggleTodo, handleNewAddTodo} =
    useTodos();

  return (
    <>
      <h1>TodoApp: {todosCount} <small>pendientes: { pendingCount }</small></h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
          />
        </div>
        <div className="col-5">
          <h4>Agregar Todo</h4>
          <TodoAdd onNewTodo={handleNewAddTodo} />
        </div>
      </div>
    </>
  );
};
