import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_API } from '../../../config';
import axios from 'axios';
import { reset } from '../store/cart/actions';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector';
import useDeviceTheme from '../theme/use-theme';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { Timestamp, addDoc, collection, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { usePurchaseContext } from './purchase-context';

interface PaymentContextProps {
  makePaymentIntent: (amount: number) => any;
  onCheckout: () => void;
}

export const PaymentContext = createContext<PaymentContextProps>({} as PaymentContextProps);

export default function PaymentProvider({ children }: { children: ReactNode }) {

  // <stripe vars
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  //  stripe />

  const navigation = useNavigation();

  const { userInfo } = useAppSelector(store => store.user);
  const { cartSum, cartProducts } = useAppSelector((store) => store.cart);
  const { setLastPurchase } = usePurchaseContext();

  const { theme } = useDeviceTheme()
  const dispatch = useAppDispatch();

  const makePaymentIntent = async (Amount: number) => {
    try {
      const response = await axios.post(`${BASE_URL_API}/payment/intent`,
        {
          username: userInfo.username,
          amount: Amount,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.data
      return data;
    } catch (error) {
      return undefined;
    }
  };


  const onCheckout = async () => {
    try {
      const paymentIntent = await makePaymentIntent(Math.round(cartSum * 100));

      if (!paymentIntent) return Alert.alert('Cartão de Crédito', "Ocorreu um erro ao obter pedido de pagamento.\n\nTente novamente.");

      const customAppearance = {
        shapes: {
          borderRadius: 12,
          borderWidth: 0.5,
        },
        primaryButton: {
          shapes: {
            borderRadius: 20,
          },
        },
        colors: {
          primary: theme.callToActionBackground,
          background: theme.pageBackgroundColor,
          componentBackground: theme.containerBackgroundColor,
          componentBorder: theme.borderColor,
          componentDivider: theme.borderColor,
          primaryText: theme.color,
          secondaryText: theme.color,
          componentText: theme.color,
          placeholderText: '#a3a6af',
        },
      };

      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'mercadinho_do_zé',
        paymentIntentClientSecret: paymentIntent.paymentIntent,
        appearance: customAppearance,
        // customerId: paymentIntent.id,
      });

      if (initResponse.error) {
        return Alert.alert('error ' + initResponse.error);
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        return Alert.alert(error.code, error.message);
      };

      Alert.alert("Pagamento realizado!", 'Everything`s fine :)')
    } catch (error) {
      console.log(error)
      return Alert.alert("Ocorreu um erro no Pagamento: " + error);
    }

    // register transaction in db
    const purchaseRef = collection(db, "purchases");
    try {
      let lastPurchaseDocRef = await addDoc(purchaseRef, {
        _userID: auth?.currentUser?.uid,
        date: Timestamp.fromDate(new Date()),
        items: cartProducts,
        total: cartSum,
        redeemed: false,
      });

      let lastPurchaseSnapshot = await getDoc(lastPurchaseDocRef);

      if (lastPurchaseSnapshot.exists()) {
        const lastPurchase = {
          id: lastPurchaseSnapshot.id,
          ...lastPurchaseSnapshot.data()
        }

        setLastPurchase(lastPurchase);

        console.log(lastPurchase);

      } else {
        console.log("Documento da última compra não encontrado.");
      }

    } catch (e) {
      console.error('Error saving purchase:', e);
    }

    // limpar carrinho
    dispatch(reset())

    // redirect to success page
    navigation.navigate('UnlockAccess');
  }

  return (
    <PaymentContext.Provider value={{
      makePaymentIntent,
      onCheckout
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  return context;
}