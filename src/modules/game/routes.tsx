import type { RouteObject } from "react-router-dom";
import Game from "./game";

export const gameRoutes: RouteObject[] = [
  {
    path: "game",
    element: <Game />,
  },
];
