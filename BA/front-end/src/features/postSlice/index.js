import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listPosts: [],
  postCreate: [],
  postUserId: [],
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

//============================================================================
//CallApiCreatePost
export const CallApiCreatePost = createAsyncThunk(
  "post/callApiCreatePost",
  async function ({ headers, desc, img }) {
    try {
      const apiCreatePost = await axios.post(
        `http://localhost:5001/api/posts/`,
        {
          desc,
          img,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiCreatePost.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//CallApiGetPostId userID
export const CallApiGetPostId = createAsyncThunk(
  "post/callApiGetPostId",
  async function ({ headers, userID }) {
    try {
      const apiGetPostId = await axios.get(
        `http://localhost:5001/api/posts/${userID}`,

        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiGetPostId.data;
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
      })
      .addCase(CallApiCreatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiCreatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postCreate = action.payload;
      })
      .addCase(CallApiCreatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiGetPostId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiGetPostId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postUserId = action.payload;
      })
      .addCase(CallApiGetPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { listPosts } = postSlice.actions;
export default postSlice.reducer;
