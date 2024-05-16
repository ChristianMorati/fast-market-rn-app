import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CallToAction, SecondaryCallToAction } from '../../../styled-components/buttons';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalContainer, ModalContent, ModalText, ModalTitle } from '../../../styled-components/modal';
import { ParagraphBold, Title } from '../../../styled-components/text';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';
import AlertModal from './modal';
import { AntDesign } from '@expo/vector-icons';
import { CartItem } from '../../../store/cart/initialState';
import { Input } from '../../../styled-components/text-input';
import Scanner from '../../scanner/scanner';
import { addProductToCart } from '../../../store/cart/actions';
import colors from 'tailwindcss/colors';
import { globalStyles } from '../../../global-styles';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import useDeviceTheme from '../../../theme/use-theme';
import { useDispatch } from 'react-redux';
import { useProductContext } from '../../../contexts/product-context';
import { useRef } from 'react';

const ProductBarCodeScanner: React.FC = () => {
  const dispatch = useDispatch();
  const { formatToCurrency, getProductByCode } = useProductContext();
  const { cartLength } = useAppSelector((store) => store.cart);

  const canAdd = 10 - cartLength;

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [data, setData] = useState<string>('');
  const [scannerActive, setScannerActive] = useState(false);
  const [code, setCode] = useState('');

  const [productFounded, setProductFounded] = useState<Boolean>(false);
  const [productFoundedError, setProductFoundedError] = useState<string>('');
  const [isLoadingProduct, setIsLoadingProduct] = useState<Boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const [product, setProduct] = useState<CartItem | undefined>(undefined);
  const { theme } = useDeviceTheme()

  useFocusEffect(
    useCallback(() => {
      setScannerActive(true);

      return () => {
        setScannerActive(false);
      };
    }, [])
  );

  const onCodeScanned = (type: string, data: string) => {

    if (canAdd === 0) {
      return Alert.alert(
        'Eba!',
        `O carrinho está cheio!\nVocê está pronto para seguir para o pagamento!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('UnlockAccess'),
          },
        ],
      );
    }

    let productObj;

    if (type == "256") {
      try {
        productObj = JSON.parse(data);

        setProduct(productObj);
        setProductFounded(true);
        setModalVisible(true);
      } catch (error) { }
      return;
    }
    setCode(data);
  };

  const clearBarcodeData = () => {
    setData('');
    setCode('');
    setProductFounded(false);
    setProduct(undefined);
    setProductFoundedError('');
  }

  const handleInputChange = (text: string) => {
    setProductFoundedError('');
    return setCode(text);
  };

  const onCloseModal = () => {
    clearBarcodeData();
    setModalVisible(false);
  };

  const defineProduct = async (productSearched: CartItem) => {
    setProduct(productSearched);
    setProductFounded(true);
    textInputRef.current?.blur();
    setModalVisible(true);
    setProductFoundedError('');
  };

  const searchForProduct = async () => {
    setIsLoadingProduct(true);

    try {
      const productSearched = await getProductByCode(code);

      if (!productSearched?.description) {
        throw new Error("Produto não encontrado");
      }

      defineProduct(productSearched);
    } catch (error) {
      setProductFoundedError('Produto não encontrado');
      setProductFounded(false);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    if (code.length === 8 && canAdd === 0) {
      return Alert.alert(
        'Eba!',
        `O carrinho está cheio!\nVocê está pronto para seguir para o pagamento!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('UnlockAccess'),
          },
        ],
      );
    }

    if (code.length >= 8 && canAdd >= 1) {
      searchForProduct();
      return;
    }

    setProductFounded(false);
  }, [code]);

  type AddButtonProps = {
    quantity: number,
    decrement: () => void,
    increment: () => void,
  }

  function AddButton({ quantity, decrement, increment }: AddButtonProps) {
    return (
      <>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ textAlign: 'center', borderRadius: 3, marginVertical: 4, paddingHorizontal: 5, backgroundColor: 'lightgray' }}>
            {product?.quantity ?? quantity}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            style={[styles.decrementButton, { backgroundColor: theme.callToActionBackground }]}
            onPress={() => decrement()}>
            <Text style={styles.buttonText}>{" - "}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.centerButton, { backgroundColor: theme.callToActionBackground }]}
            onPress={() => {
              if (!product) return;
              if (canAdd === 0) return;
              dispatch(addProductToCart({ ...product, quantity: quantity }));
              onCloseModal();
            }}>
            <Text style={styles.buttonText}>{"Adicionar"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.incrementButton, { backgroundColor: theme.callToActionBackground }]}
            onPress={() => increment()}>
            <Text style={styles.buttonText}>{" + "}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const ProductModal = () => {
    const [quantity, setQuantity] = useState(1);
    const priceColor = colors.green[600]

    const increment = () => setQuantity((state) => {
      if (canAdd >= 1 && state < canAdd) {
        return state + 1;
      }
      Alert.alert(
        'Opss..!',
        `Você só pode adicionar mais ${canAdd} item${canAdd > 1 ? 's' : ''}!\nItens no carrinho: ${cartLength}`,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );

      return state;
    });

    const decrement = () => setQuantity((state) => state > 1 ? state - 1 : state);

    const descriptionContains = (text: 'UN' | 'KG') => {
      return product?.description?.split(' ').includes(text)
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          clearBarcodeData();
        }}>
        <ModalContainer>
          <ModalContent>
            <Image
              style={styles.modalImage}
              source={{ uri: product?.img_url }}
            />
            <ModalTitle>Descrição</ModalTitle>
            <ModalText
              numberOfLines={1} ellipsizeMode="tail">
              {product?.description}
            </ModalText>

            {descriptionContains("KG") && code.length === 8 &&
              (
                <ModalText
                  style={[styles.price, { alignSelf: 'flex-end', color: priceColor }]}>
                  {formatToCurrency(product?.unit_price ?? 0)}
                </ModalText>
              )
            }

            {descriptionContains("KG") && code.length !== 8 ?
              (
                <Text
                  style={[styles.price, { alignSelf: 'flex-start', color: priceColor }]}>
                  Total: {`${product?.quantity} * ${product?.unit_price} = ${formatToCurrency(product?.quantity! * product?.unit_price!)}`}
                </Text>
              ) : (
                <Text
                  style={[styles.price, { alignSelf: 'flex-start', color: priceColor }]}>
                  {`${quantity} * ${product?.unit_price}\nTotal = ${formatToCurrency(quantity * product?.unit_price!)}`}
                </Text>
              )
            }

            <View className='justify-center items-center mx-2'>
              {canAdd >= 1 && descriptionContains("KG") ? (
                <CallToAction
                  onPress={() => {
                    if (!product) return;
                    dispatch(addProductToCart({ ...product, quantity: product.quantity ? product.quantity : 1 }));
                    onCloseModal();
                  }}>
                  <Text style={styles.buttonText}>{"Adicionar"}</Text>
                </CallToAction>
              ) : (
                <AddButton quantity={quantity} decrement={decrement} increment={increment} />
              )}
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                onCloseModal();
              }}>
              <Text style={styles.buttonCloseText}>
                <AntDesign name="close" size={12} color="white" />
              </Text>
            </Pressable>
          </ModalContent>
        </ModalContainer>
      </Modal >
    )
  }

  return (
    <>
      {cartLength === 10 && (<AlertModal cta={() => navigation.navigate('UnlockAccess')} />)}
      <Title style={{ textAlign: 'center' }}>Ler código</Title>
      <View style={styles.scannerArea}>
        {scannerActive && isFocused && (
          <Scanner
            onCodeScanned={onCodeScanned}
            clearBarcodeData={clearBarcodeData}
            BarCodeScannerContainerStyle={{ ...globalStyles.BarCodeScannerContainerStyle }}
            BarCodeScannerReScanButtonStyle={{ ...globalStyles.BarCodeScannerReScanButtonStyle }}
          />
        )}

        {!data && (
          <View style={[styles.containerErrorMessage, {
            position: 'absolute',
            top: 5,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }]}>
            <Text style={[styles.errorMessage]}>
              <MaterialCommunityIcons name="barcode-scan" size={16} color="white" />
            </Text>
          </View>
        )}
      </View>

      <View className=''>
        {productFoundedError && (
          <Text
            className='font-medium text-white bg-slate-900 border-2 border-yellow-300 text-center rounded-md py-4 my-1'
          >
            {productFoundedError} <Feather name="alert-triangle" size={12} color={colors.yellow[300]} />
          </Text>
        )}

        {/* messages */}
        {isLoadingProduct && (
          <ActivityIndicator className='p-2 my-2 w-full' />
        )}

        {!productFoundedError && !productFounded && !isLoadingProduct && (
          <ParagraphBold style={{
            textAlign: 'center',
            textDecorationLine: 'underline',
            paddingVertical: 8,
          }}>OU
          </ParagraphBold>
        )}
        {/*end messages */}

        {productFounded && (<ProductModal />)}

        <View className="flex-row justify-start rounded-lg overflow-hidden">
          <Input
            style={{
              width: '85%',
            }}
            placeholder='Digite o Código'
            placeholderTextColor={theme.color}
            keyboardType='numeric'
            onChangeText={handleInputChange}
            ref={textInputRef}
            value={code}
          />
          <SecondaryCallToAction
            style={{ width: '15%', borderRadius: 0 }}
            activeOpacity={0.5}
            onPress={clearBarcodeData}
          >
            <Feather name="trash-2" size={20} color="white" />
          </SecondaryCallToAction>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: { textAlign: 'center', borderRadius: 3, marginVertical: 4, color: 'white', fontWeight: 'bold', fontSize: 16, },
  incrementButton: {
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  centerButton: {
    color: 'white',
    padding: 10,
    marginHorizontal: 1,
  },
  decrementButton: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  scannerArea: {
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  containerErrorMessage: {
    alignItems: 'center',
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'lightgreen',
    paddingVertical: 6,
  },
  containerAdicionar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonAdicionar: {
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonAdicionarText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonLimpar: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  containerInputCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputInsertCode: {
    width: '85%',
    backgroundColor: '#7F8A7D',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    color: 'white',
  },

  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: 300,
    borderColor: 'rgba(255, 255, 255, .3)', // Vermelho com 50% de opacidade
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#080808',
    justifyContent: 'flex-start',
    // borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 10,
  },
  modalImage: {
    width: '100%',
    aspectRatio: '1/1',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: 'black'
  },
  button: {
    position: 'absolute',
    right: 3,
    top: 3,
    padding: 10,
    elevation: 2,
    borderRadius: 6,
  },
  buttonClose: {
    backgroundColor: 'red'
  },
  buttonCloseText: {
    fontWeight: 'bold',
  },
});

export default ProductBarCodeScanner;