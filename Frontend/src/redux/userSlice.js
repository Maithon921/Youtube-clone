// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.currentUser = action.payload;
//     },
//     loginFailure: (state) => {
//       state.loading = false;
//       state.error = true;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.loading = false;
//       state.error = false;
//     },
//     subscription: (state, action) => {
//       if (state.currentUser.others.subscribedUsers.includes(action.payload)) {
//         state.currentUser.others.subscribedUsers.splice(
//           state.currentUser.others.subscribedUsers.findIndex(
//             (channelId) => channelId === action.payload
//           ),
//           1
//         );
//       }else{
//         state.currentUser.others.subscribedUsers.push(action.payload);
//       }
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
//   userSlice.actions;

// export default userSlice.reducer;


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
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem("token");
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    subscription: (state, action) => {
      const subscribedUsers = state.currentUser.subscribedUsers;
      const index = subscribedUsers.indexOf(action.payload);
      if (index !== -1) {
        subscribedUsers.splice(index, 1);
      } else {
        subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
