import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHook } from "../../src/03-examples";
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock("../../src/hooks/useFetch");
jest.mock("../../src/hooks/useCounter");

describe("Pruebas en <MultipleCustomHooks>", () => {
  const mockIncrement = jest.fn();

  useCounter.mockReturnValue({
    counter: 1,
    increment: mockIncrement,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mosrtrar el componente por defecto", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHook />);

    expect(screen.getByText("Loading..."));
    expect(screen.getByText("BreakingBad Quotes"));

    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(nextButton.disabled).toBeTruthy();
    // screen.debug();
  });

  test("debe de mostrar un Qoute", () => {
    useFetch.mockReturnValue({
      data: [{ name: "Edual", species: "Hola mundo" }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHook />);
    expect(screen.getByText("Hola mundo")).toBeTruthy();
    expect(screen.getByText("Edual")).toBeTruthy();

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton.disabled).toBeFalsy();
    fireEvent.click(nextButton);

    expect(mockIncrement).toHaveBeenCalled();
  });

});
