import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { cartRef, snapshotToDoc } from "../firebase";
import { useAsyncCall } from "../hooks";
import { cartItem } from "../types/index";
import { useAuthContext } from "./authContext";
import { useProductContext } from "./productContext";

/*
STATE TYPE
*/

type CartState = {
  cart: cartItem[] | null;
  loading: boolean;
  error: string;
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

  const {
    authState: { authUser },
  } = useAuthContext();

  const { loading, setLoading, error, setError } = useAsyncCall();

  const {
    productState: {
      products: { All },
    },
  } = useProductContext();

  useEffect(() => {
    setLoading(true);
    if (!authUser) {
      // user not authenticated
      setCart(null);
      setLoading(false);
      return;
    }

    if (All.length === 0) return;

    // user is authenticated
    const unsubscribe = cartRef
      .where("user", "==", authUser.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot({
        next: (snapshots) => {
          const cart: cartItem[] = [];
          snapshots.forEach((snapshot) => {
            const cartItem = snapshotToDoc<cartItem>(snapshot);
            const product = All.find((prod) => prod.id === cartItem.product);

            if (!product) return;

            cart.push({ ...cartItem, item: product });
          });

          setCart(cart);
        },
        error: (err) => {
          setError(err.message);
          setLoading(false);
        },
      });
    return () => unsubscribe();
  }, [authUser, setCart, setLoading, setError, All]);

  return (
    <CartStateContext.Provider value={{ cart, loading, error }}>
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
