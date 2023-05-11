import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listPosts: [],
  postCreate: [],
  postUserId: [],
  postComment: [],
  postNewComment: [],
  deleteComment: [],
  editComment: [],
  postEdit: [],
  like: [],
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
//CallApiPostNewComment
export const CallApiPostNewComment = createAsyncThunk(
  "post/callApiPostNewComment",
  async function ({ headers, postId, content }) {
    try {
      const apiPostComment = await axios.post(
        `http://localhost:5001/api/comments/${postId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiPostComment.data;
    } catch (error) {
      console.log(error);
    }
  }
);
///CallApiDeleteComment

export const CallApiDeleteComment = createAsyncThunk(
  "post/callApiDeleteComment",
  async function ({ headers, commentId }) {
    try {
      const apiDeleteComment = await axios.delete(
        `http://localhost:5001/api/comments/${commentId}`,

        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiDeleteComment.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//CallApiEditComment
export const CallApiEditComment = createAsyncThunk(
  "post/callApiEditComment",
  async function ({ headers, postId, commentId, content }) {
    try {
      const apiEditComment = await axios.put(
        `http://localhost:5001/api/comments/${postId}/${commentId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiEditComment.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//CallApiLike
export const CallApiLike = createAsyncThunk(
  "post/callApiLikePost",
  async function ({ headers, postId }) {
    try {
      const apiLike = await axios.post(
        `http://localhost:5001/api/posts/like/${postId}`,

        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiLike.data;
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
      })

      .addCase(CallApiPostNewComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiPostNewComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postNewComment = action.payload;
      })
      .addCase(CallApiPostNewComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiDeleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiDeleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteComment = action.payload;
      })
      .addCase(CallApiDeleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiEditComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiEditComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editComment = action.payload;
      })
      .addCase(CallApiEditComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.like = action.payload;
      })
      .addCase(CallApiLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { listPosts } = postSlice.actions;
export default postSlice.reducer;
