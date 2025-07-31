import axios from "@/appUtils/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    singleUserState: {
        data: null,
        loading: false,
        error: null,
    }
}


export const addUserFormSlice = createAsyncThunk(async (input, { dispatch, rejectWithValue, getState}) => {
    
    try {
        const {
            authForm: {
                singleUserState: { data }
            }
        } = getState();

        dispatch(addUserListStart());

        if (!data) {
            return rejectWithValue("Please Provide Details");
        }


        const formData = new FormData();

        const reqData = {
            name: data.name,
            password: data.password,
            phone: data.phone
        }


        let response =  await axios.post("auth/user/create", reqData)

        if (response.status === 200) {
            const message = response.data?.message;
            dispatch(addUserListSuccess({ message }));
            return { message }
        } else {
            const errorMsg = response.data?.message ?? "Something went Wrong"
            dispatch(addUserListSuccess(errorMsg));
            return rejectWithValue(errorMsg)
        }

    } catch (error) {
        const errorMessage = error?.message ?? "Something Went Wrong"
        dispatch(addUserListFailed(errorMessage))
        return rejectWithValue(errorMessage);
    }
})


const UserSlice = createSlice({
    name: "userForm",
    initialState,
    reducers: {
        addUserListStart(state) {
            state.singleUserState.loading =true;
            state.singleUserState.error = null;
        },
        addUserListSuccess(state) {
            state.singleUserState.loading = false;
            state.singleUserState.error = null;
        },
        addUserListFailed(state, action) {
            state.singleUserState.loading = false,
            state.singleUserState.error = action.payload
        }
    }
})

const {
    addUserListStart,
    addUserListSuccess,
    addUserListFailed
} = UserSlice.actions;

export default UserSlice.reducer;