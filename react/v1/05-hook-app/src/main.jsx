import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HooksApp } from "./HooksApp";
import { CounterApp } from "./01-useState/CounterApp";
import { CounterCustomHook } from "./01-useState/CounterCustomHook";
import { SimpleForm } from "./02-useEffect/SimpleForm";
import { FormWithCustomHook } from "./02-useEffect/FormWithCustomHook";
import { MultipleCustomHook } from "./03-examples/MultipleCustomHook";
import { FocusScreen } from "./04-useRef/FocusScreen";
import { Layout } from "./05-userLayoutEffect/Layout";
import { Memorize } from "./06-memos/Memorize";
import { MemoHook } from "./06-memos/MemoHook";
import { CallBackHook } from "./06-memos/CallBackHook";
import { Padre } from "./07-tarea-memo/Padre";

import "./08-useReducer/intro-reducer";
import { TodoApp } from "./08-useReducer/TodoApp";
import { MainApp } from "./09-useContext/MainApp";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <SimpleForm/>
  // <FormWithCustomHook />
  // <MultipleCustomHook/>
  // <FocusScreen/>
  // <Layout/>
  // <Memorize/>
  // <MemoHook/>
  // <CallBackHook/>
  // <Padre/>
  // <TodoApp />
  // </React.StrictMode>

  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);
