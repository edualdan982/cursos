import { useForm } from "../hooks";

export const TodoAdd = ({ onNewTodo }) => {
  const { onInputChange, onResetForm, description } = useForm({
    description: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (description.lenght <= 1) return;
    onNewTodo({ id: new Date().getTime() * 3, description });
    onResetForm();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="¿Qué hay que hacer?"
        className="form-control"
        name="description"
        value={description}
        onChange={onInputChange}
      ></input>
      <button type="summit" className="btn btn-outline-primary mt-1">
        Agregar
      </button>
    </form>
  );
};
