import { useState } from "react";
import { UserContext } from "./UserContext";
// const user = {
//   id: 123,
//   name: 'Edual Dan',
//   email: 'edualsarmiento@gmail.com'
// }
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* <UserContext.Provider value={{ hola: "Mundo", user }}> */}
      {children}
    </UserContext.Provider>
  );
};
