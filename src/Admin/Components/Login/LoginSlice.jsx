import { createSlice } from '@reduxjs/toolkit' 

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    value:{
      success: false,
      message:'failed to login!!!',
      accessToken: ''
    }
  },
  reducers: {
    login: (state, actions) => {
      state.value = actions.payload
    },
    logout: (state) => {
      state.value = {
        success: false,
        message:'failed to login!!!',
        accessToken: ''
      }
    },
    
  },
})
 
export const { login, logout  } = loginSlice.actions

export default loginSlice.reducer