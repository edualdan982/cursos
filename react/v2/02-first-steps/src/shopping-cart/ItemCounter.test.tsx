import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const nameItem = "Test item";
    render(<ItemCounter name={nameItem} />);

    expect(screen.getByText(nameItem)).toBeDefined();
    expect(screen.getByText(nameItem)).not.toBeNull();
  });

  test("should render with custom quantity", () => {
    const name = "Control de Nintendo";
    const quantity = 10;

    render(<ItemCounter name={name} quantity={quantity} />);
    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increase count when +1 button is pressed", () => {
    render(<ItemCounter name={"Test item"} quantity={1}/>);

    const [buttonAdd] = screen.getAllByRole('button');
    console.log(buttonAdd.innerHTML);
    fireEvent.click(buttonAdd);
    
    expect(screen.getByText("2")).toBeDefined();

  });

  test("should decrease count when -1 button is pressed", () =>{
    // quantity = 5
    render(<ItemCounter name="Test item" quantity={5}/>);

    const [, buttonDec] = screen.getAllByRole('button');
    console.log(buttonDec.innerHTML);
    fireEvent.click(buttonDec);

    expect(screen.getByText("4"));
  });

  test("should decrease count when 1 is pressed not decrease ", () =>{
    // quantity = 5;
    render(<ItemCounter name={"Test name"} quantity={1}/>);

    const [, buttonDec] =  screen.getAllByRole('button');
    console.log(buttonDec.innerHTML);
    fireEvent.click(buttonDec);
    
    expect(screen.getByText('1'));
  })
});
