import type { GiphyRandomResponse } from "./data/giphy.response";

const API_KEY = "fTcC4rehLOXLDj024FBnRLCnyW2NYpVc";

const myRequet = fetch(
  `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`,
);

const createImageInsideDOM = ( url: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = url;
    document.body.append(imgElement);
 
}
myRequet
  .then((response) => response.json())
  .then(({ data}: GiphyRandomResponse) => {
    // const imageUrl = data.data.images.original.url;
    // console.log(data);

    // const imgElement = document.createElement("img");
    // imgElement.src = imageUrl;
    // document.body.append(imgElement);

    const imageUrl = data.images.original.url;
    createImageInsideDOM(imageUrl);
  })
  .catch(console.error);
