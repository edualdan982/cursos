import { describe, expect, test } from "vitest";
import { add, divide, multiply, subtract } from "./main.helper";

describe("add", () => {
  test("should add two positives numbers", () => {
    // ! 1. Arrange
    const a = 2;
    const b = 3;

    // ! 2. Act
    const result = add(a, b);

    // ! 3. Assert
    expect(result).toBe(a + b);
  });

  test("should add two negatives numbers", () => {
    // ! 1. Arrange
    const a = -2;
    const b = -3;

    // ! 2. Act
    const result = add(a, b);

    // ! 3. Assert
    expect(result).toBe(a + b);
  });
});

//? Tarea: Realizar dos test para subtract y multiply
describe("subtract", () => {
  test("should subtract two positives numbers", () => {
    const a = 200;
    const b = 100;

    const result = subtract(a, b);
    expect(result).toBe(a - b);
  });

  test("should subtract two negatives numbers", () => {
    const a = -500;
    const b = 100;

    const result = subtract(a, b);
    expect(result).toBe(a - b);
  });
});

describe("multiply", () => {
  test("should multiply two positives numbers", () => {
    const a = 2;
    const b = 3;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test("should multiply two negatives numbers", () => {
    const a = -1;
    const b = -5;

    const result = multiply(a, b);
    expect(result).toBe(a * b);
  });
});

describe("divide", ()=>{
  test("should divide two positives numbers", () => {
    const a = 2;
    const b = 4;

    const result = divide(a, b);

    expect(result).toBe(a / b);
  });
})
