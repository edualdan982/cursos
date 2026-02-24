import type { CSSProperties } from "react";

const firstName = "Edual Dan";
const lastName = "Sarmiento Garfias";

const favoriteGames = ["Overwatch", "Hero of the Storm"];
const isActive = true;

const address = {
  zipCode: "ABC-1234",
  country: "Bolivia",
};
const myStyles: CSSProperties = {
  backgroundColor: "#fafafa",
  borderRadius: 20,
  padding: 10,
  marginTop: 30
};
export function MyAwesomeApp() {
  return (
    <div>
      <h1>{firstName}</h1>
      <h3>{lastName}</h3>

      <p>{favoriteGames.join(", ")}</p>
      <p>{2 + 2}</p>
      <h1> {isActive ? "Activo" : "No activo"}</h1>

      <pre style={myStyles}>{JSON.stringify(address)}</pre>
    </div>
  );
}
