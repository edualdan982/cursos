import React from "react";
import ReactDOM from "react-dom/client";
// import { HelloWorldApp } from "./HelloWorldApp";
import FirstApp from "./FirstApp";
import "./style.css";
import CounterApp from "./CounterApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <FirstApp titulo="Hola, Soy Edual Dan" subtitulo="Sarmiento Garfias"/> */}
    <CounterApp value={0}/>
    
  </React.StrictMode>
);
