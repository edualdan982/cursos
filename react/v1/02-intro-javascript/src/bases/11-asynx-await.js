

const getImagen = async () => {
  try {
    const apikey = "X4KzTEdeA8AxD7OBMeFeS7cDmNh4qZVH";
    const urlApi = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}`;
    const resp = await fetch(urlApi);
    const { data } = await resp.json();
    console.log(data);
    const { url } = data.images.original;
    const img = document.createElement("img");
    img.src = url;
    document.body.append(img);
  } catch (error) {
    //manejo del error
    console.error(error);

  }
};
getImagen();
