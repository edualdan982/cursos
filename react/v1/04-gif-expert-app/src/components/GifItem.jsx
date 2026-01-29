import PropTypes from "prop-types";

export const GifItem = ({ title, url, id }) => {
  return (
    <div className="card">
      <img src={url} alt={title}></img>
      <p>{title}</p>
    </div>
  );
};

GifItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

/*
  TAREA
  1. Agregar PropTypes
    a. title obligatorio
    b. url obligatorio
  2. Evaluar el snapshot
*/
