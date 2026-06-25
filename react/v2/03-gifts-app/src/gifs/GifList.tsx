import type { FC } from "react";
import type { Gif } from "../mock-data/gifs.mock";
import { GifItem } from "./GifItem";

interface Props {
  gifs: Gif[];
}
export const GifList: FC<Props> = ({ gifs }) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <GifItem gif={gif} />
      ))}
    </div>
  );
};
