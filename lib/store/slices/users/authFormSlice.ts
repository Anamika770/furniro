import { axiosApi } from "@/appUtils/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export type IAuthForm = {
    name?: string;
    phone?: string;
    password?: string;
    email?: string;
}

const initialState = {
  singleUserState: {
    data: null,
    loading: null,
    error: null,
  } as BaseState <IAuthForm | null>
};

export const addUserFormSlice = createAsyncThunk<
    any,
    string | null,
    {state: RootState }
>(
  "userForm/add",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        authForm: {
          singleUserState: { data },
        },
      } = getState();

      dispatch(addUserListStart());

      if (!data?.name || !data?.phone || !data?.password || !data?.email) {
        return rejectWithValue("Please provide all required fields.");
      }

      const response = await axiosApi("auth/user/create", {
            method: "POST",
            data: data,
          });

      if (response?.success) {
        dispatch(addUserListSuccess(response.data));
        return response?.data;
      } else {
        const errorMsg = response.data?.message ?? "Something went wrong";
        dispatch(addUserListFailed(errorMsg));
        return rejectWithValue(errorMsg);
      }
    } catch (error: any) {
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
