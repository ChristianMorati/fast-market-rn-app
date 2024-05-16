import { BasePage } from '../../components/base-page';
import CartProducts from '../../components/products/cart-products';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProductBarCodeScanner from '../../components/products/product-barcode-scanner/product-barcode-scanner';
import React from 'react';
import { ViewContainer } from '../../styled-components/view';
import { globalStyles } from '../../global-styles';

function Products() {

  return (
    <GestureHandlerRootView>
      <BasePage style={{ marginTop: 8 }} children={
        <>
          <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
            <ProductBarCodeScanner />
          </ViewContainer>
          <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
            <CartProducts />
          </ViewContainer>
        </>
      }>
      </BasePage>
    </GestureHandlerRootView >
  );
};

export default Products;