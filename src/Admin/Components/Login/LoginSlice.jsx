import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, actions) => {
      state = actions.payload
    },
    logout: (state) => {
      state.value -= 1
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { login, logout  } = loginSlice.actions

export default loginSlice.reducer