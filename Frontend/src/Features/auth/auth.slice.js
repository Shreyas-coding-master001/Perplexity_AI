import { createSlice } from "@reduxjs/toolkit";

//Creating Redux State
const authSlice = createSlice({
    //Name from which state can be accessed
    name : "auth",
    //Initial State Values
    initialState : {
        user : null,
        loading : false,
        error : null,
    },
    //Functions to change state values
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
        },
        setLoading : (state, action) => {
            state.loading = action.payload
        },
        setError : (state, action) => {
            state.error = action.payload
        }
    }
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;