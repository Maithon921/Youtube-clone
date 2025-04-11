import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // start log in process
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // set user and stop loading
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    // stop loading and set erro when failed
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // log out user and clear datas from local storage
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem("token");
    },
    // update changes made to current user
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    // to toggle subscription to a channel
    subscription: (state, action) => {
      const subscribedUsers = state.currentUser.subscribedUsers;
      const index = subscribedUsers.indexOf(action.payload);
      // remove/unsubscribe if subscribed
      if (index !== -1) {
        subscribedUsers.splice(index, 1);
      } else {
        // subscribe if not subscribe
        subscribedUsers.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
