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
            const {id, description, imageUrl, userName,
                 userImage, comments = []} = action.payload
            state.posts = [...state.posts, {id, description, imageUrl, userName, userImage}]
        },

        addComment(state, action){
            const {id, postId, comment, owner } = action.payload
            const postIndex = state.posts.findIndex(post=> post.id === action.payload.id)
            state.posts[postIndex].comments.push({id, postId, comment, owner})

        },

        deletePost(state, action){
            const id = action.payload.id
            const posts = state.filter(post=> post.id !== id )
            state = posts
        }


    }
})

export const posts = postsSlice.actions
export default postsSlice.reducer
