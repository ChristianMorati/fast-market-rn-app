import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "./initialState";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
    baseURL: 'http://192.168.1.41:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


const fetchProductById = async (id: string): Promise<CartItem | undefined> => {
    return new Promise(async (resolve, reject) => {
        const token = await AsyncStorage.getItem('TOKEN');
        const response = await instance.get(`product/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        if (response.status !== 200) { reject(undefined); }

        const product = response.data;
        resolve(product);
    })
};

export const loadProductsById = createAsyncThunk(
    'product/cartItemsPartial',
    async (items: Partial<CartItem[]>, thunkAPI) => {
        try {
            const promises = items.map(product => fetchProductById(product?.id));
            const responseData = await Promise.all(promises);
            return responseData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

