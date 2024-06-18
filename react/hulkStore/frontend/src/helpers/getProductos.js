export const getProductos = async () => {
  const url = `http://localhost:8080/producto`;
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImE5YjljNGVhLThhMjYtNDEwZi1iMjk5LWQ0NjUyYTk5ODZmYSIsImp3dCI6InVzZXIiLCJjbGllbnRfaWQiOiJodWxrc3RvcmUiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.HVLceJg4Bb8WveCTU6R0XhBa77ebHMPKf2SZP9QbovI",
    },
  });
  const {respuesta} = await resp.json();

  console.log(respuesta);

  return respuesta;

  // const gifs = respuesta.map((producto) => ({
  //   idProducto: producto.idProducto,
  //   title: img.title,
  //   url: img.images.downsized_medium.url,
  // }));
};
