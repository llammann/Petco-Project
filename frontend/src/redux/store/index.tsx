import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./../slices/PetSlice";
export const store = configureStore({
  reducer: {
    pet: petReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
