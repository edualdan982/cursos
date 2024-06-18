import { useCounter, useFetch } from "../hooks";
import { Loading, Quote } from "../03-examples";

export const Layout = () => {
  const { counter, increment, decrement, reset } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(
    `https://rickandmortyapi.com/api/character/${counter}`
  );

  const { name, species } = !!data && data;

  return (
    <>
      <h1>BreakingBad Quotes</h1>
      <hr />
      <h3>Pagina: {counter}</h3>
      {isLoading ? <Loading /> : <Quote name={name} species={species} />}

      <button className="btn btn-primary" onClick={() => decrement(1)}>
        Back
      </button>
      <button className="btn btn-primary" onClick={() => increment(1)}>
        Next
      </button>
    </>
  );
};
