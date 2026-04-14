import { describe, expect, test } from "vitest";
import { add, multiply, substract } from "./main.helper";

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

  test("sloud add two negatives numbers", () => {
    // ! 1. Arrange
    const a = -2;
    const b = -3;

    // ! 2. Act
    const result = add(a, b);

    // ! 3. Assert
    expect(result).toBe(a + b);
  });
});

//? Tarea: Realizar dos test para substract y multiply
describe("substract", () => {
  test("should substract two positives numbers", () => {
    const a = 200;
    const b = 100;

    const result = substract(a, b);
    expect(result).toBe(a - b);
  });

  test("should substract two negatives numbers", () => {
    const a = -500;
    const b = 100;

    const result = substract(a, b);
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
