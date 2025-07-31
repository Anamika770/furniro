import { createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    singleUserState: {
        data: null,
        loading: false,
        error: null,
    }
}


// export const addUserFormSlice = createAsyncThunk(async (seletedData, { dispatch, rejectWithValue, getState}) => {
//     try {

//     } catch (error) {
//         const 
//     }
// })