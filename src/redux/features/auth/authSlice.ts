import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { baseApi } from "../../api/baseApi"

export type TAuthState = {
    user:null | object,
    token: null | string
}

const initialState:TAuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setUser: (state, action) => { 
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
          
        }

        
    }
})

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken=(state:RootState)=>state.auth.token;
export const selectCurrentUser=(state:RootState)=>state.auth.user;