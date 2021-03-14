import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { ProductTab, Product } from "../types/index";
import {
  productsRef,
  snapshotToDoc,
  productsCountsRef,
} from "../firebase/index";

import { useAsyncCall } from "../hooks";

interface IProductContextProps {}

type Products = { [key in ProductTab]: Product[] };
type ProductCounts = { [key in ProductTab]: number };

// product state
type ProductsState = {
  products: Products;
  loading: boolean;
  productCounts: ProductCounts;
  error: string;
};
type ProductsDispatch = {
  setProducts: Dispatch<SetStateAction<Products>>;
};

// Products state (providers)
const ProductsStateContext = createContext<ProductsState | undefined>(
  undefined
);
const ProductsDispatchContext = createContext<ProductsDispatch | undefined>(
  undefined
);

// initial state
const initialProduct: Products = {
  All: [],
  Clothing: [],
  Shoes: [],
  Watches: [],
  Accessories: [],
};
const initialProductCounts: ProductCounts = {
  All: 0,
  Clothing: 0,
  Shoes: 0,
  Watches: 0,
  Accessories: 0,
};

export const ProductsContextProvider: React.FC<IProductContextProps> = ({
  children,
}) => {
  const [products, setProducts] = useState(initialProduct);
  const [productCounts, setProductCounts] = useState(initialProductCounts);
  const { error, setError, loading, setLoading } = useAsyncCall();

  useEffect(() => {
    setLoading(true);

    // fetch products collection from firestore
    const unsubscribe = productsRef.orderBy("createdAt", "desc").onSnapshot({
      next: (snapshots) => {
        const allProducts: Product[] = [];

        snapshots.forEach((snapshot) => {
          const product = snapshotToDoc<Product>(snapshot);

          allProducts.push(product);
        });
        const updatedProducts: any = {};

        Object.keys(initialProduct).forEach((cat) => {
          const category = cat as ProductTab;

          category === "All"
            ? (updatedProducts.All = allProducts)
            : (updatedProducts[category] = allProducts.filter(
                (item) => item.category === category
              ));
        }); // [All, Clothing, Shoes and so on and so forth]
        setProducts(updatedProducts);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetch the product-counts collection from firestore
  useEffect(() => {
    const unsubscribe = productsCountsRef
      .doc("counts")
      .onSnapshot((snapshot) => {
        const countsData = snapshot.data() as ProductCounts;

        setProductCounts(countsData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ProductsStateContext.Provider
      value={{ products, loading, error, productCounts }}
    >
      <ProductsDispatchContext.Provider value={{ setProducts }}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
};

export default ProductsContextProvider;

export const useProductContext = () => {
  const productState = useContext(ProductsStateContext);
  const productDisptach = useContext(ProductsDispatchContext);

  if (productState === undefined || productDisptach === undefined) {
    throw new Error(
      "useProductContext must be used within a ProductsContextProvider"
    );
  }

  return {
    productState,
    productDisptach,
  };
};
