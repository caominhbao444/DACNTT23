import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfor: [],
  userInforId: [],
  allUserInfor: [],
  isLoading: false,
  isFailed: false,
};
// callApiUser
export const CallApiUser = createAsyncThunk(
  "user/callApiUser",
  async function ({ headers }) {
    try {
      const apiUserResponse = await axios.get(
        `http://localhost:5001/api/users/current`,
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
        `http://localhost:5001/api/users/${userID}`,
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
        `http://localhost:5001/api/users`,
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
