import { createContext } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProdiver = (props) => {
  const contextValue = {all_product}

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )

}

export default ShopContextProdiver;