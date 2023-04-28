import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listPosts: [],
  isLoading: false,
  isFailed: false,
};
// ================================================================
//CallApiAllPosts
export const CallApiAllPosts = createAsyncThunk(
  "post/callApiAllPosts",
  async function ({ headers }) {
    try {
      const apiAllPostsResponse = await axios.get(
        `http://localhost:5001/api/posts/`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiAllPostsResponse.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// ===============================================================
const postSlice = createSlice({
  name: "postinfor",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(CallApiAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listPosts = action.payload;
      })
      .addCase(CallApiAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { listPosts } = postSlice.actions;
export default postSlice.reducer;
