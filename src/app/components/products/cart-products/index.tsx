import { CallToAction, CallToActionMD, CallToActionText, SecondaryCallToAction } from '../../../styled-components/buttons';
import { Image, Pressable, Text, View } from 'react-native';
import { Paragraph, ParagraphBold, ParagraphSemibold, Title } from '../../../styled-components/text';
import { addProductToCart, removeProductFromCart } from '../../../store/cart/actions'

import { CartItem } from '../../../store/cart/initialState';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { ViewContainerSecondary } from '../../../styled-components/view';
import colors from 'tailwindcss/colors';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../../../contexts/product-context';

const priceColor = colors.green[600];

interface ProductItemProps {
    item: CartItem;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
    const dispatch = useDispatch();
    const { formatToCurrency } = useProductContext();

    const leftAction = () => {
        return (
            <Pressable
                className='flex justify-center items-center bg-red-500 rounded-l-md'
                style={{
                    width: 50,
                }}
                onPress={() => {
                    setTimeout(() => {
                        dispatch(removeProductFromCart(item));
                    }, 200)
                }}
            >
                <Feather name="trash-2" size={24} color="white" />
            </Pressable>
        )
    }

    function isKgProduct(item: CartItem) {
        return item.description!.split(' ').includes("KG")
    }

    return (
        <Swipeable
            renderLeftActions={leftAction}>
            <ViewContainerSecondary style={{
                borderWidth: 0,
                borderBottomWidth: .5,
                paddingHorizontal: 10,
                paddingVertical: 5,
            }}>
                <View className='flex-row items-center justify-between'>
                    <Text
                        className='absolute z-10 left-0 top-1 font-bold text-white bg-sky-400 border border-white px-2'>
                        {item.quantity}
                        {isKgProduct(item) ? "KG" : ""}
                    </Text>
                    <Image source={{ uri: item?.img_url }}
                        style={{
                            width: '20%',
                            height: 80,
                            resizeMode: 'contain',
                            marginBottom: 8,
                            marginRight: 2,
                        }}
                    />
                    {isKgProduct(item) ? (
                        <CallToAction
                            style={{ backgroundColor: 'red' }}
                            onPress={() => dispatch(removeProductFromCart(item))}
                        >
                            <CallToActionText>
                                <Feather name="trash-2" size={20} color="white" />
                            </CallToActionText>
                        </CallToAction>
                    ) : (
                        <View
                            className='flex flex-row justify-between items-center'
                        >
                            <SecondaryCallToAction className='w-6 py-1'
                                onPress={() => dispatch(removeProductFromCart(item))}>
                                <ParagraphSemibold
                                    style={{ color: 'white' }}
                                >
                                    -
                                </ParagraphSemibold>
                            </SecondaryCallToAction>
                            <View className='px-2'>
                                <ParagraphSemibold
                                >
                                    {item?.quantity}
                                </ParagraphSemibold>
                            </View>
                            <CallToAction
                                onPress={() => dispatch(addProductToCart({ ...item, quantity: 1 }))}>
                                <CallToActionText>+</CallToActionText>
                            </CallToAction>
                        </View>
                    )}
                </View>
                <ParagraphSemibold
                    style={{ fontSize: 12, paddingBottom: 4 }}
                    numberOfLines={1} ellipsizeMode="tail">
                    {item.description!.toUpperCase()}
                </ParagraphSemibold>
                <View className='flex-row justify-between'>
                    <Paragraph>{`${item.quantity!} * ${formatToCurrency(item.unit_price!)}`}</Paragraph>
                    <ParagraphBold
                        style={{ color: priceColor }}
                        numberOfLines={1} ellipsizeMode="middle"
                    >
                        {`${formatToCurrency(item.quantity! * item.unit_price!)}`}
                    </ParagraphBold>
                </View>
            </ViewContainerSecondary>
        </Swipeable>
    );
};

const CartProducts = () => {
    const { formatToCurrency } = useProductContext();
    const navigation: NavigationType = useNavigation();
    const { cartSum, cartLength, cartProducts } = useAppSelector((store) => store.cart)

    return (
        <>
            <View className="flex-row justify-between items-center">
                <Title>Carrinho</Title>
                <ParagraphBold
                    style={{ color: cartLength < 10 ? priceColor : colors.red[500] }}
                >
                    no carrinho: {cartLength ?? 0}
                </ParagraphBold>
                <ParagraphBold>máximo: 10</ParagraphBold>
            </View>
            {cartLength == 0 ? (
                <ParagraphSemibold style={{ paddingVertical: 4 }}>Sem produtos.</ParagraphSemibold>
            ) : (
                <>
                    {cartProducts.map((item: CartItem, index) => (<ProductItem key={index} item={item} />))}
                    <View className='flex-row justify-between py-4 px-2'>
                        <ParagraphBold>TOTAL:</ParagraphBold>
                        <ParagraphBold style={{ color: priceColor }}>{formatToCurrency(cartSum)}</ParagraphBold>
                    </View>
                    <View className="flex justify-center items-center my-4">
                        <CallToActionMD
                            onPress={() => { navigation.navigate('Payment') }}>
                            <CallToActionText>Finalizar</CallToActionText>
                        </CallToActionMD>
                    </View>
                </>
            )}
        </>
    );
};

export default CartProducts;