import { screen, render } from "@testing-library/react";
import { TodoApp } from "../../src/08-useReducer/TodoApp";
import { useTodos } from "../../src/hooks/useTodos";

jest.mock("../../src/hooks/useTodos");

describe('pruebas en el component <TodoApp/>', () => {
  useTodos.mockReturnValue({
    todos: [
      { id: 1, description: 'Todo #1', done: false },
      { id: 2, description: 'Todo #2', done: false },
      { id: 3, description: 'Todo #3', done: false },
    ],
    todosCount: 3,
    pendingCount: 1,
    handleDeleteTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
    handleNewAddTodo: jest.fn()
  });
  test('debe de monstrar el componente', () => {
    render(<TodoApp />);
    // screen.debug();
    expect(screen.getByText('Todo #1')).toBeTruthy();
    expect(screen.getByText('Todo #2')).toBeTruthy();
    expect(screen.getByText('Todo #3')).toBeTruthy();

    expect(screen.getByRole('textbox')).toBeTruthy();
  });
})