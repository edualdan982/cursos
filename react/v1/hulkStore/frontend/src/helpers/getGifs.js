export const getGifs = async(category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=X4KzTEdeA8AxD7OBMeFeS7cDmNh4qZVH&q=${category}&limit=10`;
  const resp = await fetch(url);
  const { data = [] } = await resp.json();

  // console.log(data);

  const gifs = data.map( img => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url
  }));
}