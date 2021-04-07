import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { cartItem } from "../types/index";
/*
STATE TYPE
*/

type CartState = {
  cart: cartItem[] | null;
};

// dispatch type
type CartDispatch = {
  setCart: Dispatch<SetStateAction<cartItem[] | null>>;
};

/*
STATE TYPE
*/

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined);

const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<cartItem[] | null>(null);

  return (
    <CartStateContext.Provider value={{ cart }}>
      <CartDispatchContext.Provider value={{ setCart }}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => {
  const cartState = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);

  if (cartState === undefined || cartDispatch === undefined)
    throw new Error("useCartContext must be used within a CartContextProvider");

  return {
    ...cartState,
    ...cartDispatch,
  };
};
