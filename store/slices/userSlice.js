import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    userName: "",
    userImage: "",
    posts: [],
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const { userName, userImage, id } = action.payload;
      state.user = {userImage, userName, id}
    },
    addImage(state, action){
      console.log('action.payload.image');

      state.user.userImage = action.payload.image
    },
    addPosts(state, action) {
      state.posts = action.payload.posts;
    },
  },
});

export const user = userSlice.actions;
export default userSlice.reducer;
