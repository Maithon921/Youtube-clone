import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    // to start fetching video
    fetchStart: (state) => {
      state.loading = true;
    },
    // set video data and stop loading
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    // stop loading and set error
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // to set likes and remove from dislike if it has disliked
    like: (state, action) => {
      const userId = action.payload;
      if (!state.currentVideo.likes.includes(userId)) {
        state.currentVideo.likes.push(userId);
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
          (id) => id !== userId
        );
      }
    },
    // to set to dislikes and remove from like if it has liked
    dislike: (state, action) => {
      const userId = action.payload;
      if (!state.currentVideo.dislikes.includes(userId)) {
        state.currentVideo.dislikes.push(userId);
        state.currentVideo.likes = state.currentVideo.likes.filter(
          (id) => id !== userId
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;
