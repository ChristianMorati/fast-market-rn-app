import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import Product from '../models/productModel';

type Purchase = {
  id: any,
  _userId: string,
  date: any,
  items: Product[],
  redeemed: boolean,
  total: number
}

interface PurchaseContextProps {
  lastPurchase: Purchase | undefined;
  setLastPurchase: Dispatch<SetStateAction<Purchase | undefined>>;
}

export const PurchaseContext = createContext<PurchaseContextProps>({} as PurchaseContextProps);

export default function PurchaseProvider({ children }: { children: ReactNode }) {
  const [lastPurchase, setLastPurchase] = useState<Purchase | undefined>(undefined);

  return (
    <PurchaseContext.Provider value={{
      lastPurchase,
      setLastPurchase
    }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchaseContext() {
  const context = useContext(PurchaseContext);
  return context;
}