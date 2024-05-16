import { CallToAction, CallToActionText, SecondaryCallToAction } from '../../../styled-components/buttons';
import { Image, ScrollView, Text, View } from 'react-native';

import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ParagraphSemibold } from '../../../styled-components/text';
import Product from '../../../models/productModel';
import React from 'react';
import { ViewContainer } from '../../../styled-components/view';
import { addProductToCart } from '../../../store/cart/actions';
import { globalStyles } from '../../../global-styles';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useProductContext } from '../../../contexts/product-context';

interface ProductItemProps {
    item: Product;
    style: any;
}

const width = Dimensions.get('window').width;

const ProductItem: React.FC<ProductItemProps> = ({ item, style }) => {
    const { formatToCurrency } = useProductContext();

    const { cartLength, cartProducts } = useAppSelector((store) => store.cart)
    const dispatch = useDispatch();

    const price = formatToCurrency(item?.unit_price);
    let [priceDezenas, priceCents] = price.slice(2).split(',');
    priceCents = ',' + priceCents.slice();

    return (
        <ViewContainer style={[globalStyles.roundedHidden, { ...style }]}>
            <Image
                className={`align-top object-contain`}
                style={{
                    height: 150,
                    resizeMode: 'contain',
                    backgroundColor: 'white',
                }}
                source={{ uri: item?.url_img }}
            />
            <View className='p-1'>
                <View>
                    <ParagraphSemibold className={`text-ellipsis`}
                        style={{ fontSize: 10 }}
                        numberOfLines={1}>
                        {item?.description.toUpperCase()}
                    </ParagraphSemibold>
                </View>
                <View className='flex-row justify-between items-center pt-1'>
                    <ParagraphSemibold>
                        R$<Text className={`text-lg font-bold`}>{priceDezenas}</Text>{priceCents}
                    </ParagraphSemibold>

                    {item.description.split(' ').includes("KG") ? (
                        <Text>{''}</Text>
                    ) : (
                        <>
                            {cartProducts && cartLength == 10 ? (
                                <SecondaryCallToAction>
                                    <CallToActionText>
                                        <Ionicons size={14} name="md-cart-outline" color="white" />
                                        {' Cheio'}
                                    </CallToActionText>
                                </SecondaryCallToAction>
                            ) : (
                                <CallToAction
                                    activeOpacity={.5}
                                    onPress={() => {
                                        dispatch(addProductToCart({ ...item, quantity: 1 }))
                                    }}
                                >
                                    <CallToActionText>
                                        <FontAwesome name="cart-arrow-down" size={16} />
                                    </CallToActionText>
                                </CallToAction>
                            )}
                        </>
                    )}
                </View>
            </View>
        </ViewContainer>
    );
};

function FeaturedProducts() {
    const { products } = useProductContext();

    return (
        <ScrollView
            className=''
            horizontal
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 8 }}
        >
            {products?.map((item, index) => (
                <ProductItem
                    key={index}
                    item={item}
                    style={{ width: width / 2.3, marginRight: 8 }}
                />
            ))}
        </ScrollView>
    );
}

export default FeaturedProducts;