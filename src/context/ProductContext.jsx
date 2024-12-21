import { useState } from "react";
import { createContext } from "react"


export const ProductContext = createContext();


export const ProductContextProvider = ({children}) => {

    const [ Productsdata , setProductsData] = useState([]);

    const values = {Productsdata,setProductsData}

    return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
}