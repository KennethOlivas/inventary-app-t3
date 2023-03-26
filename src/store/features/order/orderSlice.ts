import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Customer, Product } from "@prisma/client";

// Define a type for the slice state
interface NewProduct extends Product {
  quantity: number;
}

interface Order {
  status: "PENDING" | "COMPLETED" | "CANCELED";
  total: number;
  subTotal: number;
  iva: number;
  shipping: boolean;
}

interface Shipping {
  address: string;
  city: string;
  status: "REDY_TO_SHIP" | "SHIPPED" | "DELIVERED";
  name: string;
  price: number;
}

interface OrderState {
  products: NewProduct[] | null;
  customer: Customer | null;
  order: Order | null;
  shipping: {
    address: string;
    city: string;
    status: "REDY_TO_SHIP" | "SHIPPED" | "DELIVERED";
    name: string;
    price: number;
  } | null;
}

type updateProduct = {
  id: string;
  quantity: number;
};

type Delete = {
  id: string;
};

// Define the initial state using that type
const initialState: OrderState = {
  customer: null,
  order: null,
  products: null,
  shipping: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<NewProduct>) => {
      state.products = state.products
        ? [...state.products, action.payload]
        : [action.payload];
    },
    updateQuantity: (state, action: PayloadAction<updateProduct>) => {
      console.log("action", action.payload);

      if (state.products) {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            console.log("product", product);

            return {
              ...product,
              quantity: action.payload.quantity,
            };
          }
          return product;
        });
      }
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.order = {
        status: action.payload.status,
        total: Number(action.payload.total.toFixed(2)),
        subTotal: Number(action.payload.subTotal.toFixed(2)),
        iva: Number(action.payload.iva.toFixed(2)),
        shipping: false,
      };
    },
    addShipping: (state, action: PayloadAction<Shipping | null>) => {
      if (state.order) {
        state.order.shipping = true;
      }
      if (!action.payload) {
        state.shipping = null;
        return;
      }
      state.shipping = {
        address: action.payload.address,
        city: action.payload.city,
        status: "REDY_TO_SHIP",
        name: action.payload.name,
        price: action.payload.price,
      };
    },
    updateShipping: (state, action: PayloadAction<Shipping>) => {
      if (state.shipping) {
        state.shipping = {
          address: action.payload.address,
          city: action.payload.city,
          status: "REDY_TO_SHIP",
          name: action.payload.name,
          price: action.payload.price,
        };
      }
    },
    deleteShipping: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.shipping = null;
        if (state.order) {
          state.order.shipping = false;
        }
      }
    },
    deleteProduct: (state, action: PayloadAction<Delete>) => {
      if (state.products) {
        const deletedProduct = state.products.find(
          (product) => product.id === action.payload.id
        );

        if (state.order && deletedProduct) {
          state.order.total -= deletedProduct.price;
          state.order.subTotal -= deletedProduct.price;
          state.order.iva -= deletedProduct.price * 0.15;
        }
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    deleteCustomer: (state) => {
      state.customer = null;
    },

    resetOrder: (state) => {
      state.customer = null;
      state.order = null;
      state.products = null;
      state.shipping = null;
    },
  },
});

export const {
  addProduct,
  addCustomer,
  addOrder,
  addShipping,
  deleteProduct,
  deleteCustomer,
  deleteShipping,
  resetOrder,
  updateShipping,
  updateQuantity,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
