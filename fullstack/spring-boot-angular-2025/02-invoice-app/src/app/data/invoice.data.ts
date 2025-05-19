import { Invoice } from "../models";

export const invoiceData: Invoice = {
  id: 1,
  name: "Componentes de PC",
  client: {
    name: "Edual Dan",
    lastName: "Sarmiento",
    address: {
      country: "Bolivia",
      city: "El Alto",
      street: "Calle Portocoarrero",
      number: 1234,
    },
  },
  company: {
    name: "Tech Store",
    fiscalNumber: 123456789,
  },
  items: [
    {
      id: 1,
      product: "Placa madre A520M",
      price: 950.0,
      quantity: 1,
    },
    {
      id: 2,
      product: "CPU Ryzen 5 5600G",
      price: 2100.00,
      quantity: 1,
    },
    {
      id: 3,
      product: "Memoria RAM 16GB",
      price: 850.00,
      quantity: 1,
    },
    {
      id: 4,
      product: "Teclado Mecánico Redragon K552",
      price: 420.00,
      quantity: 1,
    },
  ],
};
