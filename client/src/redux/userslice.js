import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("user")) || null,
    pending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
      
    },
    loginError: (state) => {
      state.pending = false;
      state.error = true;
    },
    logOut: (state) => {
      state = null;
      localStorage.clear();
    },
    follow: (state, action) => {
      state.userInfo.following.push(action.payload.userId)
      
    },
    unfollow: (state, action) => {
      state.userInfo.following=state.userInfo.following.filter((followerId)=>followerId!==action.payload.userId)
      
    },
    updateProfilePic:(state,action)=>{
      state.userInfo.profilePic=action.payload.profilePic
     

    },
    updateCoverPic:(state,action)=>{
      state.userInfo.coverPic= action.payload.coverPic
      

    }
  },
});

export const { loginError, loginStart, loginSuccess, logOut,follow,unfollow ,updateProfilePic,updateCoverPic} =
  userSlice.actions;
export default userSlice.reducer;
