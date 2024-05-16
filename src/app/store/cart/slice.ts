import { CartItem, CartState } from './initialState';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState'
import showToast from '../../utils/toaster';

const calculateCartLength = (cartProducts: CartItem[]) => {
    var cartLength = 0;
    cartProducts.map((product) => {
        cartLength += product.description!.split(' ').includes("KG") ? 1 : product.quantity!;
    });

    return cartLength;
};

const calculateCartSum = (cartProducts: CartItem[]) => {
    return cartProducts.reduce((total, product) => total + product.unit_price! * product.quantity!, 0);
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment(state) {
            const canAdd = 10 - state.cartLength;
            if (canAdd >= 1 && state.itemsYouCanAdd < canAdd) {
                state.itemsYouCanAdd += 1;
            }
        },
        decrement(state) {
            if (state.itemsYouCanAdd > 1) {
                state.itemsYouCanAdd -= 1;
            }
        },
        addProductToCart: (state: CartState, action: PayloadAction<CartItem>) => {
            const cartLength = calculateCartLength(state.cartProducts)

            const isCartFull = cartLength === 10;
            if (isCartFull) return console.log('isCartFull'); //

            // IS KG
            const productDescription = action.payload.description;
            const isKGProduct = productDescription!.split(" ").includes("KG");

            const itemsToAdd = action.payload?.quantity ?? 1;
            const productIndex = state.cartProducts.findIndex((product: CartItem) => product.code === action.payload.code);

            if (isKGProduct) {
                state.cartProducts.push({
                    ...action.payload,
                    quantity: itemsToAdd,
                });

                state.cartLength = calculateCartLength(state.cartProducts);
                state.cartSum = calculateCartSum(state.cartProducts);
                return;
            };

            /*
                https://barcode.tec-it.com/en/QRCode?data=%7B%22id%22%3A%208%2C%22code%22%3A%20%2212345675%22%2C%22description%22%3A%20%22P%C3%83O%20FRANC%C3%8AS%20KG%22%2C%22unit_price%22%3A%2016.00%2C%22url_img%22%3A%20%22https%3A%2F%2Fwww.jauserve.com.br%2Fdw%2Fimage%2Fv2%2FBFJL_PRD%2Fon%2Fdemandware.static%2F-%2FSites-jauserve-master%2Fdefault%2Fdwfc43c8bb%2F7150.png%3Fsw%3D1800%22%2C%22quantity%22%3A%201.2%7D
            */

            // IS UN
            const canAdd = (itemsToAdd + cartLength) <= 10;

            if (!canAdd) return console.log('cart full'); //

            if (productIndex !== -1) {
                state.cartProducts[productIndex].quantity! += itemsToAdd
            } else {
                state.cartProducts.push({
                    ...action.payload,
                    quantity: itemsToAdd,
                });
            }

            state.cartLength = calculateCartLength(state.cartProducts);
            state.cartSum = calculateCartSum(state.cartProducts);

            showToast('success', 'Adicionado com sucesso!', '');
        },
        removeProductFromCart: (state: CartState, action: PayloadAction<CartItem>) => {
            if (state.cartProducts.length === 0) return;

            const productIndex = state.cartProducts.findIndex((product: CartItem) => product.code === action.payload.code);

            if (productIndex === -1) return;

            const productToDecrement = state.cartProducts[productIndex];
            const isKGProduct = action.payload.description!.split(" ").includes("KG");

            if(isKGProduct) {
                state.cartProducts.splice(productIndex, 1);
            }

            if (productToDecrement.quantity! > 1) {
                state.cartProducts[productIndex].quantity! -= 1;
            } else {
                state.cartProducts.splice(productIndex, 1);
            }

            state.cartLength = calculateCartLength(state.cartProducts);
            state.cartSum = calculateCartSum(state.cartProducts);

            showToast('success', 'Removido com sucesso!', '');
        },
        reset(state) {
            Object.assign(state, initialState)
        },
    },
    extraReducers: (builder) => {
        builder.addCase('resetCartSlice', (state, action) => {
            return initialState;
        });
    },
});