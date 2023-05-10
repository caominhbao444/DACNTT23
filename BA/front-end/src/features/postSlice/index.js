import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listPosts: [],
  postCreate: [],
  postUserId: [],
  postComment: [],
  postEdit: [],
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
        `http://localhost:5001/api/posts/all`,
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

//CallApiGetPostComment
export const CallApiGetPostComment = createAsyncThunk(
  "post/callApiGetPostComment",
  async function ({ headers, postId }) {
    try {
      const apiGetPostCommentId = await axios.get(
        `http://localhost:5001/api/comments/${postId}`,

        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiGetPostCommentId.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//CallApiEditPost
export const CallApiEditPost = createAsyncThunk(
  "post/callApiEditPost",
  async function ({ headers, postId, desc }) {
    try {
      const apiEditPost = await axios.put(
        `http://localhost:5001/api/posts/${postId}`,
        {
          desc,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiEditPost.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// ======================================================
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
      })
      .addCase(CallApiGetPostComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiGetPostComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postComment = action.payload;
      })
      .addCase(CallApiGetPostComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiEditPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiEditPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postEdit = action.payload;
      })
      .addCase(CallApiEditPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { listPosts } = postSlice.actions;
export default postSlice.reducer;
