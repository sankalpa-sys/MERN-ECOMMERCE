import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState: {
        theme: "light"
    }, 
    reducers: {
        darkTheme: (state)=>{
            state.theme = "dark"
        },
        lightTheme: (state) => {
            state.theme = "light"
        }
    }
})

export const {darkTheme, lightTheme} = themeSlice.actions

export default themeSlice.reducer