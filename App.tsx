import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import PaymentProvider from './src/app/contexts/payment-context';
import ProductProvider from './src/app/contexts/product-context';
import { Provider } from 'react-redux';
import { STRIPE_KEY } from './config';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ThemeProvider } from 'styled-components';
import Toast from 'react-native-toast-message'
import { store } from './src/app/store';
import themes from './src/app/theme'
import { useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthenticatedUserProvider } from './src/app/contexts/AuthenticatedUserProvider';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from './src/app/router/RootNavigator';
import PurchaseProvider from './src/app/contexts/purchase-context';

function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme || 'dark']

  return (
    <>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <PurchaseProvider>
            <NavigationContainer>
              <ExpoStatusBar
                backgroundColor={deviceTheme === 'dark' ? 'black' : 'white'} />
              <ThemeProvider theme={theme}>
                <Provider store={store}>
                  <StripeProvider publishableKey={STRIPE_KEY}>
                    <PaymentProvider>
                      <ProductProvider>
                        <RootNavigator />
                      </ProductProvider>
                    </PaymentProvider>
                  </StripeProvider>
                </Provider>
              </ThemeProvider>
            </NavigationContainer>
          </PurchaseProvider>
          <Toast />
        </SafeAreaProvider>
      </AuthenticatedUserProvider >
    </>
  );
}

export default App;