import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_API } from '../../../config';
import Product from '../models/productModel';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

interface ProductContextProps {
  isLoadingProducts: boolean;
  setIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
  sumProducts: number;
  cartProducts: Product[];
  products: Product[] | undefined;
  setProducts: Dispatch<SetStateAction<Product[] | undefined>>;
  LoadProducts: () => Promise<Product[] | undefined>;
  getProductByCode: (code: string) => Promise<Product | undefined>;
  showToast: (type: 'success' | 'error', text1: string, text2: string) => void;
  formatToCurrency: (value: number) => string;
}

export const ProductContext = createContext<ProductContextProps>({} as ProductContextProps);

export default function ProductProvider({ children }: { children: React.ReactNode }) {
  const BaseUrlApi: string = `${BASE_URL_API}/product`;

  const [sumProducts, setSumProducts] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  useEffect(() => {
    getCartProductsLocalStorage();
  }, []);

  useEffect(() => {
    if (cartProducts) {
      const total: number = cartProducts.reduce((accumulator, product) => accumulator + product.unit_price, 0);
      setSumProducts(Number(total.toFixed(2)));
    }

    setCartProductsLocalStorage();
  }, [cartProducts]);


  const setCartProductsLocalStorage = async () => {
    await AsyncStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  };

  const getCartProductsLocalStorage = async () => {
    const alreadyAdded = await AsyncStorage.getItem('cartProducts');
    setCartProducts(JSON.parse(alreadyAdded!));
  };

  const LoadProducts = async (): Promise<Product[] | undefined> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.get(BaseUrlApi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      if (response.status !== 200) {
        reject(undefined);
      }

      const products = response.data;
      setProducts(products);
      resolve(products);
    });
  };

  const getProductByCode = async (code: string): Promise<Product | undefined> => {
    let product: Product | undefined;

    try {
      const q = query(collection(db, "products"), where("code", "==", code));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        product = {
          id: doc.id,
          code: doc.data().code,
          ...doc.data()
        } as Product;
      });

    } catch (error) {
      console.error("Error fetching product:", error);
      product = undefined;
    }

    return product;
  };

  const showToast = (type: 'success' | 'error', text1: string, text2: string): void => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 1000,
      autoHide: true,
      text1Style: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      text2Style: {
        fontSize: 14,
        fontWeight: '500',
      },
    });
  };

  const formatToCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  };

  return (
    <ProductContext.Provider value={{
      isLoadingProducts,
      setIsLoadingProducts,
      sumProducts,
      cartProducts,
      products,
      setProducts,
      getProductByCode,
      LoadProducts,
      showToast,
      formatToCurrency,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProductContext() {
  const context = useContext(ProductContext);
  return context;
};