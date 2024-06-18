import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";
describe("Pruebas en el useForm", () => {
  const initialForm = {
    name: "Fernando",
    email: "correo@mail.com",
  };
  test("debe regresar la información los valores defecto", () => {
    const { result } = renderHook(() => useForm(initialForm));
    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });

  test("debe de cambiar el nombre del formulario", () => {
    //Montar el hook
    const newValue = "Juan";
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    //onIntputChange() // act(), useForm, evento...
    act(() => {
      onInputChange({ target: { name: "name", value: newValue } });
    });

    //expect
    expect(result.current.name).toBe(newValue);
  });

  test("debe de realizar el reset del formulario", () => {
    //Montar el hook
    const newValue = "Juan";
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onResetForm } = result.current;

    //onIntputChange() // act(), useForm, evento...
    act(() => {
      onInputChange({ target: { name: "name", value: newValue } });
      onResetForm();
    });

    //expect
    expect(result.current.name).toBe(initialForm.name);
  });
});
