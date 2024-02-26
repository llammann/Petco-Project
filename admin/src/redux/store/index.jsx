import { configureStore } from '@reduxjs/toolkit';

import AdminReducer from '../slices/AdminSlice';

export const store = configureStore({
  reducer: {
    admin: AdminReducer,
  },
});
