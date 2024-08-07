import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface userState {
  isAuthenticated: Boolean;
  token: string | null;
  userInfo: {
    _id: string;
    fullname: string;
    email: string;
  } | null;
}

// const initialState: userState = {
//   isAuthenticated: userInformation.isAuthenticated,
//   token: userInformation.token,
//   userInfo: userInformation.userInfo,
// };

const initialState: userState = {
  isAuthenticated: false,
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; userInfo: userState["userInfo"] }>
    ) => {
      state.isAuthenticated = true;
      (state.token = action.payload.token),
        (state.userInfo = action.payload.userInfo);
      Cookies.set("token", action.payload.token, { expires: 7 });
      // sessionStorage.setItem("userInfo", JSON.stringify(state));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
