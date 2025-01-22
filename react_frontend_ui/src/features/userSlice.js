import { createSlice } from '@reduxjs/toolkit'

const initialState = {
//   access_token: null,
    name:"",
    email:""
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
   SetUserInfo:(state,action)=>{
    state.email = action.payload.email;
    state.name = action.payload.name;
   },
   UnSetUserInfo:(state,action)=>{
    state.name = action.payload.name
    state.email = action.payload.email
   },
  },
})

// Action creators are generated for each case reducer function
export const { SetUserInfo,UnSetUserInfo  } = userSlice.actions

export default userSlice.reducer