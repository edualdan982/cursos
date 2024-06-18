const { render } = require("@testing-library/react");
const { default: FirstApp } = require("../src/FirstApp");

describe("Prueba en <FirstApp />", () => {
  // test("debe hacer match con el snapshot", () => {
  //   const title = "Hola soy Goku";
  //   const { container } = render(<FirstApp titulo={title} />);
  //   // console.log(container);

  //   expect(container).toMatchSnapshot();
  // });

  test("debe mostrar el título en un h1", () => {
    const title = "Hola, Soy Goku";
    const subtitle = "Hola, Soy un subtitulo";
    const { container, getByText } = render(
      <FirstApp titulo={title} subtitulo={subtitle} />
    );

    expect(getByText(title.trim())).toBeTruthy();

    const h1 = container.querySelector("h1");
    expect(h1.innerHTML).toContain(title);
  });

  test("debe mostrar el título en un h1 buscando por el test-title", () => {
    const title = "Hola, Soy Goku";
    const subtitle = "Hola, Soy un subtitulo";
    const { getByText, getByTestId } = render(
      <FirstApp titulo={title} subtitulo={subtitle} />
    );

    expect(getByText(title.trim())).toBeTruthy();

    expect(getByTestId("test-title").innerHTML).toContain(title);
  });

  test("debe mostrar el subtitulo enviado por props", () => {
    const title = "Hola, Soy Goku";
    const subTitle = "Soy u n subtitulo";
    const { getAllByText, getByText } = render(
      <FirstApp titulo={title} subtitulo={subTitle} />
    );

    // expect(getByText(subTitle)).toBeTruthy();
    // expect(getAllByText(subTitle).length).toBe(2);
    expect(getAllByText(subTitle).length).toBeGreaterThan(1);
  });

});
