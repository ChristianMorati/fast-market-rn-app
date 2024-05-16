import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { purchaseService } from "../../services/PurchaseService";
import { LoadingIndicator } from "../../components";
import { LastPurchase } from "../../components/last-purchase";
import Header from "../../components/header";
import Destaque from "../../components/emphasis";
import { BasePage } from "../../components/base-page";
import { ViewContainer, ViewContainerSecondary } from "../../styled-components/view";
import { globalStyles } from "../../global-styles";
import { ParagraphSemibold, Title } from "../../styled-components/text";
import { FontAwesome5 } from "@expo/vector-icons";
import useDeviceTheme from "../../theme/use-theme";
import { usePurchaseContext } from "../../contexts/purchase-context";

export const HomeScreen = () => {
  const { lastPurchase, setLastPurchase } = usePurchaseContext()
  const [loading, setLoading] = useState(true);
  const { theme } = useDeviceTheme()

  useEffect(() => {
    purchaseService.getLast()
      .then(lastPurchase => {
        setLastPurchase(lastPurchase);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <BasePage children={
      <>
        <ViewContainer>
          <Header />
        </ViewContainer>
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              {lastPurchase ? (
                <LastPurchase purchase={lastPurchase} />
              ) : (
                <ViewContainer>
                  <Title>Última Compra</Title>
                  <ViewContainerSecondary style={{ marginTop: 6 }}>
                    <View className="flex items-center justify-center gap-2 p-2">
                      <ParagraphSemibold>Suas compras aparecem aqui!</ParagraphSemibold>
                      <FontAwesome5 name="smile" size={24} color={theme.color} />
                    </View>
                  </ViewContainerSecondary>
                </ViewContainer>
              )}
            </>
          )}
        </ViewContainer>
        <View>
          <Destaque />
        </View>
      </>
    }
    >
    </BasePage >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343333'
  },
});