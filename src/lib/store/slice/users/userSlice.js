import axios from "@/appUtils/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleUserState: {
    data: {},
    loading: false,
    error: null,
  },
};

export const addUserFormSlice = createAsyncThunk(
  "userForm/add",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        authForm: {
          singleUserState: { data },
        },
      } = getState();

      dispatch(addUserListStart());

      if (!data?.name || !data?.phone || !data?.password) {
        return rejectWithValue("Please provide all required fields.");
      }

      const response = await axios.post("auth/user/create", data);

      console.log("User Response is :-", response)

      if (response.status === 200) {
        const message = response.data?.message || "User created successfully";
        dispatch(addUserListSuccess({ data: response.data, message }));
        return { message };
      } else {
        const errorMsg = response.data?.message ?? "Something went wrong";
        dispatch(addUserListFailed(errorMsg));
        return rejectWithValue(errorMsg);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Something went wrong";
      dispatch(addUserListFailed(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const UserSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    addUserListStart(state) {
      state.singleUserState.loading = true;
      state.singleUserState.error = null;
    },
    addUserListSuccess(state, action) {
      state.singleUserState.loading = false;
      state.singleUserState.error = null;
      state.singleUserState.data = action.payload?.data;
    },
    addUserListFailed(state, action) {
      state.singleUserState.loading = false;
      state.singleUserState.error = action.payload;
    },
    updateUserFormData(state, action) {
      state.singleUserState.data = {
        ...state.singleUserState.data,
        ...action.payload,
      };
    },
  },
});

export const {
  addUserListStart,
  addUserListSuccess,
  addUserListFailed,
  updateUserFormData,
} = UserSlice.actions;

export default UserSlice.reducer;
