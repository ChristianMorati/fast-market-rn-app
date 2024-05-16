import { Image, Text, View, Dimensions, Pressable } from "react-native"
import { styles } from "./style"
import { useNavigation } from "@react-navigation/native"
import { ParagraphSemibold, Title } from "../../styled-components/text"
import { useProductContext } from "../../contexts/product-context"
import { CallToActionMD, CallToActionText } from "../../styled-components/buttons"
import AntDesign from '@expo/vector-icons/AntDesign';
import useDeviceTheme from "../../theme/use-theme"
import { Purchase } from "../../contexts/purchase-context"
import Product from "../../models/productModel"

export const LastPurchase = ({ purchase }) => {
  const navigation = useNavigation()
  const width = Dimensions.get('window').width;
  const { formatToCurrency } = useProductContext()
  const total = formatToCurrency(purchase.total);
  const { theme } = useDeviceTheme();

  var productWidth: number;

  if (width <= 300) {
    productWidth = 50;
  } else {
    productWidth = (width / 5) - 10
  }

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date?.seconds * 1000).toLocaleDateString('pt-BR', options);
  };
  const formattedDate = formatDate(purchase.date);

  return (
    <View style={styles.container}>
      <View style={styles.headerDetails}>
        <Title>Última Compra</Title>
        <ParagraphSemibold>{formattedDate}</ParagraphSemibold>
        {purchase.redeemed == false && (
          <Pressable
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: theme.color
            }}
            onPress={() => navigation.navigate('UnlockAccess')}
          >
            <AntDesign name="qrcode" size={24} color="black" />
          </Pressable>
        )}
      </View>

      <View style={styles.filho}>
        {purchase.items.map((item: Product, index: number) => {
          return (
            <View key={index} style={{ width: productWidth }}>
              <Image style={styles.product} source={{ uri: item.img_url }} />
              <Text className="absolute rounded-sm bg-red-500 text-white px-1">{item.quantity}</Text>
            </View>
          )
        })}
      </View>

      <View style={styles.buttonContainer}>
        <ParagraphSemibold>TOTAL: {total}</ParagraphSemibold>
        <CallToActionMD
          onPress={() => navigation.navigate("PurchaseHystory")}
        >
          <CallToActionText>Histórico</CallToActionText>
        </CallToActionMD>
      </View>
    </View>
  )
}