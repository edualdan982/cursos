import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGifs(category).then((newImages) => {
      setImages(newImages);
      setIsLoading(false);
    });
  }, []);

  // const getImages = async () => {
  //   const newImages = await getGifs(category);
  //   setImages(newImages);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   getImages();
  // });

  return {
    images,
    isLoading,
  };
};
