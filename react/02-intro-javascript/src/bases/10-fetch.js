const apikey = "X4KzTEdeA8AxD7OBMeFeS7cDmNh4qZVH";

const url = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}`;

const peticion = fetch(url);

peticion
  .then((resp) => resp.json())
  .then(({ data }) => {
    const { url } = data.images.original;
    console.log(url);

    const img = document.createElement('img');
    img.src = url;
    document.body.append( img );
  })
  .catch(console.warn);
