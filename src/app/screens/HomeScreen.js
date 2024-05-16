import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { purchaseService } from "../services/PurchaseService"
import { LoadingIndicator } from "../components";
import { LastPurchase } from "../components/last-purchase";
import Header from "../components/header";
import Destaque from "../components/emphasis";
import { ScapeFromBottomTab } from "../components/scape-from-bottom-tabs";
import { BasePage } from "../components/base-page";
import { ViewContainer } from "../styled-components/view";
import { globalStyles } from "../global-styles";
import { Button } from "react-native";
import { auth, db } from "../../../firebaseConfig";
import { Timestamp, addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";

export const HomeScreen = ({ navigation }) => {
  const [lastPurchase, setLastPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

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

        {/* <Button title="set purchase" onPress={async () => {

          const purchaseRef = collection(db, "purchases");

          try {
            let lastPurchase = await addDoc(purchaseRef, {
              date: Timestamp.fromDate(new Date()),
              items: [
                {
                  product: doc(db, "products", "zd06yUkAAD1kBFjehZXY"),
                  qtt: 1,
                }
              ],
              total: 10,
              redeemed: false,
            });
            const lastPurchaseId = lastPurchase.id;

            const userRef = doc(db, "users", auth.currentUser.uid);

            await updateDoc(userRef, {
              purchases: arrayUnion(
                doc(db, "purchases", lastPurchaseId)
              )
            });

          } catch (e) {
            console.error('Error saving purchase:', e);
          }
        }}></Button> */}
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              {lastPurchase ? (
                <LastPurchase purchase={lastPurchase} />
              ) : (
                <Text>Sem compras anteriores</Text>
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