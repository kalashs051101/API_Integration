// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import SendPasswordResetEmail from '../pages/auth/SendPasswordResetEmail'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  
  endpoints: (builder) => ({
    registerUser:builder.mutation({
        query:(user)=>{
            return{
                url:'register/',
                method: 'POST',
                body: user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),        //create,delete,update  --we use mutation but for read--query
    LoginUser:builder.mutation({
        query:(user)=>{
            return{
                url:'login/',
                method: 'POST',
                body: user,
                // body: JSON.stringify(user),
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),        //for login
    getLoggedUser:builder.query({
        query:(access_token)=>{
            return{
                url:'profile/',
                method: 'GET',
                // body: user,
                // body: JSON.stringify(user),
                headers:{
                    'authorization':`Bearer ${access_token}`,
                }
            }
        }
    }),        //for logged in  user data
    ChangeUserPassword:builder.mutation({
        query:({actualData,access_token})=>{
            console.log('user Auth api ...actual data',actualData)
            console.log('user Auth api ...access token',access_token)
            return{
                url:'change_password/',
                method: 'POST',
                body: actualData,
                headers:{
                    'authorization':`Bearer ${access_token}`,
                }
            }
        }
    }),        //change password after login
    SendPasswordResetEmail:builder.mutation({
        query:(user)=>{
            // console.log('user Auth api ...actual data',actualData)
            // console.log('user Auth api ...access token',access_token)
            return{
                url:'Send_password_email/',
                method: 'POST',
                body: user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),        //send password reset email
    resetPassword:builder.mutation({
        query:({actualData,id,token})=>{

            console.log('user Auth api ...actual data',actualData)
            console.log('user Auth api ...access token',id)
            console.log('user Auth api ...access token',token)
            return{
                url:`reset_password/${id}/${token}/`,
                method: 'POST',
                body: actualData,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),        //reset email

   
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation , useLoginUserMutation,useGetLoggedUserQuery,useChangeUserPasswordMutation, useSendPasswordResetEmailMutation,useResetPasswordMutation} = userAuthApi    //useRegisterUserMutation  - this hook provide by the react for link the data  --for call the data through api





// Example of API setup in userAuthApi.js
// export const userAuthApi = createApi({
//     reducerPath: "userAuthApi",
//     baseQuery: fetchBaseQuery({
//       baseUrl: "/api",
//       prepareHeaders: (headers) => {
//         headers.set("Content-Type", "application/json");
//         return headers;
//       },
//     }),
//     endpoints: (builder) => ({
//       loginUser: builder.mutation({
//         query: (data) => ({
//           url: "/login/",
//           method: "POST",
//           body: JSON.stringify(data),
//         }),
//       }),
//     }),
//   });
  
//   export const { useLoginUserMutation } = userAuthApi;
  