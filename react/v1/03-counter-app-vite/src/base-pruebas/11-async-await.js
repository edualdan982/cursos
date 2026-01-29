
export const getImagen = async () => {
  try {
    const apiKey = "X4KzTEdeA8AxD7OBMeFeS7cDmNh4qZVH";
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    );
    const { data } = await resp.json();

    const { url } = data.images.original;
    return url;
  } catch (error) {
    // console.error(error);
    return "No se encontro la imagen";
  }
};
