export type CartItem = {
    id?: string;
    code?: string;
    img_url: string | undefined;
    description?: string;
    unit_price?: number;
    quantity?: number;
};

export interface CartState {
    cartProducts: CartItem[];
    cartLength: number;
    cartSum: number;
    itemsYouCanAdd: number
}

export const initialState: CartState = {
    cartProducts: [],
    cartLength: 0,
    cartSum: 0,
    itemsYouCanAdd: 0
};

export type cddc = {
    code: "12345673";
    img_url: "https://acdn.mitiendanube.com/stores/001/289/535/products/mockup-minuano-clear-78976641300431-123d350bc08e0bec5f16261858100880-1024-1024.png";
    description: "Detergente Lava Louças Minuano Clear 500ml";
    unit_price: 2.59;
};