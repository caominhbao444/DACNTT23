import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfor: [],
  userInforId: [],
  allUserInfor: [],
  listFriends: [],
  checkFriends: [],
  conversation: [],
  getConversation: [],
  getAllConversations: [],
  postMessage: [],
  getMessage: [],
  isLoading: false,
  isFailed: false,
};
// callApiUser
export const CallApiUser = createAsyncThunk(
  "user/callApiUser",
  async function ({ headers }) {
    try {
      const apiUserResponse = await axios.get(
        `http://localhost:5001/api/accounts/current`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiUserResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);
//
// callApiUserWith ID
export const CallApiUserID = createAsyncThunk(
  "user/callApiUserID",
  async function ({ headers, userID }) {
    try {
      const callApiUserIDrespone = await axios.get(
        `http://localhost:5001/api/accounts/${userID}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiUserIDrespone.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//callApiAllUsers
export const CallApiAllUsers = createAsyncThunk(
  "user/callApiAllUsers",
  async function ({ headers }) {
    try {
      const callApiAllUserResponse = await axios.get(
        `http://localhost:5001/api/accounts/all`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiAllUserResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//callAllFriends
export const CallApiFriends = createAsyncThunk(
  "user/callApiFriends",
  async function ({ headers }) {
    try {
      const callApiFriendsResponse = await axios.get(
        `http://localhost:5001/api/accounts/friends`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiFriendsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//callCheckFriends
export const CallApiCheckFriends = createAsyncThunk(
  "user/callApiCheckFriend",
  async function ({ headers, userID }) {
    try {
      const callApiCheckFriendsResponse = await axios.get(
        `http://localhost:5001/api/accounts/checkfriends/${userID}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiCheckFriendsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//callConversation
export const CallConversation = createAsyncThunk(
  "user/callApiConversation",
  async function ({ headers, userID }) {
    try {
      const callApiConversationResponse = await axios.post(
        `http://localhost:5001/api/conversations/${userID}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiConversationResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//getInforConversation
export const CallGetInforConversation = createAsyncThunk(
  "user/callApiInForConversation",
  async function ({ headers, userID }) {
    try {
      const callApiInForConversationResponse = await axios.get(
        `http://localhost:5001/api/conversations/${userID}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );

      return callApiInForConversationResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

//getAllConversations
export const CallGetAllConversation = createAsyncThunk(
  "user/callApiAllConversation",
  async function ({ headers, userID }) {
    try {
      const callApiAllConversationResponse = await axios.get(
        `http://localhost:5001/api/conversations/current`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiAllConversationResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

// =======================postMessages =================
export const CallPostMessage = createAsyncThunk(
  "user/callApiPostMessage",
  async function ({ headers, conversationID, text }) {
    try {
      const callApiPostMessageResponse = await axios.post(
        `http://localhost:5001/api/messages/${conversationID}`,
        {
          text,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiPostMessageResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
// ================================================================
// =============getMessages =============================================================
export const CallGetMessage = createAsyncThunk(
  "user/callApiGetMessage",
  async function ({ headers, conversationID }) {
    try {
      const callApiGetMessageResponse = await axios.get(
        `http://localhost:5001/api/messages/${conversationID}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return callApiGetMessageResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
// ===============================================================================================
const userSlice = createSlice({
  name: "userinfor",
  initialState,
  // reducers: {
  //   getUserInfor: (state) => {
  //     state.userInfor = data;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(CallApiUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfor = action.payload;
      })
      .addCase(CallApiUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallApiUserID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInforId = action.payload;
      })
      .addCase(CallApiUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallApiAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUserInfor = action.payload;
      })
      .addCase(CallApiAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallApiFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listFriends = action.payload;
      })
      .addCase(CallApiFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallApiCheckFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiCheckFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkFriends = action.payload;
      })
      .addCase(CallApiCheckFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversation = action.payload;
      })
      .addCase(CallConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallGetInforConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallGetInforConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getConversation = action.payload;
      })
      .addCase(CallGetInforConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallGetAllConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallGetAllConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllConversations = action.payload;
      })
      .addCase(CallGetAllConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallPostMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallPostMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postMessage = action.payload;
      })
      .addCase(CallPostMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(CallGetMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallGetMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getMessage = action.payload;
      })
      .addCase(CallGetMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // [CallApiUser.pending]: (state) => {
    // },
    // [CallApiUser.fulfilled]: (state, action) => {
    //   const { payload } = action;
    //   state.isLoading = false;
    //   state.userInfor = payload;
    // },
  },
});
export const { getUserInfor } = userSlice.actions;
export default userSlice.reducer;
