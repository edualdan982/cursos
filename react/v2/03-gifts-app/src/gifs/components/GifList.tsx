import type { FC } from "react";
import { GifItem } from "./GifItem";
import type { Gif } from "../interfaces/gif.interface";

interface Props {
  gifs: Gif[];
}
export const GifList: FC<Props> = ({ gifs }) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <GifItem gif={gif} key={gif.id} />
      ))}
    </div>
  );
};
