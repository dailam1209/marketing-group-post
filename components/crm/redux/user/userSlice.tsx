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
      console.log('ceck payload',action.payload)
      state.account=action.payload;
      state.auth=action.payload.auth;
      state.isloading=action.payload.isloading
    },
    dataSaveTD: (state, action) => {
      console.log("check action", action.payload);
      state.account = action.payload;
      // state.accountConnect=action.payload
    },
    doSaveconnectTD: (state,action) =>{

    }
  },
})
export const {doRefresh,dataSaveTD,doSaveconnectTD} = userSlice.actions;
export default userSlice.reducer;