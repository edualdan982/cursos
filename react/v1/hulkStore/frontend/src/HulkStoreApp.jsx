import { useEffect, useState } from "react";
import "./style.css";
import { AddCategory } from "./component/AddCategory";
import { GidGrid } from "./component/GidGrid";
import { getProductos } from "./helpers/getProductos";

export const HulkStoreApp = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const nombreProductos =  getProductos();
    console.log(nombreProductos);
    // setCategories([nombreProductos, ...categories]);
  }, [])
  
  const onAddCategory = (newCategory) => {
    
    if (categories.includes(newCategory)) return;
    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      <h1>HULK STORE APP</h1>

      <AddCategory onNewCategory={(value) => onAddCategory(value)} />

      {categories.map((category) => (
        <GidGrid key={category} category={category} />
      ))}
    </>
  );
};
