import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Admin/Components/Login/LoginSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})