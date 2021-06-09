import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    posts:[],
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        allPosts(state, action){
            state.posts = action.payload
        }
,
        addPost(state, action){
            const {_id, description, imageUrl, userName,userId,
                 userImage, comments = []} = action.payload

            state.posts = [...state.posts, {id:_id, description,
                userId,
                 imageUrl, userName, userImage}]
        },

        editPost(state,action){
            const getPost = {...action.payload, id:action.payload._id}
            delete getPost._id
            const findPostIndex = state.posts.findIndex(post=> post.id == action.payload._id)
            state.posts[findPostIndex] = getPost
        },

        

        deletePost(state, action){
            const id = action.payload.id
            const posts = state.posts.filter(post=> post.id !== id )
            state.posts = posts
        },
        addComment(state, action){
            const {id, postId, comment, owner } = action.payload
            const postIndex = state.posts.findIndex(post=> post.id === action.payload.id)
            state.posts[postIndex].comments.push({id, postId, comment, owner})

        },


    }
})

export const posts = postsSlice.actions
export default postsSlice.reducer
