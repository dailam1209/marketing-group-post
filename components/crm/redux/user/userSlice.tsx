import { createSlice } from '@reduxjs/toolkit'
const initialState= {
  auth:false,
  isloading:false,
    account:'',
    name:"",
    password:"",
    domain:"",
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doRefresh:(state, action) => {
      state.account=action.payload;
      state.auth=action.payload.auth;
      state.isloading=action.payload.isloading
    },
    dataSaveTD: (state, action) => {
      state.account = action.payload;
      // state.accountConnect=action.payload
    },
    doSaveconnectTD: (state,action) =>{

    },
    doDisConnect:(state,action) => {
            state.account=action.payload

    }
  },
})
export const {doRefresh,dataSaveTD,doSaveconnectTD,doDisConnect} = userSlice.actions;
export default userSlice.reducer;