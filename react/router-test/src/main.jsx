import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import { ErrorPage } from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
  //   [
  //   {
  //     path: "/",
  //     element: <Root />,
  //     errorElement: <ErrorPage />,
  //     action: rootAction,
  //     loader: rootLoader,
  //     children: [
  //       { index: true, element: <Index /> },
  //       {
  //         errorElement: <ErrorPage />,
  //         children: [
  //           { index: true, element: <Index /> },
  //           {
  //             path: "contacts/:contactId",
  //             element: <Contact />,
  //             loader: contactLoader,
  //             action: contactAction,
  //           },
  //           /* the rest of the routes */
  //         ],
  //       },
  //       {
  //         path: "contacts/:contactId/edit",
  //         element: <EditContact />,
  //         loader: contactLoader,
  //         action: editAction,
  //       },
  //       {
  //         path: "contacts/:contactId/destroy",
  //         action: destroyAction,
  //         errorElement: <div>Oops! There was an error.</div>,
  //       },
  //     ],
  //   },
  // ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);