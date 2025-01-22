import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
}

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
   SetUserToken:(state,action)=>{
    state.access_token = action.payload.access_token
   },
   UnSetUserToken:(state,action)=>{
    state.access_token = action.payload.access_token
   },
  },
})

// Action creators are generated for each case reducer function
export const { SetUserToken,UnSetUserToken  } = authSlice.actions

export default authSlice.reducer