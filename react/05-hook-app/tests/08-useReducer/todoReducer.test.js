import { todoReducer } from "../../src/08-useReducer/todoReducer";

describe("Pruebas en el todoReducer", () => {
  const initalState = [
    {
      id: 1,
      description: "Demo Todo",
      done: false,
    },
  ];
  test("debe de regresar el estado inicial", () => {
    const newState = todoReducer(initalState, {});
    expect(newState).toBe(initalState);
  });

  test("debe de agregar un todo", () => {
    const action = {
      type: "[TODO] Add todo",
      payload: {
        id: 2,
        description: "Nuevo todo",
        done: false,
      },
    };
    const newState = todoReducer(initalState, action);
    expect(newState.length).toBe(2);
    expect(newState).toContain(action.payload);
  });

  test("debe eliminar un todo", () => {
    const action = {
      type: "[TODO] Remove todo",
      payload: 1
    }

    const newState = todoReducer(initalState, action);
    expect(newState.length).toBe(0);
  });
  test("debe de realizar el Toogle del todo", () => {
    const action = {
      type: "[TODO] Toggle todo",
      payload: 1
    }

    const newState = todoReducer(initalState, action);
    expect(newState[0].done).toBe(true);
    
    const newState2 = todoReducer(newState, action);
    expect(newState2[0].done).toBe(false);
  });
});
