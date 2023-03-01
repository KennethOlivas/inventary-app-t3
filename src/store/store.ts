import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "@/store/features/Sidebar/sideBarSlice";
import orderSlice from "./features/order/orderSlice";
export const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["order/addProduct"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.createdAt",
          "payload.updatedAt",
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          "order.products",
          "order.products.createdAt",
          "order.products.updatedAt",
          "order.customer.createdAt",
          "order.customer.updatedAt",
        ],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
