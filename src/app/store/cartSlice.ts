import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: Product[];
  favourite: Product[];
}

const initialState: CartState = {
  items: [],
  favourite: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        toast.info("This item is already in your cart!", {
          position: "top-right",
        });
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success("added to cart", { position: "top-right" });
      }

      // localStorage.setItem("cartItem", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    addToFavourite: (state, action: PayloadAction<Product>) => {
      const existingFavourite = state.favourite.find(
        (item) => item.id === action.payload.id
      );
      if (existingFavourite) {
        toast.info("This item is already in your favourites!", {
          position: "top-right",
        });
      } else {
        state.favourite.push(action.payload);
        toast.success("Added to favourites!", {
          position: "top-right",
        });
      }
    },

    removeFromFavourite: (state, action: PayloadAction<string>) => {
      state.favourite = state.favourite.filter(
        (item) => item.id !== action.payload
      );
    },

    clearFavourite: (state) => {
      state.favourite = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  addToFavourite,
  removeFromFavourite,
  clearFavourite,
} = cartSlice.actions;
export default cartSlice.reducer;
